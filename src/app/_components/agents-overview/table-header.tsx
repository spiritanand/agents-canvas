"use client";

import CreateAgentForm from "./create-agent-form";

export default function TableHeader() {
	return (
		<div className="mb-6 flex items-center justify-between">
			<h1 className="font-bold text-3xl">Agents</h1>

			<CreateAgentForm />
		</div>
	);
}
