"use client";

import Link from "next/link";
import { ArrowLeft, Bot, Play } from "lucide-react";
import { Button } from "../ui/button";
import { StatusChangeDropdown } from "~/app/_components/agents-overview/agents-table/status-change-dropdown";
import { toast } from "sonner";
import { api } from "~/trpc/react";

export default function EditorTopbar({ agentId }: { agentId: string }) {
	const [agent] = api.agents.get.useSuspenseQuery({ id: agentId });
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

	return (
		<nav className="flex items-center justify-between border-b px-8 py-4">
			<Link href="/" className="group flex items-center gap-2">
				<ArrowLeft
					size={16}
					className="transition-transform duration-200 group-hover:translate-x-[-2px]"
				/>
				<span className="text-sm">/</span>
				<h4 className="font-bold text-2xl">{agent.name}</h4>
				<span className="sr-only">Agents Canvas</span>
			</Link>

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
