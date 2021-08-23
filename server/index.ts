export * from "./router";

import express, { Application, Request, Response } from "express";

import { defaultOptions } from "../config/options";
import { log } from "../log";
import requestLogger from "../middleware/logger";
import { setupSecurityFeatures } from "../security";

import { ServerRouteMethod } from "../types/methods";
import { ServerOptions } from "../types/server";

import { canStringifyAsJson } from "../utils/json";

export class Server {
    public application: Application;
    public options: ServerOptions;

    public constructor(options?: Partial<ServerOptions>) {
        process.env.__BINGUS_APP_STARTED = Date.now().toString();

        this.application = express();
        this.options = { ...defaultOptions, ...options || {} };

        // Now we have setup the application we can add routes
        setupSecurityFeatures(
            this, 
            this.options.securityFeatures
        );
    }

    public setupInternalMiddleware() {
        this.use(requestLogger);
    }

    public route(method: ServerRouteMethod, path: string, logic: (req: Request, res: Response, next?: () => void) => any) {
        const app: any = this.application;

        const doLogicExpectResult = (req: Request, res: Response, next?: () => void) => {
            const response = logic.call(this, req, res, next);
            const type = typeof(response);

            log(`${req.method} ${req.path} => ${res.statusCode}`);

            if(response === undefined) return res.end();

            switch(type) {
                case "object":
                    if(canStringifyAsJson(response)) {
                        res.json(response);
                        break;
                    }
                default:
                    res.send(response);
                    break;
            }

            if(method == "use" && next) next();
        }

        if(method !== "use") {
            app[method](path, doLogicExpectResult);
        } else {
            app[method](doLogicExpectResult);
        }
    }

    public get(path: string, logic: (req: Request, res: Response) => any) {
        this.route("get", path, logic);
    }

    public use(logic: (req: Request, res: Response, next?: any) => any) {
        this.route("use", "", logic);
    }

    public start() {
        const { 
            port,
            host
        } = this.options;

        this.setupInternalMiddleware();

        this.application.listen(port, host || "", () => {
            log(`Server started at http://${host}:${port}.`);
        })
    }
}