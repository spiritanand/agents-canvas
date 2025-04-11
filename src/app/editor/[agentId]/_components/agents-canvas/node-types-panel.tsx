import type { Node } from "@xyflow/react";
import { Button } from "~/components/ui/button";
import { Mail, Database, MessageSquare, Inbox } from "lucide-react";
import type { NodeData } from "./custom-nodes";

type NodeType = "trigger" | "addin";

interface NodeTypesPanelProps {
	onAddNode: (updater: (nodes: Node[]) => Node[]) => void;
}

const NODE_TYPES = [
	{
		type: "trigger" as NodeType,
		label: "Incoming Email",
		icon: Inbox,
		category: "Triggers",
	},
	{
		type: "addin" as NodeType,
		label: "Send email",
		icon: Mail,
		category: "Add-ins",
	},
	{
		type: "addin" as NodeType,
		label: "Store to database",
		icon: Database,
		category: "Add-ins",
	},
	{
		type: "addin" as NodeType,
		label: "Send discord message",
		icon: MessageSquare,
		category: "Add-ins",
	},
] as const;

type NodeCategory = Record<string, (typeof NODE_TYPES)[number][]>;

export function NodeTypesPanel({ onAddNode }: NodeTypesPanelProps) {
	const addNode = (type: NodeType, label: string) => {
		onAddNode((nodes) => [
			...nodes,
			{
				id: `${type}-${nodes.length + 1}`,
				type,
				position: {
					x: Math.random() * 500,
					y: Math.random() * 500,
				},
				data: { label } satisfies NodeData,
			} as Node,
		]);
	};

	// Group nodes by category
	const categories = Object.entries(
		NODE_TYPES.reduce<Record<string, (typeof NODE_TYPES)[number][]>>(
			(acc, node) => {
				const category = node.category;
				acc[category] = acc[category] || [];
				acc[category].push(node);
				return acc;
			},
			{},
		),
	);

	return (
		<div className="flex w-full flex-col gap-6 p-4">
			{categories.map(([category, nodes]) => (
				<div key={category}>
					<h3 className="mb-2 font-medium">{category}</h3>
					<div className="flex flex-col gap-2">
						{nodes.map((node) => {
							const Icon = node.icon;
							return (
								<Button
									key={`${node.type}-${node.label}`}
									variant="outline"
									className="justify-start gap-2"
									onClick={() => addNode(node.type, node.label)}
								>
									<Icon className="h-4 w-4" />
									{node.label}
								</Button>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
}
