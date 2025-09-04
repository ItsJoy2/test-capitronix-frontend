"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { BsChevronDown, BsClock } from "react-icons/bs";
import { FaCopy } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import QRCode from "react-qr-code";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { CopyToClipboard } from "@/lib/copyClipboard/copyClipboard";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";

type InvoiceData = {
  wallet_address: string;
  amount: string;
  created_at: string;
  token_name: string;
};

type PaymentStatus = {
  paymentStatus: "pending" | "processing" | "success" | "expired";
};

const Invoice = () => {
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");

  const [data, setData] = useState<InvoiceData>();
  const [status, setStatus] = useState<PaymentStatus>({
    paymentStatus: "pending",
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchInvoiceStatus = async () => {
      if (!invoiceId || isExpired) return;

      try {
        const res = await axios.get(
          `https://evm.blockmaster.info/api/payments/${invoiceId}`
        );

        if (
          res.data.status === false &&
          res.data.payment_status === "completed"
        ) {
          setStatus({ paymentStatus: "success" });
          router.push("/dashboard");
        } else if (res.data.status === true) {
          setStatus({ paymentStatus: "processing" });
        } else {
          setStatus({ paymentStatus: "pending" });
        }
      } catch (err) {
        console.error("Failed to fetch invoice data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoiceStatus();
    interval = setInterval(fetchInvoiceStatus, 15000);

    return () => clearInterval(interval);
  }, [invoiceId, isExpired, router]);

  const { copy, copied } = CopyToClipboard();
  const { copy: walletCopy, copied: walletCopied } = CopyToClipboard();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await axios.get(
          `https://evm.blockmaster.info/api/invoice/${invoiceId}`
        );
        setData(res.data.invoice);
      } catch (err) {
        console.error("Failed to fetch invoice data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (invoiceId) fetchInvoice();
  }, [invoiceId]);

  useEffect(() => {
    if (!data?.created_at) return;

    const createdAt = new Date(data.created_at);
    const expiryTime = new Date(createdAt.getTime() + 20 * 60 * 1000);

    const updateTimeLeft = () => {
      const now = new Date();
      const remaining = expiryTime.getTime() - now.getTime();

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft("00:00");
        setStatus({ paymentStatus: "expired" });
        return;
      }

      const minutes = Math.floor(remaining / 1000 / 60);
      const seconds = Math.floor((remaining / 1000) % 60);
      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    };

    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [data?.created_at]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Loading invoice...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-lg">
        Failed to load invoice data.
      </div>
    );
  }

  const { wallet_address, amount, token_name } = data;

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white rounded-2xl shadow-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-yellow-300 rounded-full opacity-20" />
              <div className="absolute top-1 left-1 w-2 h-6 bg-yellow-400 rounded-full transform -rotate-12" />
              <div className="absolute top-2 right-1 w-1 h-4 bg-yellow-400 rounded-full transform rotate-12" />
              <div className="absolute bottom-1 left-2 w-3 h-1 bg-yellow-400 rounded-full" />
            </div>
            <h1 className="text-2xl font-semibold">Capitronix</h1>
          </div>

          <div>
            {!isExpired ? (
              <div className="flex items-center space-x-2 text-blue-500">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 border-2 border-blue-500 rounded-full animate-spin border-t-transparent" />
                </div>

                <span className="text-sm font-medium">
                  Waiting for payment{" "}
                  <span className="font-mono">{timeLeft}</span>
                </span>
              </div>
            ) : (
              <div className="text-red-500 text-sm font-medium">
                Invoice expired
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Send deposit</h2>
              <div className="flex items-center space-x-1 text-gray-500">
                <BsClock className="w-4 h-4" />
                <span className="text-sm">
                  {data?.created_at &&
                    new Date(data.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                </span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-white border border-gray-200 rounded-lg p-4">
                  <QRCode
                    size={256}
                    style={{
                      height: "auto",
                      maxWidth: "100%",
                      width: "100%",
                    }}
                    value={data.wallet_address}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold ">
                      {amount} {token_name}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded">
                      network (BEP20)
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      {copied ? (
                        <IoCheckmarkDoneOutline className="size-5" />
                      ) : (
                        <MdContentCopy
                          className="size-5 cursor-pointer"
                          onClick={() => copy(`${amount}`)}
                        />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="text-sm mb-2">Address</div>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 text-sm font-mono  break-all">
                      {wallet_address}
                    </code>
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      {walletCopied ? (
                        <IoCheckmarkDoneOutline className="size-5" />
                      ) : (
                        <MdContentCopy
                          className="size-5 cursor-pointer"
                          onClick={() => walletCopy(`${wallet_address}`)}
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* More Details */}
            <div className="mt-8">
              <button
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className="flex items-center space-x-2"
              >
                <span className="font-medium">More details</span>
                <BsChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showMoreDetails ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showMoreDetails && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Network:</strong> network (BEP20)
                    </p>
                    <p>
                      <strong>Token:</strong> {token_name}
                    </p>
                    <p>
                      <strong>Confirmations:</strong> 12 blocks
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Payment Status */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {status.paymentStatus === "expired" ? (
                <div className="relative pl-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-100">
                      <div className="w-4 h-4 bg-red-500 rounded-full" />
                    </div>
                    <span className="font-medium text-red-600">
                      Invoice expired ⌛
                    </span>
                  </div>
                </div>
              ) : (
                ["pending", "processing", "success"].map((step, index) => {
                  const isActive = status.paymentStatus === step;
                  const isCompleted =
                    (step === "pending" &&
                      ["processing", "success"].includes(
                        status.paymentStatus
                      )) ||
                    (step === "processing" &&
                      status.paymentStatus === "success");

                  const stepMap: Record<string, string> = {
                    pending: "Waiting for payment",
                    processing: "Processing payment",
                    success: "Success!",
                  };

                  const colorMap: Record<string, string> = {
                    pending: "blue",
                    processing: "yellow",
                    success: "green",
                  };

                  const color = colorMap[step];

                  return (
                    <div key={step} className="relative pl-10">
                      {/* Connector line */}
                      {index !== 0 && (
                        <div
                          className="absolute top-0 left-4 w-px h-full"
                          style={{
                            backgroundColor:
                              isCompleted || isActive
                                ? color === "blue"
                                  ? "#3B82F6"
                                  : color === "yellow"
                                  ? "#F59E0B"
                                  : "#10B981"
                                : "#E5E7EB",
                          }}
                        />
                      )}

                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isActive || isCompleted
                              ? `bg-${color}-100`
                              : "bg-gray-100"
                          }`}
                        >
                          {(step === "pending" || step === "processing") &&
                            isActive && (
                              <div
                                className={`w-4 h-4 border-2 ${
                                  step === "processing"
                                    ? "border-yellow-600"
                                    : "border-blue-500"
                                } rounded-full animate-spin border-t-transparent`}
                              />
                            )}

                          {step === "success" && isActive && (
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}

                          {!isActive && isCompleted && (
                            <div
                              className="w-4 h-4 rounded-full"
                              style={{
                                backgroundColor:
                                  color === "blue"
                                    ? "#3B82F6"
                                    : color === "yellow"
                                    ? "#F59E0B"
                                    : "#10B981",
                              }}
                            />
                          )}

                          {!isActive && !isCompleted && (
                            <div className="w-4 h-4 bg-gray-300 rounded-full" />
                          )}
                        </div>

                        <span
                          className={`font-medium ${
                            isActive
                              ? `text-${color}-600`
                              : isCompleted
                              ? `text-${color}-500`
                              : "text-gray-400"
                          }`}
                        >
                          {stepMap[step]}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
