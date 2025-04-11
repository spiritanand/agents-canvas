import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useUpdateAgentStatus } from "../agents-overview/hooks/use-agent-mutations";
import { cn } from "~/lib/utils";

interface StatusChangeDropdownProps {
	agentId: string;
	agentName: string;
	status: boolean;
}

export function StatusChangeDropdown({
	agentId,
	agentName,
	status,
}: StatusChangeDropdownProps) {
	const updateStatus = useUpdateAgentStatus();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className={cn(
						"h-7 gap-2 px-3 font-medium transition-all duration-200",
						status
							? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
							: "border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700",
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
			<DropdownMenuContent align="start" className="w-[140px] p-1">
				<DropdownMenuItem
					onClick={() =>
						updateStatus.mutate({
							id: agentId,
							name: agentName,
							status: true,
						})
					}
					className={cn(
						"h-9 cursor-pointer gap-2 transition-colors duration-200",
						status
							? "bg-green-100 text-green-700 hover:bg-green-200"
							: "hover:bg-green-100 hover:text-green-700",
					)}
				>
					<div className="size-2 rounded-full bg-green-500" />
					<span>Set Active</span>
					{status && <Check className="ml-auto h-4 w-4 text-green-600" />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						updateStatus.mutate({
							id: agentId,
							name: agentName,
							status: false,
						})
					}
					className={cn(
						"h-9 cursor-pointer gap-2 transition-colors duration-200",
						!status
							? "bg-gray-100 text-gray-700 hover:bg-gray-200"
							: "hover:bg-gray-100 hover:text-gray-700",
					)}
				>
					<div className="size-2 rounded-full bg-gray-400" />
					<span>Set Inactive</span>
					{!status && <Check className="ml-auto h-4 w-4 text-gray-600" />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
