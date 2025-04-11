import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "~/components/ui/table";
import { AgentActions } from "../agent-actions";
import { StatusChangeDropdown } from "./status-change-dropdown";
import type { Agent } from "@prisma/client";

interface AgentTableRowProps {
	agent: Agent;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
}

export function AgentTableRow({
	agent,
	onDuplicate,
	onDelete,
}: AgentTableRowProps) {
	const router = useRouter();

	return (
		<TableRow
			key={agent.id}
			className="cursor-pointer "
			onClick={(e) => {
				router.push(`/editor/${agent.id}`);
			}}
		>
			<TableCell className="cursor-pointer font-medium">{agent.name}</TableCell>
			<TableCell>
				<StatusChangeDropdown
					agentId={agent.id}
					agentName={agent.name}
					status={agent.status}
				/>
			</TableCell>
			<TableCell>{format(agent.editedAt, "do MMM yy")}</TableCell>
			<TableCell>
				{agent.lastRunAt ? format(agent.lastRunAt, "do MMM yy") : "Never"}
			</TableCell>
			<TableCell>
				<AgentActions
					agentId={agent.id}
					onEdit={(id) => router.push(`/editor/${id}`)}
					onDuplicate={onDuplicate}
					onDelete={onDelete}
				/>
			</TableCell>
		</TableRow>
	);
}
