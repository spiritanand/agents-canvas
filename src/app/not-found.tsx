"use client";

import OverviewTopbar from "~/components/topbars/overview-topbar";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
	const router = useRouter();

	return (
		<>
			<OverviewTopbar />
			<main className="container mx-auto flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center gap-8 px-4">
				<div className="flex flex-col items-center gap-4 text-center">
					<h1 className="font-bold text-6xl">404</h1>
					<h2 className="font-semibold text-2xl">Page Not Found</h2>
					<p className="text-muted-foreground">
						The page you are looking for does not exist or has been moved.
					</p>
				</div>
				<div className="flex gap-4">
					<Button
						variant="outline"
						onClick={() => router.back()}
						className="gap-2"
					>
						<ArrowLeft className="h-4 w-4" />
						Go Back
					</Button>
					<Button asChild>
						<Link href="/" className="gap-2">
							<Home className="h-4 w-4" />
							Go Home
						</Link>
					</Button>
				</div>
			</main>
		</>
	);
}
