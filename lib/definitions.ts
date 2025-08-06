export type FormState = {
  message: string | null;
  errors?: {
    [key: string]: string[] | undefined;
  };
};
