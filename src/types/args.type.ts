import type { HandlerFunc } from "./handler.type";
import type { Options } from "./options.type";

export type Args = {
  onError: HandlerFunc;
  defaultOptions?: Options;
};
