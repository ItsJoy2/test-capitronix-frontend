"use server";
import { cookies } from "next/headers";

type ApiErrorMessage = {
  path: string;
  message: string;
};

type IProps<TData> = {
  data: TData;
  postUrl: string;
};

type ApiResponse<TResponse = unknown> = {
  success: boolean;
  data?: TResponse;
  message?: string;
  errorMessages?: ApiErrorMessage[];
};

export const postData = async <TData = unknown, TResponse = unknown>({
  data,
  postUrl,
}: IProps<TData>): Promise<ApiResponse<TResponse>> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("investPro")?.value;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["investPro"] = token;
  }

  try {
    const response = await fetch(`${process.env.BASE_URL}${postUrl}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    const responseData: ApiResponse<TResponse> = await response.json();

    if (!response.ok || !responseData.success) {
      return responseData;
    }

    return responseData;
  } catch {
    return {
      success: false,
    };
  }
};
