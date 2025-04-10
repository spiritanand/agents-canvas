"use client";

import { AgentActions } from "~/components/agent-actions";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { agents } from "~/lib/data/agents";

export default function AgentsTable() {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Edited at</TableHead>
					<TableHead>Last run at</TableHead>
					<TableHead className="w-[50px]">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{agents.map((agent) => (
					<TableRow key={agent.id}>
						<TableCell className="font-medium">{agent.name}</TableCell>
						<TableCell>
							<span
								className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
									agent.status === "Active"
										? "bg-green-100 text-green-800"
										: agent.status === "Inactive"
											? "bg-gray-100 text-gray-800"
											: "bg-red-100 text-red-800"
								}`}
							>
								{agent.status}
							</span>
						</TableCell>
						<TableCell>{agent.editedAt}</TableCell>
						<TableCell>{agent.lastRunAt}</TableCell>
						<TableCell>
							<AgentActions
								agentId={agent.id}
								onEdit={(id) => console.log("Edit", id)}
								onDuplicate={(id) => console.log("Duplicate", id)}
								onDelete={(id) => console.log("Delete", id)}
							/>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
