export interface Agent {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Error";
  editedAt: string;
  lastRunAt: string;
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Email outreach agent",
    status: "Active",
    editedAt: "10th March",
    lastRunAt: "14th March",
  },
  {
    id: "2",
    name: "Lead generation agent",
    status: "Active",
    editedAt: "11th March",
    lastRunAt: "14th March",
  },
  {
    id: "3",
    name: "Customer support agent",
    status: "Inactive",
    editedAt: "9th March",
    lastRunAt: "12th March",
  },
];
