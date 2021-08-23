import { Application, Request, Response } from "express";
import { ServerRouteMethod } from "../types/methods";
import { canStringifyAsJson } from "../utils/json";

export class Router {
    public app: Application | undefined;

    public route(method: ServerRouteMethod, path: string, logic: (req: Request, res: Response, next?: () => void) => any) {
        const app: any = this.app;

        const doLogicExpectResult = (req: Request, res: Response, next?: () => void) => {
            const response = logic.call(this, req, res, next);
            const type = typeof(response);

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
}