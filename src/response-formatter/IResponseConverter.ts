import { Request, Response } from "express";

/**
 * An interface that helps to abstract the behaviour of a response converter object.
 */
export default interface IResponseConverter {

    /**
     * This field contains the MIME type of the response that we should convert our response to
     * (like application/json, application/xml, etc.).
     */
    responseType: string;

    /**
     * 
     * @param req The request object.
     * @param res The response object.
     * @param resObj The object that we should convert to a given format.
     */
    convertResponse(req: Request, res: Response, resObj: any): void;

}