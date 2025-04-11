import { Skeleton } from "~/components/ui/skeleton";

export default function AgentEditorLoading() {
	return (
		<div className="container mx-auto p-6">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Editor section */}
				<div className="space-y-4">
					<Skeleton className="h-[600px] w-full" />
				</div>

				{/* Preview section */}
				<div className="space-y-4">
					<Skeleton className="h-[600px] w-full" />
				</div>
			</div>
		</div>
	);
}
