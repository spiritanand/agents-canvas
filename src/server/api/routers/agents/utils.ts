import { TRPCError } from "@trpc/server";
import type { Context } from "~/server/api/trpc";

export async function findAgentOrThrow({ ctx, agentId }: { ctx: Context; agentId: string }) {
  const agent = await ctx.db.agent.findUnique({
    where: {
      id: agentId,
      createdById: ctx.session.user.id,
    },
  });

  if (!agent) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "Agent not found",
    });
  }

  return agent;
}
