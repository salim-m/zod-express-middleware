import type { Request, Response, NextFunction } from "express";
import type { Args, Path, Options } from "./types";
import type { ZodSchema } from "zod";

const build = (
  path: Path,
  schema: ZodSchema,
  args: Args,
  options?: Options
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req[path]);
    if (!parsed.success) {
      args.onError(parsed.error);
      return;
    }

    const o = options !== undefined ? options : args.defaultOptions;
    if (o && o.whitelist) {
      req[path] = parsed.data;
    } else {
      req[path] = {
        ...req[path],
        ...parsed.data,
      };
    }
  };
};

export const createZodMiddleware = (args: Args) => {
  return {
    body: (schema: ZodSchema, options?: Options) =>
      build("body", schema, args, options),
    query: (schema: ZodSchema, options?: Options) =>
      build("query", schema, args, options),
  };
};
