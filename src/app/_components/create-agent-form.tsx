"use client";

import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function CreateAgentForm() {
	return (
		<div className="mb-6 flex items-center justify-between">
			<h1 className="font-bold text-3xl">Agents</h1>
			<Button>
				<Plus className="mr-2 h-4 w-4" />
				Create Agent
			</Button>
		</div>
	);
}
