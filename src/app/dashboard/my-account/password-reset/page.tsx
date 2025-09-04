"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { passwordResetSchema } from "@/schema/profileEdit/profileEdit";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { TextField } from "@/components/form/fields/TextField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { ProfileUpdateResponse } from "@/components/types/profileUpdate/profileUpdate";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { useRouter } from "next/navigation";

type FormType = z.infer<typeof passwordResetSchema>;

export default function ResetPassword() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const handlePass = () => {
    setShowPass(!showPass);
  };
  const handleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const initialValues: FormType = {
    old_password: "",
    password: "",
    confirm_password: "",
  };
  type resetPayload = Omit<FormType, "confirm_password">;
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: resetPayload) => {
      const response = await axiosInstance.post<any>(`/update-password`, data);
      return response.data;
    },
    onSuccess: (data: ProfileUpdateResponse) => {
      if (data.data.status === true) {
        showSuccessAlert(data.data.message);
        router.push("/dashboard");
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
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-xl shadow-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-2xl">
        <CardHeader className="text-center space-y-4">
          <CardTitle className="text-2xl font-bold text-white">
            Reset Passwrod
          </CardTitle>
        </CardHeader>

        <CardContent>
          <GenericForm
            schema={passwordResetSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-5">
              <div className="relative">
                <TextField
                  name="old_password"
                  label="Old Password"
                  placeholder="Enter your password"
                  type="password"
                  inputClass="px-3 text-gray-900"
                  labelClass=""
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
              <SubmitButton
                width="full"
                label="Chenge Password"
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
