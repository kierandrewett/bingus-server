import { base } from "./base";

export const error = (...payload: any[]) => base("error", payload);