import IResponseConverter from "./IResponseConverter";
import { Request, Response } from "express";

/**
 * A helper class that wraps multiple converters, so we can send our responses to the user
 * in the required format (based on the Accept HTTP header).
 */
export default class ResponseFormatter {

    /**
     * Array of available converter objects.
     */
    converters: IResponseConverter[];

    constructor() {
        this.converters = [];
    }

    /**
     * Register a new response converter with this function.
     * @param converter The new converter.
     */
    addConverter(converter: IResponseConverter): void {
        this.converters.push(converter);
    }

    /**
     * Send the given object in the required format to the user based on the Accept HTTP header, with
     * the help of the registered converter objects.
     * @param req The request object.
     * @param res The response object.
     * @param resObj The object that we have to convert to a given format.
     */
    formatResponse(req: Request, res: Response, resObj: any): void {

        // select the required converter based on the request's Accept header
        const converters = this.converters.filter(converter => converter.responseType === req.get("Accept"));
        
        // if theres not any converter with the given filter, send the response in JSON format
        if(converters.length === 0) {
            res.json(resObj);
            return;
        }

        // select the first converter from the filtered list
        const converter = converters[0];
        // convert the given object and send the response in the requested format
        converter.convertResponse(req, res, resObj);

    }

}