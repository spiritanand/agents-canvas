"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { api } from "~/trpc/react";
import {
	useDeleteAgent,
	useDuplicateAgent,
} from "../hooks/use-agent-mutations";
import { AgentTableRow } from "./table-row";

export default function AgentsTable() {
	const [agents] = api.agents.list.useSuspenseQuery();
	const duplicateAgent = useDuplicateAgent();
	const { deleteId, setDeleteId, deleteAgent } = useDeleteAgent();
	const agentToDelete = agents.find((agent) => agent.id === deleteId);

	return (
		<>
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
					{agents.length > 0 ? (
						agents.map((agent) => (
							<AgentTableRow
								key={agent.id}
								agent={agent}
								onDuplicate={(id) => duplicateAgent.mutate({ id })}
								onDelete={(id) => setDeleteId(id)}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5} className="h-24 text-center">
								No agents found
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Are you sure?</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently delete the
							agent <strong>{agentToDelete?.name}</strong>.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							className="bg-red-600 hover:bg-red-700"
							onClick={() => deleteId && deleteAgent.mutate({ id: deleteId })}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
