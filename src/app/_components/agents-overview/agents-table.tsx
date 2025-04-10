"use client";

import { AgentActions } from "./agent-actions";
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
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AgentsTable() {
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const trpc = api.useUtils();
	const [agents] = api.agents.list.useSuspenseQuery();

	const duplicateAgent = api.agents.duplicate.useMutation({
		onMutate: ({ id }) => {
			const agent = agents.find((a) => a.id === id);
			const toastId = `duplicate-${id}`;

			toast.loading(`Duplicating ${agent?.name || "agent"}...`, {
				id: toastId,
			});

			return { agent, toastId };
		},
		onSuccess: (_, { id }, context) => {
			const agent = agents.find((a) => a.id === id);
			toast.success(`${agent?.name || "Agent"} duplicated successfully`, {
				id: context?.toastId,
			});
			void trpc.agents.list.invalidate();
		},
		onError: (_, { id }, context) => {
			toast.error("Failed to duplicate agent", {
				id: context?.toastId,
			});
		},
	});

	const deleteAgent = api.agents.delete.useMutation({
		onMutate: async (deleteInput) => {
			// Cancel outgoing fetches
			await trpc.agents.list.cancel();

			// Get current data
			const prevData = trpc.agents.list.getData();

			// Optimistically remove the agent
			trpc.agents.list.setData(undefined, (old) => {
				if (!old) return old;
				return old.filter((agent) => agent.id !== deleteInput.id);
			});

			return { prevData };
		},
		onError: (err, newAgent, context) => {
			// If the mutation fails, restore the previous data
			trpc.agents.list.setData(undefined, context?.prevData);
		},
		onSettled: () => {
			setDeleteId(null);
			void trpc.agents.list.invalidate();
		},
	});

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
							<TableRow key={agent.id}>
								<TableCell className="font-medium">{agent.name}</TableCell>
								<TableCell>
									<span
										className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-medium text-xs ${
											agent.status
												? "bg-green-100 text-green-800"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{agent.status ? "Active" : "Inactive"}
									</span>
								</TableCell>
								<TableCell>{format(agent.editedAt, "do MMM yy")}</TableCell>
								<TableCell>
									{agent.lastRunAt
										? format(agent.lastRunAt, "do MMM yy")
										: "Never"}
								</TableCell>
								<TableCell>
									<AgentActions
										agentId={agent.id}
										onEdit={(id) => console.log("Edit", id)}
										onDuplicate={(id) => duplicateAgent.mutate({ id })}
										onDelete={(id) => setDeleteId(id)}
									/>
								</TableCell>
							</TableRow>
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
