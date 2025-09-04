"use client";

import React, { useRef, useState } from "react";
import { z } from "zod";
import { GenericForm, GenericFormRef } from "@/components/form/GenericForm";
import { SubmitButton } from "@/components/form/fields/SubmitButton";
import { Card, CardContent } from "@/components/ui/card";
import { User, Upload, CheckCircle, AlertCircle, Shield } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/fetch/axiosConfig/axiosConfig";
import {
  showErrorAlert,
  showSuccessAlert,
} from "@/components/toast/ToastSuccess";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useGetData } from "@/lib/fetch/axiosConfig/FetchData";
import { UserProfileResponse } from "@/components/types/profile/profile";
import { kycSchema } from "@/schema/kycSchema/kycSchema";

type FormType = z.infer<typeof kycSchema>;

interface KYCCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  preview?: string;
  hasImage: boolean;
}

const KYCCard: React.FC<KYCCardProps> = ({
  title,
  description,
  icon,
  onImageChange,
  preview,
  hasImage,
}) => {
  return (
    <Card className="group relative overflow-hidden border border-gray-200/20 bg-white/5 backdrop-blur-md rounded-xl transition-all duration-200 hover:border-blue-400/30 hover:bg-white/10">
      <CardContent className="p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white truncate">
              {title}
            </h3>
            <p className="text-gray-400 text-xs">{description}</p>
          </div>
          {hasImage && (
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          )}
        </div>

        <div className="relative">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt={title}
                className="w-full h-32 object-cover rounded-lg border border-gray-600/50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-600/50 rounded-lg p-6 text-center bg-gray-800/20 group-hover:border-blue-500/50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
              <p className="text-gray-400 text-xs">Click to upload</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default function KycVerifyPage() {
  const formRef = useRef<GenericFormRef<FormType>>(null);
  const router = useRouter();

  const [images, setImages] = useState<{
    front_image?: File;
    back_image?: File;
    selfie_image?: File;
  }>({});

  const [previews, setPreviews] = useState<{
    front_image?: string;
    back_image?: string;
    selfie_image?: string;
  }>({});

  const {
    data: profile,
    isLoading,
    refetch,
  } = useGetData<UserProfileResponse>(["profile"], `/profile`);

  const initialValues: FormType = {
    front_image: "",
    back_image: "",
    selfie_image: "",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormType) => {
      const formData = new FormData();
      if (images.front_image)
        formData.append("front_image", images.front_image);
      if (images.back_image) formData.append("back_image", images.back_image);
      if (images.selfie_image)
        formData.append("selfie_image", images.selfie_image);

      const response = await axiosInstance.post(`/kyc-submit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data;
    },
    onSuccess: (data: any) => {
      if (data.data.status === true) {
        showSuccessAlert(data.data.message);
        refetch();
        setImages({});
        setPreviews({});
        formRef.current?.reset();
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

  const handleImageChange =
    (key: keyof typeof images) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      setImages((prev) => ({ ...prev, [key]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [key]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  const kycStatus = profile?.data.user.kyc_status;
  console.log(kycStatus);

  // Determine messages for different statuses
  const renderStatusMessage = () => {
    switch (kycStatus) {
      case "1":
        return (
          <div className="text-center p-6 bg-green-800/50 rounded-xl text-green-400">
            ✓ Your KYC is verified successfully!
          </div>
        );
      case "2":
        return (
          <div className="text-center p-6 bg-yellow-800/50 rounded-xl text-yellow-400">
            ⏳ Your KYC verification is pending. Please wait for approval.
          </div>
        );
      case "3":
        return (
          <div className="text-center p-6 bg-red-800/50 rounded-xl text-red-400">
            ❌ Your KYC was rejected. Please resubmit your documents.
          </div>
        );
      default:
        return null;
    }
  };

  const allImagesUploaded =
    images.front_image && images.back_image && images.selfie_image;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Compact Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 mb-4">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Identity Verification
          </h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Upload your documents to verify your identity and secure your
            account
          </p>
        </div>

        {kycStatus === "0" || kycStatus === "3" ? (
          <GenericForm
            schema={kycSchema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <div className="space-y-4 mb-8">
              <KYCCard
                title="ID Front"
                description="Front side of government ID"
                icon={<Upload className="w-5 h-5 text-blue-400" />}
                onImageChange={handleImageChange("front_image")}
                preview={previews.front_image}
                hasImage={!!images.front_image}
              />
              <KYCCard
                title="ID Back"
                description="Back side of government ID"
                icon={<Upload className="w-5 h-5 text-blue-400" />}
                onImageChange={handleImageChange("back_image")}
                preview={previews.back_image}
                hasImage={!!images.back_image}
              />
              <KYCCard
                title="Selfie with ID"
                description="Photo of you holding your ID"
                icon={<User className="w-5 h-5 text-blue-400" />}
                onImageChange={handleImageChange("selfie_image")}
                preview={previews.selfie_image}
                hasImage={!!images.selfie_image}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  Progress:{" "}
                  {
                    Object.keys(images).filter(
                      (key) => images[key as keyof typeof images]
                    ).length
                  }
                  /3
                </span>
                {!allImagesUploaded && (
                  <div className="flex items-center space-x-1 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-xs">Upload all documents</span>
                  </div>
                )}
              </div>

              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (Object.keys(images).filter(
                        (key) => images[key as keyof typeof images]
                      ).length /
                        3) *
                      100
                    }%`,
                  }}
                />
              </div>

              <SubmitButton
                width="full"
                label="Verify KYC"
                loadingLabel="Verifying..."
                isLoading={isPending}
                className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  allImagesUploaded
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:scale-[1.01] shadow-lg shadow-blue-500/20"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
                disabled={!allImagesUploaded}
              />
              {allImagesUploaded && (
                <p className="text-center text-green-400 text-xs font-medium">
                  ✓ Ready to submit
                </p>
              )}
            </div>
          </GenericForm>
        ) : (
          renderStatusMessage()
        )}
      </div>
    </div>
  );
}
