import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { canvasSchema } from "~/types/canvas";

export const nodesRouter = createTRPCRouter({
  updateCanvas: protectedProcedure
    .input(
      z.object({
        agentId: z.string(),
        canvas: canvasSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.agent.update({
        where: {
          id: input.agentId,
          createdById: ctx.session.user.id,
        },
        data: {
          canvas: input.canvas as Prisma.InputJsonValue,
          editedAt: new Date(),
        },
      });
    }),
});
