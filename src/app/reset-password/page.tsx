"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import {
  resetPasswordSchema,
} from "@/schema/profileEdit/profileEdit";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { TextField } from "@/components/form/fields/TextField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { ProfileUpdateResponse } from "@/components/types/profileUpdate/profileUpdate";
import Image from "next/image";
import Link from "next/link";
import { Images } from "@/lib/store/image";
import axios_password from "@/lib/fetch/axiosConfig/axios_password";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useAuthStore } from "@/lib/store/userEmail/useremail";
import { useRouter } from "next/navigation";

type FormType = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const email = useAuthStore.getState().email;

  const handlePass = () => {
    setShowPass(!showPass);
  };
  const handleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const initialValues: FormType = {
    email: email || "",
    code: "",
    password: "",
    confirm_password: "",
  };
  type resetPayload = Omit<FormType, "confirm_password">;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: resetPayload) => {
      const response = await axios_password.post<any>(`/reset-password`, data);
      return response.data;
    },
    onSuccess: (data: ProfileUpdateResponse) => {
      if (data.data.status === true) {
        showSuccessAlert(data.data.message);
        router.push("/login");
      } else {
        showErrorAlert(data.data.message);
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    if ("preventDefault" in data) return;
    const { confirm_password, ...rest } = data;
    console.log(confirm_password);
    mutate(rest);
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
      </div>{" "}
      <Card className="w-full max-w-xl shadow-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold text-white">
            Reset Passwrod
          </CardTitle>
        </CardHeader>

        <CardContent>
          <GenericForm
            schema={resetPasswordSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-5">
              <TextField
                name="code"
                label="Code"
                type="text"
                placeholder="Enter your Code"
                inputClass="px-3 text-gray-900"
                labelClass="text-gray-300"
              />
              <div className="relative">
                <TextField
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  type={!showPass ? "password" : "text"}
                  inputClass="px-3 text-gray-900"
                  labelClass="text-gray-300"
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
                  labelClass="text-gray-300"
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
              <SubmitButton
                width="full"
                label="Submit"
                loadingLabel="Processing..."
                isLoading={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg transition transform hover:scale-[1.02]"
              />
            </div>
          </GenericForm>
        </CardContent>
      </Card>
    </div>
  );
}
