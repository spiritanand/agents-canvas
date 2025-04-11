import { createTRPCRouter } from "~/server/api/trpc";
import { updateCanvas } from "./update";

export const canvasRouter = createTRPCRouter({
  update: updateCanvas,
});
