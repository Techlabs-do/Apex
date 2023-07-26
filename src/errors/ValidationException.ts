import { VALIDATION_FAILED } from "../utils/enums/error.enum";

export class ValidationException extends Error {
  public status: number;
  public message: string;
  public fields: Object;

  constructor(fields: Object, message?: string) {
    super(message);
    this.status = 422;
    this.name = "ValidationException";
    this.message = message ?? VALIDATION_FAILED;
    this.fields = fields;
  }
}
