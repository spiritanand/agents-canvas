import { Handle, Position } from "@xyflow/react";
import type { NodeProps as ReactFlowNodeProps } from "@xyflow/react";
import { cn } from "~/lib/utils";

export interface NodeData {
	label: string;
}

type NodeProps = Omit<ReactFlowNodeProps, "data"> & {
	data: NodeData;
};

const baseNodeStyles =
	"px-4 py-2 rounded-lg shadow-sm border bg-background min-w-[150px]";

export function TriggerNode({ data, isConnectable }: NodeProps) {
	return (
		<div className={cn(baseNodeStyles, "border-blue-500/50")}>
			<div className="font-medium text-sm">{data.label}</div>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				className="!bg-blue-500"
			/>
		</div>
	);
}

export function AddinNode({ data, isConnectable }: NodeProps) {
	return (
		<div className={cn(baseNodeStyles, "border-violet-500/50")}>
			<Handle
				type="target"
				position={Position.Top}
				isConnectable={isConnectable}
				className="bg-violet-500"
			/>
			<div className="font-medium text-sm">{data.label}</div>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
				className="bg-violet-500"
			/>
		</div>
	);
}
