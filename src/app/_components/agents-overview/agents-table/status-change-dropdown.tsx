import { Check, X, Power } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { useUpdateAgentStatus } from "../hooks/use-agent-mutations";
import { cn } from "~/lib/utils";

interface StatusChangeDropdownProps {
	agentId: string;
	agentName: string;
	status: boolean;
	caller?: "list" | "get";
}

export function StatusChangeDropdown({
	agentId,
	agentName,
	status,
	caller = "list",
}: StatusChangeDropdownProps) {
	const updateStatus = useUpdateAgentStatus(caller);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						"h-7 gap-2 border px-3 font-medium transition-all duration-200",
						status
							? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
							: "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-300 hover:text-gray-700",
					)}
				>
					<div
						className={cn(
							"size-2 rounded-full transition-colors duration-200",
							status ? "bg-green-500" : "bg-gray-400",
						)}
					/>
					<span className="text-xs">{status ? "Active" : "Inactive"}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-[180px]">
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation();
						updateStatus.mutate({
							id: agentId,
							name: agentName,
							status: true,
						});
					}}
					className={cn("gap-2", status && "bg-green-50 text-green-700")}
				>
					<div className="size-2 rounded-full bg-green-500" />
					<span>Active</span>
					{status && <Check className="ml-auto h-4 w-4" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={(e) => {
						e.stopPropagation();
						updateStatus.mutate({
							id: agentId,
							name: agentName,
							status: false,
						});
					}}
					className={cn("gap-2", !status && "bg-gray-50 text-gray-700")}
				>
					<div className="size-2 rounded-full bg-gray-400" />
					<span>Inactive</span>
					{!status && <Check className="ml-auto h-4 w-4" />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
