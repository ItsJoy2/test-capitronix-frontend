"use client";

import { Images } from "@/lib/store/image";
import { Shield, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={Images.about}
              alt="Financial Growth Chart"
              width={500}
              height={400}
              className="w-full h-auto rounded-md"
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">About Us</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Capitronix is a next-generation Forex trading and investment
                platform offering secure, transparent, and high-return
                opportunities. With expert traders, automated strategies, daily
                ROI, and multiple bonuses, we empower global investors to
                achieve financial independence and sustainable wealth growth.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <motion.div
                    style={{
                      originX: "50%",
                      originY: "50%",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{ rotateY: 360 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      ease: "linear",
                    }}
                  >
                    <Shield className="h-6 w-6 text-blue-600" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">
                    Secure Platform
                  </h3>
                  <p className="text-sm text-gray-600">
                    All transactions and investments are protected with advanced
                    security systems, ensuring your funds remain safe at every
                    step.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <motion.div
                    style={{
                      originX: "50%",
                      originY: "50%",
                      transformStyle: "preserve-3d",
                    }}
                    animate={{ rotateY: 360 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 2,
                      ease: "linear",
                    }}
                  >
                    <Users className="h-6 w-6 text-blue-600" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">
                    Trusted Expertise
                  </h3>
                  <p className="text-sm text-gray-600">
                    Backed by skilled traders and years of Forex experience,
                    Capitronix provides reliable guidance and strategies for
                    consistent growth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
