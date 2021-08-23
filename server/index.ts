export * from "./router";

import express, { Application } from "express";

import { defaultOptions } from "../config/options";
import { log } from "../log";
import { setupSecurityFeatures } from "../security";
import { ServerOptions } from "../types/server";
import { Router } from "./router";

export class Server extends Router {
    public application: Application;
    public options: ServerOptions;

    public constructor(options?: Partial<ServerOptions>) {
        super();

        this.application = express();
        this.options = { ...options || {}, ...defaultOptions };

        setupSecurityFeatures(
            this, 
            this.options.securityFeatures
        );

        super.app = this.application;
    }

    public start() {
        const { 
            port,
            host
        } = this.options;

        this.application.listen(port, host || "", () => {
            process.env.__BINGUS_APP_STARTED = Date.now().toString();

            log(`Server started at http://${host}:${port}.`);
        })
    }
}