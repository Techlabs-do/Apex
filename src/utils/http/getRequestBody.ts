import { SQSRecord } from "aws-lambda";

export function getRequestBody<TBody>({ body }: any | SQSRecord): TBody | null {
  if (body) return JSON.parse(body);
  return null;
}
