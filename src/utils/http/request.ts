import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";
import { Request, User } from "interfaces/request.interface";

export const createRequest = (() => {
  let instance: Request;

  const init = (): void => {
    let body = {};
    let params = {};
    let user = {
      id: "",
      type: "",
    };
    let aws = {};

    instance = {
      body,
      params,
      user,
      aws,
      setBody: (newBody: any) => {
        instance.body = newBody;
      },
      setParams: (newParams: APIGatewayProxyEventPathParameters | null) => {
        const params = convertPathParamsToStrings(newParams || {});
        instance.params = params;
      },
      setUser: (newUser: User) => {
        instance.user.id = newUser.id;
        instance.user.type = newUser.type;
      },
      setAws: (event: APIGatewayProxyEvent) => {
        instance.aws = event;
      },
      clear: () => {
        instance.body = {};
        instance.params = {};
        instance.user = {
          id: "",
          type: "",
        };
      },
    };
  };

  const getInstance = (): Request => {
    if (!instance) {
      init();
    }
    return instance;
  };

  return getInstance;
})();

const convertPathParamsToStrings = (pathParams: APIGatewayProxyEventPathParameters): { [key: string]: string } => {
  const convertedParams: { [key: string]: string } = {};

  for (const key in pathParams) {
    if (pathParams.hasOwnProperty(key)) {
      const value = pathParams[key] ?? ""; // Replace undefined values with empty strings
      convertedParams[key] = value;
    }
  }

  return convertedParams;
};
