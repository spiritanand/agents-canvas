import EditorTopbar from "~/components/topbars/editor-topbar";
import AgentsCanvas from "./_components/agents-canvas";
import { api, HydrateClient } from "~/trpc/server";

export default async function AgentEditorPage({
	params,
}: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;

	void api.agents.get.prefetch({ id: agentId });

	return (
		<HydrateClient>
			<EditorTopbar agentId={agentId} />
			<main className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
				<AgentsCanvas agentId={agentId} />
			</main>
		</HydrateClient>
	);
}
