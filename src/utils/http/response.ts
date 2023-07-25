import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { IErrorInterface } from "../../interfaces/error.interface";

export function factoryResponseBody(statusCode: number, body: string | string): APIGatewayProxyStructuredResultV2 {
  return { statusCode, body, isBase64Encoded: false };
}

//TODO i have change this line have a look
export function respondWith400(body: Record<string, any> | string): APIGatewayProxyStructuredResultV2 {
  let data;
  try {
    if (typeof body === "string") data = JSON.parse(body);
    return factoryResponseBody(400, JSON.stringify({ error: true, message: data }));
  } catch (error) {
    return factoryResponseBody(400, JSON.stringify({ error: true, message: body }));
  }
}

export function respondWith404(body: Record<string, any> | string): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(404, JSON.stringify(body));
}

export function respondWith500OrOther(
  body: Record<string, any> | string,
  status?: number
): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(status ?? 500, JSON.stringify({ error: true, message: body }));
}

export function respondWith200(body: Record<string, any> | string): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(200, JSON.stringify({ error: false, data: body }));
}

export function responseToJSON(response: Record<string, any> | string): string {
  return JSON.stringify(response);
}

export function respondWith422(body: Record<string, any> | string, message: String): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(422, JSON.stringify({ isError: true, body, message }));
}
export function respondWith401(body: Record<string, any> | string): APIGatewayProxyStructuredResultV2 {
  return factoryResponseBody(401, JSON.stringify({ isError: true, body }));
}

export function responseWithPrismaErrors(error: IErrorInterface) {
  if (error?.code === "P2002") {
    // const uniqueConstraints: string[] = error?.meta?.target as string[];
    // for (let index = 0; index < uniqueConstraints.length; index++) {
    //   return respondWith500OrOther(`Unique constraint failed on the ${uniqueConstraints}`);
    // }
    return respondWith500OrOther(`Unique constraint failed`);
  }

  if (error?.code === "P2003") {
    return respondWith500OrOther(`The ${error?.meta?.field_name} field is required`);
  }

  if (error?.code === "P2003") {
    return respondWith500OrOther(error?.meta?.cause as string);
  }

  return respondWith500OrOther(error.message as string);
}
