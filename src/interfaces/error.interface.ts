export type IErrorInterface = {
  status: number;
  name: string;
  code: string;
  message: string;
  fields: Object;
  meta: {
    field_name: string;
    cause: string;
    target: string[];
  };
};
