import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

export default async function Home() {
	const session = await auth();

	return (
		<main>
			<Button>Click me</Button>
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</main>
	);
}
