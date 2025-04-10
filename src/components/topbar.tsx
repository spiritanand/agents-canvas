import Link from "next/link";
import { signOut } from "~/server/auth";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";

export default function Topbar() {
	return (
		<nav className="flex items-center justify-between border-b px-8 py-4">
			<Link href="/">
				<Bot size={32} />
				<span className="sr-only">Agents Canvas</span>
			</Link>

			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<Button variant="outline" type="submit">
					Sign out
				</Button>
			</form>
		</nav>
	);
}
