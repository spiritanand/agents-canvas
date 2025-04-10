import Link from "next/link";
import { signOut } from "~/server/auth";
import { Button } from "./ui/button";
import { Bot } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";

export default function Topbar() {
	return (
		<nav className="flex items-center justify-between border-b px-8 py-4">
			<Link href="/">
				<Bot size={32} />
				<span className="sr-only">Agents Canvas</span>
			</Link>

			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="outline">Sign out</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to sign out?
						</AlertDialogTitle>
						<AlertDialogDescription>
							You will need to sign in again to access your account.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<form
							action={async () => {
								"use server";
								await signOut();
							}}
						>
							<AlertDialogAction type="submit">Sign out</AlertDialogAction>
						</form>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</nav>
	);
}
