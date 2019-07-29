import IResponseConverter from "./IResponseConverter";
import { Request, Response } from "express";

/**
 * A class that helps to convert the given object to JSON format.
 */
export default class JsonResponseConverter implements IResponseConverter {

    responseType: string = "application/json";

    convertResponse(req: Request, res: Response, resObj: any): void {
        // its pretty easy
        res.json(resObj);
    }

}