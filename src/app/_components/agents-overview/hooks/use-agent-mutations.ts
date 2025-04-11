import { toast } from "sonner";
import { api } from "~/trpc/react";
import { useState } from "react";

export function useDuplicateAgent() {
  const trpc = api.useUtils();
  const [agents] = api.agents.list.useSuspenseQuery();

  return api.agents.duplicate.useMutation({
    onMutate: ({ id }) => {
      const agent = agents.find((a) => a.id === id);
      const toastId = `duplicate-${id}`;

      toast.loading(`Duplicating ${agent?.name || "agent"}...`, {
        id: toastId,
      });

      return { agent, toastId };
    },
    onSuccess: (_, { id }, context) => {
      const agent = agents.find((a) => a.id === id);
      toast.success(`${agent?.name || "Agent"} duplicated successfully`, {
        id: context?.toastId,
      });
      void trpc.agents.list.invalidate();
    },
    onError: (_, { id }, context) => {
      toast.error("Failed to duplicate agent", {
        id: context?.toastId,
      });
    },
  });
}

export function useDeleteAgent() {
  const trpc = api.useUtils();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const mutation = api.agents.delete.useMutation({
    onMutate: async (deleteInput) => {
      await trpc.agents.list.cancel();
      const prevData = trpc.agents.list.getData();

      trpc.agents.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.filter((agent) => agent.id !== deleteInput.id);
      });

      return { prevData };
    },
    onError: (err, newAgent, context) => {
      trpc.agents.list.setData(undefined, context?.prevData);
    },
    onSettled: () => {
      setDeleteId(null);
      void trpc.agents.list.invalidate();
    },
  });

  return {
    deleteId,
    setDeleteId,
    deleteAgent: mutation,
  };
}

export function useUpdateAgentStatus() {
  const trpc = api.useUtils();

  return api.agents.update.useMutation({
    onMutate: async ({ id, status }) => {
      await trpc.agents.list.cancel();
      const prevData = trpc.agents.list.getData();

      trpc.agents.list.setData(undefined, (old) => {
        if (!old) return old;
        return old.map((agent) =>
          agent.id === id ? { ...agent, status: status ?? false } : agent
        );
      });

      return { prevData };
    },
    onError: (_err, _newAgent, context) => {
      trpc.agents.list.setData(undefined, context?.prevData);
      toast.error("Failed to update agent status");
    },
    onSettled: () => {
      void trpc.agents.list.invalidate();
    },
  });
}
