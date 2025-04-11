export default async function AgentEditorPage({
	params,
}: { params: Promise<{ agentId: string }> }) {
	const { agentId } = await params;

	return <div>AgentEditorPage - {agentId}</div>;
}
