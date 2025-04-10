import CreateAgentForm from "./create-agent-form";
import AgentsTable from "./agents-table";

export default function AgentsOverview() {
	return (
		<main className="container mx-auto py-10">
			<CreateAgentForm />
			<AgentsTable />
		</main>
	);
}
