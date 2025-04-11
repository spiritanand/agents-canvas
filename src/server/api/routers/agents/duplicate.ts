import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { findAgentOrThrow } from "./utils";
import type { Prisma } from "@prisma/client";

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
        status: false,
        createdById: ctx.session.user.id,
        canvas: agent.canvas as Prisma.InputJsonValue,
      },
    });
  });
