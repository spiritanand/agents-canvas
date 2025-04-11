import AgentsCanvas from "./_components/agents-canvas";

export default async function AgentEditorPage({
	params,
}: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;

	return (
		<main className="flex h-[calc(100vh-5rem)] flex-col overflow-hidden">
			<AgentsCanvas />
		</main>
	);
}
