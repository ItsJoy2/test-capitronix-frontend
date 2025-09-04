export type LoginResponse = {
  data: {
    data?: {
      token: string;
    };
    errors?: {
      email: string;
    };
    success: boolean;
    message?: string | undefined;
  };
  status: number;
  success: boolean;
};
export type signUpResponse = {
  data?: {
    token: string;
    errors?: {
      email: string;
    };
    success: boolean;
    message?: string | undefined;
  };
  status: number;
  success: boolean;
};
