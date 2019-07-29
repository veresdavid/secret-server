import IResponseConverter from "./IResponseConverter";
import { Request, Response } from "express";
import xml2js from "xml2js";

/**
 * A class that helps to convert the given object to JSON format.
 */
export default class XmlResponseConverter implements IResponseConverter {

		responseType: string = "application/xml";

        /**
         * An object that helps us to convert a given object to an XML string.
         */
		builder: xml2js.Builder;

		constructor() {

            // set up our builder object
			this.builder = new xml2js.Builder({
				rootName: "Secret",
				xmldec: {
					version: "1.0",
					encoding: "UTF-8"
				}
			});

		}


    convertResponse(req: Request, res: Response, resObj: any): void {

        // TODO: not good! if we return error object!!!!

        // convert the given object to a desired format
        let modifiedObject = convertFields(resObj);

        // convert the object to XML string
		const xml = this.builder.buildObject(modifiedObject);

        // send back the response
		res.set("Content-Type", "application/xml");
		res.send(xml);

    }

}

/**
 * A small helper function that helps us to convert the fields of a given object to a desired format.
 * @param object The object that we want to convert to a custom format.
 */
function convertFields(object: any): any {

    // construct empty result object
    const resultObject: any = {};

    // iterate over every field of the given object
    for(const field in object) {

        // if the current field is a Date object, convert it to ISO string
        if(object[field] instanceof Date) {
            resultObject[field] = object[field].toISOString();
        }
        // else the field remain the same
        else {
            resultObject[field] = object[field];
        }

    }

    // return result object
    return resultObject;

}