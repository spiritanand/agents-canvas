import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { findAgentOrThrow } from "./utils";

export const get = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    return findAgentOrThrow({ ctx, agentId: input.id });
  });
