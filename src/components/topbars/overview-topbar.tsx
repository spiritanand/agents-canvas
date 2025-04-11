"use client";

import Link from "next/link";
import { Button } from "../ui/button";
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
} from "../ui/alert-dialog";
import { signOut } from "next-auth/react";

export default function OverviewTopbar() {
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

						<AlertDialogAction onClick={() => signOut()}>
							Sign out
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</nav>
	);
}
