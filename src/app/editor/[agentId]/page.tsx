import EditorTopbar from "~/components/topbars/editor-topbar";
import AgentsCanvas from "./_components/agents-canvas";
import { api, HydrateClient } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function AgentEditorPage({
	params,
}: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;

	try {
		const agent = await api.agents.get({ id: agentId });
		console.log({ agent });
		void api.agents.get.prefetch({ id: agentId });

		return (
			<HydrateClient>
				<EditorTopbar agentId={agentId} />
				<main className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
					<AgentsCanvas agentId={agentId} />
				</main>
			</HydrateClient>
		);
	} catch (error) {
		console.error({ error });
		notFound();
	}
}
