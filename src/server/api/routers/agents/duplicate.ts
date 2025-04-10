import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { findAgentOrThrow } from "./utils";

export const duplicate = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const agent = await findAgentOrThrow({ ctx, agentId: input.id });

    return ctx.db.agent.create({
      data: {
        name: `${agent.name} (Copy)`,
        status: agent.status,
        createdById: ctx.session.user.id,
      },
    });
  });
