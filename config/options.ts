import { ServerOptions } from "../types/server";

export const defaultOptions: ServerOptions = {
    port: 3000,
    host: "0.0.0.0",
    requestLogger: true,
    securityFeatures: false
}