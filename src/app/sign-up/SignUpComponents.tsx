"use client";

import type React from "react";
import { useRef, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { z } from "zod";
import { TextField } from "@/components/form/fields/TextField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { registerSchema } from "@/schema/loginSchema/loginSchema";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import { signUpResponse } from "@/components/types/loginType/loginType";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { APIErrorResponse } from "@/components/types/signUpType/signUpType";
import { PhoneNumberField } from "@/components/form/fields/PhoneNumberField";
import Image from "next/image";
import { Images } from "@/lib/store/image";

type PhoneCountry = {
  areaCodes?: string[];
  dialCode: string;
  format?: string;
  iso2: string;
  name: string;
  priority?: number;
};

export default function SignUpComponents() {
  const router = useRouter();
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };
  const handleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const searchParams = useSearchParams();
  const referCode = searchParams.get("ref");
  const formRef = useRef<GenericFormRef<FormType>>(null);

  type FormType = z.infer<typeof registerSchema>;
  type RegisterPayload = Omit<FormType, "confirm_password">;

  const initialValues: FormType = {
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    referCode: referCode || "",
  };
  const [phoneData, setPhoneData] = useState<PhoneCountry>();
  const { mutate, isPending } = useMutation({
    mutationFn: async (
      data: RegisterPayload | React.FormEvent<HTMLFormElement>
    ) => {
      const finalData = {
        ...data,
        country_code: phoneData?.dialCode,
        country: phoneData?.name,
      };
      const response = await axiosInstance.post<signUpResponse>(
        `/register`,
        finalData
      );
      return response.data;
    },
    onSuccess: (data: signUpResponse) => {
      if (data.success === true) {
        Cookies.set("cpnx_t", data.data?.token ?? "", {
          expires: 3,
        });
        setTimeout(() => {
          showSuccessAlert(data.data?.message);
          router.push("/dashboard");
        }, 50);
      }
    },
    onError: (err: AxiosError<APIErrorResponse>) => {
      console.log("Registration failed", err);
      showErrorAlert(err.message);
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { confirm_password, ...rest } = data;
    console.log(confirm_password);
    mutate(rest);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172b] to-[#1C3679] text-white">
      <div className="w-full max-w-md">
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

        <Card className="bg-[#1d293d] text-white flex gap-3">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-white/70">
              Enter your information to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <GenericForm
              schema={registerSchema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <div className="space-y-3 mb-5">
                <TextField
                  name="name"
                  label="Name"
                  type="text"
                  placeholder="Enter name"
                  inputClass="px-3 text-gray-900"
                  labelClass=""
                />

                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="xyz@gmail.com"
                  inputClass="px-3 text-gray-900"
                  labelClass=""
                />
                <div className="relative">
                  <PhoneNumberField
                    name="mobile"
                    label="Mobile"
                    onChange={({ countryCode }) => {
                      setPhoneData(countryCode);
                    }}
                  />
                </div>

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
                      className="absolute top-[30px] size-5 text-gray-900 right-1 cursor-pointer"
                    />
                  ) : (
                    <GoEye
                      onClick={handlePass}
                      className="absolute top-[30px] size-5 text-gray-900  right-1 cursor-pointer"
                    />
                  )}
                </div>

                <div className="relative">
                  <TextField
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Enter your confirm password"
                    type={!showConfirmPass ? "password" : "text"}
                    inputClass="px-3 text-gray-900"
                    labelClass=""
                  />
                  {!showConfirmPass ? (
                    <GoEyeClosed
                      onClick={handleConfirmPass}
                      className="absolute top-[30px] size-5 text-gray-900 right-1 cursor-pointer"
                    />
                  ) : (
                    <GoEye
                      onClick={handleConfirmPass}
                      className="absolute top-[30px] size-5 text-gray-900  right-1 cursor-pointer"
                    />
                  )}
                </div>

                <TextField
                  name="referCode"
                  label="Refer Code"
                  placeholder="Refer code"
                  type="text"
                  inputClass="px-3 text-gray-900"
                  labelClass=""
                  readOnly={!!referCode}
                />

                <SubmitButton
                  width="full"
                  label="Register"
                  isLoading={isPending}
                  loadingLabel="Processing.."
                />
              </div>
            </GenericForm>
          </CardContent>

          <CardFooter className="flex flex-col">
            <div className="text-center text-sm /70">
              Already have an account?{" "}
              <Link href="/login" className=" hover:underline font-medium">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
