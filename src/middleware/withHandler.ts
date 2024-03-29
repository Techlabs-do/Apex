import { APIGatewayProxyEvent } from "aws-lambda";
import { IErrorInterface } from "../interfaces/error.interface";
import { generateLog } from "../utils/logger";
import {
  respondWith200,
  respondWith401,
  respondWith404,
  respondWith422,
  respondWith500OrOther
} from "../utils/http/response";
import { createRequest } from "../utils/http/request";
import { getUserIDFromJWT, getUserTypeFromJWT } from "../utils/http/token";
import { Request } from "../interfaces/request.interface";

const withHandler = (handler: (event: Request) => Promise<any>, info: string) => {
  return async (event: APIGatewayProxyEvent) => {
    try {
      const request = createRequest();
      request.clear();
      request.setParams(event.pathParameters);
      request.setAws(event);

      let userId = getUserIDFromJWT(String(event.headers.authorization));
      let userType = getUserTypeFromJWT(String(event.headers.authorization));
      request.setUser({ id: userId, type: userType });

      return respondWith200(await handler(request));
    } catch (error) {
      const err = error as IErrorInterface;

      if (err.name === "NotFoundException") {
        return respondWith404(err.message);
      }

      if (err.name === "ValidationException") {
        return respondWith422(err.fields, err.message);
      }

      if (err.name === "UnAuthorizedException") {
        return respondWith401(err);
      }

      generateLog({
        level: "error",
        message: { info, error: err.message },
      });

      return respondWith500OrOther(err.message as string);
    }
  };
};

export default withHandler;
