import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";

export const create = protectedProcedure
  .input(
    z.object({
      name: z.string().min(1).max(100),
    })
  )
  .mutation(async ({ ctx, input }) => {
    return ctx.db.agent.create({
      data: {
        name: input.name,
        createdById: ctx.session.user.id,
      },
    });
  });
