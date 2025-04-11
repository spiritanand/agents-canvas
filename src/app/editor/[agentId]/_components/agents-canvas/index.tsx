"use client";

import React, { useState, useCallback, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import debounce from "lodash.debounce";
import {
	ReactFlow,
	Background,
	Controls,
	MiniMap,
	BackgroundVariant,
	useReactFlow,
	ReactFlowProvider,
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	type NodeChange,
	type EdgeChange,
	type Connection,
	ConnectionMode,
	type Node,
	type Edge,
} from "@xyflow/react";
import {
	ChevronRight,
	ChevronLeft,
	Zap,
	Puzzle,
	Mail,
	Globe,
	Clock,
	Send,
	MessageSquare,
	Database,
} from "lucide-react";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TriggerNode, AddinNode } from "./custom-nodes";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "~/components/ui/tooltip";

import "@xyflow/react/dist/style.css";

import { api } from "~/trpc/react";
import { isCanvasState } from "~/types/canvas";
import type { CanvasState } from "~/types/canvas";

const nodeTypes = {
	trigger: TriggerNode,
	addin: AddinNode,
};

type NodeType = keyof typeof nodeTypes;

interface NodeConfig {
	id: string;
	label: string;
	icon: LucideIcon;
	type: NodeType;
}

interface NodeCategoryConfig {
	label: string;
	icon: LucideIcon;
	items: NodeConfig[];
}

const NODES_CONFIG: Record<string, NodeCategoryConfig> = {
	triggers: {
		label: "Triggers",
		icon: Zap,
		items: [
			{
				id: "incoming-email",
				label: "Incoming Email",
				icon: Mail,
				type: "trigger",
			},
			{
				id: "webhook",
				label: "Webhook",
				icon: Globe,
				type: "trigger",
			},
			{
				id: "schedule",
				label: "Schedule",
				icon: Clock,
				type: "trigger",
			},
		],
	},
	addins: {
		label: "Add-ins",
		icon: Puzzle,
		items: [
			{
				id: "send-email",
				label: "Send Email",
				icon: Send,
				type: "addin",
			},
			{
				id: "send-discord",
				label: "Send Discord Message",
				icon: MessageSquare,
				type: "addin",
			},
			{
				id: "store-database",
				label: "Store to Database",
				icon: Database,
				type: "addin",
			},
		],
	},
};

function AgentsCanvasContent({ agentId }: { agentId: string }) {
	const [agent] = api.agents.get.useSuspenseQuery({ id: agentId });
	const initialCanvas = isCanvasState(agent.canvas)
		? agent.canvas
		: { nodes: [], edges: [] };

	const [nodes, setNodes] = useState<Node[]>(
		initialCanvas.nodes as unknown as Node[],
	);
	const [edges, setEdges] = useState<Edge[]>(
		initialCanvas.edges as unknown as Edge[],
	);
	const [isPanelOpen, setIsPanelOpen] = useState(true);
	const { fitView } = useReactFlow();

	const { mutate: updateCanvas } = api.canvas.update.useMutation();

	const debouncedSave = useCallback(
		debounce((nodes: Node[], edges: Edge[]) => {
			const canvas: CanvasState = {
				nodes: nodes.map((node) => ({
					id: node.id,
					type: node.type ?? "default",
					position: node.position,
					data: node.data ?? {},
				})),
				edges: edges.map((edge) => ({
					id: edge.id,
					source: edge.source,
					target: edge.target,
				})),
			};

			updateCanvas({
				agentId,
				canvas,
			});
		}, 500),
		[],
	);

	const onNodesChange = useCallback(
		(changes: NodeChange[]) => {
			const newNodes = applyNodeChanges(changes, nodes) as Node[];
			setNodes(newNodes);
			debouncedSave(newNodes, edges);
		},
		[nodes, edges, debouncedSave],
	);

	const onEdgesChange = useCallback(
		(changes: EdgeChange[]) => {
			const newEdges = applyEdgeChanges(changes, edges);
			setEdges(newEdges);
			debouncedSave(nodes, newEdges);
		},
		[nodes, edges, debouncedSave],
	);

	const onConnect = useCallback(
		(params: Connection) => {
			const newEdges = addEdge(params, edges);
			setEdges(newEdges);
			debouncedSave(nodes, newEdges);
		},
		[nodes, edges, debouncedSave],
	);

	useEffect(() => {
		return () => {
			debouncedSave.flush();
		};
	}, [debouncedSave]);

	const addNode = useCallback(
		(nodeConfig: NodeConfig) => {
			setNodes((nodes) => {
				// Find the average position of all nodes or use a default
				const avgX = nodes.length
					? nodes.reduce((sum, node) => sum + node.position.x, 0) / nodes.length
					: 0;
				const avgY = nodes.length
					? nodes.reduce((sum, node) => sum + node.position.y, 0) / nodes.length
					: 0;

				const newX = avgX + (Math.random() - 0.5) * 100;
				const newY = avgY + (Math.random() - 0.5) * 100;

				return [
					...nodes,
					{
						id: `${nodeConfig.type}-${nodes.length + 1}`,
						type: nodeConfig.type,
						position: { x: newX, y: newY },
						data: { label: nodeConfig.label },
					},
				];
			});

			setTimeout(() => {
				fitView({ duration: 200 });
			}, 0);
		},
		[fitView],
	);

	return (
		<div className="relative flex h-full">
			<div className="h-full flex-1">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					nodeTypes={nodeTypes}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					fitView
					connectionMode={ConnectionMode.Strict}
					defaultEdgeOptions={{
						animated: true,
						style: { stroke: "#64748b" },
					}}
				>
					<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
					<Controls />
					<MiniMap />
				</ReactFlow>
			</div>

			{/* Collapsible Panel */}
			<div
				className={cn(
					"relative flex h-full border-l bg-background transition-all duration-300",
					isPanelOpen ? "w-96" : "w-0",
				)}
			>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant={isPanelOpen ? "outline" : "default"}
								size="icon"
								className="-left-12 absolute top-4 rounded-r-none rounded-l-md border-r-0"
								onClick={() => setIsPanelOpen(!isPanelOpen)}
							>
								{isPanelOpen ? <ChevronRight /> : <ChevronLeft />}
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left">
							{isPanelOpen ? "Collapse sidebar" : "Expand sidebar"}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>

				<div
					className={cn(
						"h-full w-full overflow-hidden",
						!isPanelOpen && "hidden",
					)}
				>
					<div className="flex h-full w-full flex-col p-4">
						<Tabs defaultValue="triggers" className="w-full">
							<div className="flex flex-col">
								<TabsList className="flex h-auto flex-wrap items-start space-x-0 space-y-1 bg-transparent p-0">
									{Object.entries(NODES_CONFIG).map(([key, config]) => {
										const Icon = config.icon;
										return (
											<TabsTrigger
												key={key}
												value={key}
												className="flex items-center justify-start gap-2 data-[state=active]:bg-muted"
											>
												<Icon className="h-4 w-4" />
												{config.label}
											</TabsTrigger>
										);
									})}
								</TabsList>

								{Object.entries(NODES_CONFIG).map(([key, config]) => (
									<TabsContent key={key} value={key} className="mt-4">
										<div className="flex flex-col gap-2">
											{config.items.map((item) => {
												const Icon = item.icon;
												return (
													<Button
														key={item.id}
														variant="ghost"
														className="h-9 justify-start gap-2 px-4 py-2"
														onClick={() => addNode(item)}
													>
														<Icon className="h-4 w-4" />
														{item.label}
													</Button>
												);
											})}
										</div>
									</TabsContent>
								))}
							</div>
						</Tabs>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function AgentsCanvas({ agentId }: { agentId: string }) {
	return (
		<ReactFlowProvider>
			<AgentsCanvasContent agentId={agentId} />
		</ReactFlowProvider>
	);
}
