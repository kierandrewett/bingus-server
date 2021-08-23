import { Application, Request, Response } from "express";
import { ServerRouteMethod } from "../types/methods";
import { canStringifyAsJson } from "../utils/json";

export class Router {
    public app: Application | undefined;


}