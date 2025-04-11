import OverviewTopbar from "~/components/topbars/overview-topbar";
import AgentsOverview from "./_components/agents-overview";

export default function Home() {
	return (
		<>
			<OverviewTopbar />
			<AgentsOverview />
		</>
	);
}
