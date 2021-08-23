import { Request, Response } from "express";
import { log } from "../log";

const requestLogger = (req: Request, res: Response, next?: any) => {
    // console.log(res.statusCode)

    // log(`${req.method} ${req.path}`);

    // next();
};

export default requestLogger;