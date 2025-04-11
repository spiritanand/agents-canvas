import { createTRPCRouter } from "~/server/api/trpc";
import { create } from "./create";
import { deleteAgent } from "./delete";
import { duplicate } from "./duplicate";
import { get } from "./get";
import { list } from "./list";
import { update } from "./update";
import { run } from "./run";

export const agentsRouter = createTRPCRouter({
  create,
  delete: deleteAgent,
  duplicate,
  get,
  list,
  update,
  run,
});
