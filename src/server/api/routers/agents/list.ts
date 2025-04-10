import { protectedProcedure } from "~/server/api/trpc";

export const list = protectedProcedure.query(async ({ ctx }) => {
  return ctx.db.agent.findMany({
    where: {
      createdById: ctx.session.user.id,
    },
    orderBy: {
      editedAt: "desc",
    },
  });
});
