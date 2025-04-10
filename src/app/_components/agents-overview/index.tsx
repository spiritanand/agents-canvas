import TableHeader from "./table-header";
import AgentsTable from "./agents-table";
import { api, HydrateClient } from "~/trpc/server";

export default function AgentsOverview() {
	void api.agents.list.prefetch();

	return (
		<HydrateClient>
			<main className="container mx-auto py-10">
				<TableHeader />
				<AgentsTable />
			</main>
		</HydrateClient>
	);
}
