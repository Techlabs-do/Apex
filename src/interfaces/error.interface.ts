export type IErrorInterface = {
  status: number;
  code: string;
  message: string;
  fields: Object;
  meta: {
    field_name: string;
    cause: string;
    target: string[];
  };
};
