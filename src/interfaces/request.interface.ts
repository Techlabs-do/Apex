import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";

export interface Request {
  body: any;
  params: { [key: string]: string };
  user: User;
  aws: any;
  setBody: (body: any) => void;
  setParams: (params: APIGatewayProxyEventPathParameters | null) => void;
  setAws: (event: APIGatewayProxyEvent) => void;
  setUser: (getUser: User) => void;
  clear: () => void;
}

export interface User {
  id: string;
  type: string;
}
