import * as logger from "winston";

interface IBaseLogger {
  level: "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
  message: string | any;
}

export function generateLog({ level, message }: IBaseLogger) {
  logger.log({ level, message });
}
