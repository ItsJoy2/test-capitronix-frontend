"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { profileEditSchema } from "@/schema/profileEdit/profileEdit";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { TextField } from "@/components/form/fields/TextField";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { ProfileUpdateResponse } from "@/components/types/profileUpdate/profileUpdate";
import { useRouter } from "next/navigation";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { UserProfileResponse } from "@/components/types/profile/profile";

type FormType = z.infer<typeof profileEditSchema>;

export default function ProfileEditPage() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  // ✅ Fetch profile data
  const { data: profile, isLoading } = useGetData<UserProfileResponse>(
    ["profile"],
    `/profile`
  );

  // ✅ Show loading state while fetching profile

  const initialValues: FormType = {
    name: profile?.data.user.name ?? "",
    mobile: profile?.data.user.mobile ?? "",
    address: profile?.data.user.address ?? "",
    image: profile?.data.user.image ?? "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("mobile", data.mobile ?? "");
      formData.append("address", data.address);
      if (selectedFile) formData.append("image", selectedFile);

      const response = await axiosInstance.post<ProfileUpdateResponse>(
        `/profile/update`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      return response.data;
    },

    onSuccess: (data: ProfileUpdateResponse) => {
      if (data.data.status === true) {
        showSuccessAlert(data.data.message);
        router.push("/dashboard/my-account");
      } else {
        showErrorAlert(data.data.message);
      }
    },

    onError: (err: AxiosError<{ message: string }>) => {
      showErrorAlert(err.response?.data.message || "Something went wrong");
    },
  });

  const handleSubmit = (data: FormType | React.FormEvent<HTMLFormElement>) => {
    mutate(data as FormType);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  const displayedImage = previewImage
    ? previewImage
    : profile?.data.user.image
    ? profile.data.user.image.startsWith("http")
      ? profile.data.user.image
      : `${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile.data.user.image}`
    : null;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading profile...
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-xl shadow-2xl border border-gray-700 bg-gray-800/60 backdrop-blur-md rounded-2xl">
        <CardHeader className="text-center space-y-4">
          {/* Profile Image / Avatar */}
          <div className="flex justify-center">
            {displayedImage ? (
              <img
                src={displayedImage}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-700 border-4 border-gray-600 shadow-lg">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>

          <CardTitle className="text-2xl font-bold text-white">
            Edit Your Profile
          </CardTitle>
          <p className="text-gray-400 text-sm">
            Update your personal information below
          </p>
        </CardHeader>

        <CardContent>
          <GenericForm
            schema={profileEditSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-5">
              {/* Name */}
              <TextField
                name="name"
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                inputClass="px-4 py-2 rounded-xl text-gray-200 bg-gray-900/70 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                labelClass="text-gray-300 font-medium"
              />

              {/* Mobile */}
              <TextField
                name="mobile"
                label="Mobile Number"
                type="text"
                placeholder="Enter your phone number"
                inputClass="px-4 py-2 rounded-xl text-gray-200 bg-gray-900/70 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                labelClass="text-gray-300 font-medium"
              />

              {/* Address */}
              <TextField
                name="address"
                label="Address"
                type="text"
                placeholder="Enter your address"
                inputClass="px-4 py-2 rounded-xl text-gray-200 bg-gray-900/70 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                labelClass="text-gray-300 font-medium"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-gray-300 font-medium">
                  Profile Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-400 
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700 transition"
                />
              </div>

              {/* Submit */}
              <SubmitButton
                width="full"
                label="Save Changes"
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
