import { z } from "zod";

export interface FlowNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: Record<string, unknown>;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
}

export interface CanvasState {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export type UpdateCanvasInput = {
  agentId: string;
  canvas: CanvasState;
};

export const nodeSchema = z.object({
  id: z.string(),
  type: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.record(z.unknown()),
});

export const edgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
});

export const canvasSchema = z.object({
  nodes: z.array(nodeSchema),
  edges: z.array(edgeSchema),
});

export function isCanvasState(value: unknown): value is CanvasState {
  return canvasSchema.safeParse(value).success;
}
