import { Plus, Loader2 } from "lucide-react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateAgentButton() {
	const router = useRouter();
	const trpc = api.useUtils();

	const createAgent = api.agents.create.useMutation({
		onSuccess: ({ id }) => {
			void trpc.agents.list.invalidate();
			router.push(`/editor/${id}`);
		},
	});

	function handleCreateAgent() {
		createAgent.mutate({
			name: "Unnamed Agent",
		});
	}

	return (
		<Button disabled={createAgent.isPending} onClick={handleCreateAgent}>
			{createAgent.isPending ? (
				<span className="animate-spin">
					<Loader2 className="h-4 w-4" />
				</span>
			) : (
				<>
					<Plus className="mr-2 h-4 w-4" />
					Create Agent
				</>
			)}
		</Button>
	);
}
