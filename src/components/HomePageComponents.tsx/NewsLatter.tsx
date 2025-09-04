import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function NewsLatter() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Envelope illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="w-64 h-64 lg:w-80 lg:h-80">
                <img
                  src="/images/newsletter-envelope-new.png"
                  alt="Newsletter envelope with charts"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Right side - Newsletter content */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-white">
                  Subscribe to Capitronix
                </h2>
                <p className="text-lg text-white/90">
                  Stay updated with market trends, Forex strategies, and
                  exclusive investment opportunities to grow your wealth
                  smarter.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <Input
                    placeholder="capitronix@gmail.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-sm"
                  />
                  <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8">
                    Subscribe
                  </Button>
                </div>

                <p className="text-sm text-white/70">
                  By Subscribing, You agree to Our terms Of Service and Privacy
                  policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
