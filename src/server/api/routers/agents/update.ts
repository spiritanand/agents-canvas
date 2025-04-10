import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { findAgentOrThrow } from "./utils";

export const update = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().min(1).max(100),
      status: z.boolean().optional(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    await findAgentOrThrow({ ctx, agentId: input.id });

    return ctx.db.agent.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        status: input.status,
      },
    });
  });
