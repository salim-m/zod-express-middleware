import type { ZodError } from "zod";

export type HandlerFunc = (err: ZodError) => void;
