import ResponseFormatter from "./response-formatter/response-formatter";
import JsonResponseConverter from "./response-formatter/JsonResponseConverter";
import XmlResponseConverter from "./response-formatter/XmlResponseConverter";

const responseFormatter = new ResponseFormatter();
responseFormatter.addConverter(new JsonResponseConverter());
responseFormatter.addConverter(new XmlResponseConverter());

export default responseFormatter;