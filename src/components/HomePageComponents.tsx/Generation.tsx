import Image from "next/image";
import React from "react";

export default function Generation() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">Generation Income</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Earn consistent returns through smart investments and trusted
            strategies designed to grow your wealth steadily.
          </p>
        </div>

        <div className="relative">
          <Image
            src="/images/generation-chart.png"
            alt="Generation Income Chart"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
