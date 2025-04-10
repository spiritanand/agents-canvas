import TableHeader from "./table-header";
import AgentsTable from "./agents-table";

export default function AgentsOverview() {
	return (
		<main className="container mx-auto py-10">
			<TableHeader />
			<AgentsTable />
		</main>
	);
}
