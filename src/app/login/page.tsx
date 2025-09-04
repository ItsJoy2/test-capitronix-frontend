"use client";

import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { TextField } from "@/components/form/fields/TextField";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { LoginResponse } from "@/components/types/loginType/loginType";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { Images } from "@/lib/store/image";
import { loginSchema } from "@/schema/loginSchema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { z } from "zod";

type FormType = z.infer<typeof loginSchema>;

const initialValues: FormType = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType | React.FormEvent<HTMLFormElement>) => {
      const response = await axiosInstance.post<LoginResponse>(`/login`, data);
      return response.data;
    },
    onSuccess: (data: LoginResponse) => {
      if (data.success === true) {
        Cookies.set("cpnx_t", data.data.data?.token ?? "", {
          expires: 3,
        });
        setTimeout(() => {
          showSuccessAlert(data.data?.message);
          router.push("/dashboard");
        }, 50);
      } else {
        showErrorAlert(
          data?.data?.errors?.email || data?.data?.message || "Login failed"
        );
      }
    },

    onError: (err: AxiosError<{ message: string }>) => {
      console.error("Login failed", err);
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });
  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data);
  };

  const [showPass, setShowPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-[#0f172b] to-[#1C3679] text-white">
      <div className="flex justify-center w-full">
        <Link href="/">
          <Image
            className="w-[120px] mb-2"
            src={Images.logo1}
            alt="img"
            width={300}
            height={300}
          />
        </Link>
      </div>

      <Card className="w-full max-w-md text-white rounded-xl mt-5 bg-[#1d293d]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Login</CardTitle>
          <CardDescription className="text-white/70">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <GenericForm
            schema={loginSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-4">
              <TextField
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                inputClass="px-3 text-gray-900"
                labelClass=""
              />
              <div className="relative">
                <TextField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type={!showPass ? "password" : "text"}
                  inputClass="px-3 text-gray-900"
                  labelClass=""
                />
                {!showPass ? (
                  <GoEyeClosed
                    onClick={handlePass}
                    className="absolute top-[30px] size-5 right-3 cursor-pointer text-gray-900"
                  />
                ) : (
                  <GoEye
                    onClick={handlePass}
                    className="absolute top-[30px] size-5 right-3 cursor-pointer text-gray-900"
                  />
                )}
                <div className="w-full text-end">
                  <Link
                    className="text-end text-[14px] font-medium "
                    href="/send-email"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <SubmitButton
                width="full"
                label="Login"
                isLoading={isPending}
                loadingLabel="Processing.."
              />
            </div>
          </GenericForm>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-white/70">
            {`Don't have an account? `}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Join Now
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
