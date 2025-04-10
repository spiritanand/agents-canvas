import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
	createAgentSchema,
	type CreateAgentSchema,
} from "~/app/_schema/create-agent-form";
import { Button } from "~/components/ui/button";
import {
	Dialog,
	DialogTrigger,
	DialogTitle,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from "~/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

export default function CreateAgentForm() {
	const form = useForm<CreateAgentSchema>({
		resolver: zodResolver(createAgentSchema),
		defaultValues: {
			name: "",
		},
	});

	function onSubmit(values: CreateAgentSchema) {
		console.log(values);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Create Agent
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create Agent</DialogTitle>
					<DialogDescription>
						Create a new agent to start automating your business.
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="My AGI" {...field} />
									</FormControl>
									<FormDescription>
										This is the name of your agent.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
