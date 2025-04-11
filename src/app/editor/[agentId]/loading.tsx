import { Skeleton } from "~/components/ui/skeleton";

export default function AgentEditorLoading() {
	return (
		<div className="flex h-screen">
			{/* Main content */}
			<div className="flex-1 p-6">
				<div className="mb-6 flex items-center justify-between">
					<Skeleton className="h-8 w-32" />
					<Skeleton className="h-8 w-24" />
				</div>
				<div className="space-y-4">
					<Skeleton className="h-[600px] w-full rounded-lg" />
				</div>
			</div>

			{/* Sidebar */}
			<div className="w-64 space-y-4 border-r p-4">
				<Skeleton className="h-8 w-full" />
				<div className="space-y-3">
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
					<Skeleton className="h-10 w-full" />
				</div>
			</div>
		</div>
	);
}
