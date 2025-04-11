"use client";

import Link from "next/link";
import { ArrowLeft, Bot, Play } from "lucide-react";
import { Button } from "../ui/button";
import { StatusChangeDropdown } from "~/app/_components/agents-overview/agents-table/status-change-dropdown";
import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useState } from "react";
import { Input } from "../ui/input";

export default function EditorTopbar({ agentId }: { agentId: string }) {
	const [agent] = api.agents.get.useSuspenseQuery({ id: agentId });
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(agent.name);
	const utils = api.useUtils();

	const { mutate: runAgent } = api.agents.run.useMutation({
		onSuccess: () => {
			toast.success(`${agent.name} is running`);
			void utils.agents.get.invalidate({ id: agentId });
			void utils.agents.list.invalidate();
		},
		onError: (error) => {
			toast.error(error.message || "Failed to run agent");
		},
	});

	const { mutate: updateAgent } = api.agents.update.useMutation({
		onMutate: async (newData) => {
			await utils.agents.get.cancel({ id: agentId });
			await utils.agents.list.cancel();

			const previousAgent = utils.agents.get.getData({ id: agentId });

			utils.agents.get.setData({ id: agentId }, (old) => {
				if (!old || newData.name === old.name || newData.name.trim() === "") {
					setName(newData.name);
					return previousAgent;
				}
				return { ...old, name: newData.name };
			});

			return { previousAgent };
		},
		onError: (err, newData, context) => {
			if (context?.previousAgent) {
				setName(context.previousAgent.name);
				utils.agents.get.setData({ id: agentId }, context.previousAgent);
			}
			toast.error(err.message || "Failed to update agent name");
		},
		onSuccess: () => {
			void utils.agents.get.invalidate({ id: agentId });
			void utils.agents.list.invalidate();
		},
	});

	const handleBlur = () => {
		setIsEditing(false);
		const newName = name.trim() || agent.name;
		if (newName !== agent.name) {
			updateAgent({ id: agentId, name: newName });
		}
	};

	return (
		<nav className="flex items-center justify-between border-b px-8 py-4">
			<div className="flex items-center gap-2">
				<Link href="/" className="group flex items-center gap-2">
					<ArrowLeft
						size={16}
						className="transition-transform duration-200 group-hover:translate-x-[-2px]"
					/>
					<span className="text-sm">/</span>
					<span className="sr-only">Agents Canvas</span>
				</Link>
				{isEditing ? (
					<Input
						value={name}
						onChange={(e) => setName(e.target.value)}
						onBlur={handleBlur}
						onKeyDown={(e) => e.key === "Enter" && handleBlur()}
						className="h-8 w-64 font-bold text-2xl"
						autoFocus
					/>
				) : (
					<Button
						variant="ghost"
						type="button"
						className="font-bold text-2xl"
						onClick={() => setIsEditing(true)}
					>
						{agent.name}
					</Button>
				)}
			</div>

			<div className="flex items-center gap-4">
				<StatusChangeDropdown
					agentId={agentId}
					agentName={agent.name}
					status={agent.status}
					caller="get"
				/>
				<Button
					variant="outline"
					className="gap-2"
					onClick={() => runAgent({ id: agentId })}
					disabled={!agent.status}
				>
					<Play className="h-4 w-4" />
					Run
				</Button>
			</div>
		</nav>
	);
}
