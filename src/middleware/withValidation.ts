import { ValidationException } from "errors/ValidationException";
import { getRequestBody } from "utils/http/getRequestBody";
import { ZodSchema, z } from "zod";
import { createRequest } from "../utils/http/request";
import { Request } from "interfaces/request.interface";
import { BODY_NOT_FOUND } from "utils/enums/error.enum";

export const withValidation = (schema: ZodSchema<any>) => {
  return (handler: (event: Request) => Promise<any>) => {
    return async (event: Request) => {
      const request = createRequest();

      const body = getRequestBody<{ data: z.infer<typeof schema> }>(event.aws);

      if (!body) throw new ValidationException(BODY_NOT_FOUND);

      const data = body.data;
      const validationResult = schema.safeParse(data);

      if (!validationResult.success) throw new ValidationException(validationResult.error);

      request.setBody(data);

      return handler(event);
    };
  };
};
