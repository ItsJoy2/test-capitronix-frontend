export type FieldErrors = {
    mobile?: string[];
    email?: string[] | string;
  };
  
  export type APIErrorResponse = {
    message: {
      errors?: FieldErrors;
    };
  };