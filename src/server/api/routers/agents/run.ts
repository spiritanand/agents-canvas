import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { findAgentOrThrow } from "./utils";

export const run = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const agent = await findAgentOrThrow({ ctx, agentId: input.id });

    if (!agent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found or you don't have permission to run it",
      });
    }

    if (!agent.status) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Agent is not active",
      });
    }

    return ctx.db.agent.update({
      where: {
        id: input.id,
        createdById: ctx.session.user.id,
      },
      data: {
        lastRunAt: new Date(),
      },
    });
  });
