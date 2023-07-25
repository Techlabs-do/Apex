import { NotFoundException } from "../errors/NotFoundException";
import { Request } from "../interfaces/request.interface";
import { NOT_FOUND } from "../utils/enums/error.enum";

export function withParamValidation(params?: Array<string>) {
  return (handler: (request: Request) => Promise<any>) => {
    return async (request: Request) => {
      const id = request.params.id;

      if (!id || isNaN(+id)) throw new NotFoundException(NOT_FOUND);

      return handler(request);
    };
  };
}
