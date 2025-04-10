import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { findAgentOrThrow } from "./utils";

export const deleteAgent = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await findAgentOrThrow({ ctx, agentId: input.id });

    return ctx.db.agent.delete({
      where: {
        id: input.id,
      },
    });
  });
