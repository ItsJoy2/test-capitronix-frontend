import Image from 'next/image';
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

export default  function Faq() {
  return (
    <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Phone illustration */}
            <div className="flex justify-center lg:justify-start">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-lg">
                <Image
                  src="/images/faq-phone.png"
                  alt="FAQ Support"
                  width={400}
                  height={400}
                  className="w-full max-w-sm h-auto"
                />
              </div>
            </div>

            {/* Right side - FAQ content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                  FAQ
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We've gathered the most common queries to help you understand
                  our platform better.
                </p>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="bg-white rounded-xl px-6 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        ?
                      </div>
                      <span className="text-lg">How does Capitronix work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-gray-600 text-base leading-relaxed">
                    Investors choose a plan, fund their account, and let
                    professional traders or automated strategies manage trades.
                    Profits are distributed according to the plan's reward
                    system.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white rounded-xl px-6 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        ?
                      </div>
                      <span className="text-lg">Is my investment safe?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-gray-600 text-base leading-relaxed">
                    Yes, we use bank-level security measures including SSL
                    encryption, secure payment gateways, and multi-factor
                    authentication to protect your investments and personal
                    information.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white rounded-xl px-6 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        ?
                      </div>
                      <span className="text-lg">
                        What types of investment plans are available?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-gray-600 text-base leading-relaxed">
                    We offer seven comprehensive plans ranging from Starter
                    ($100) to Supreme ($10,000) with varying profit rates,
                    durations, and daily ROI percentages to suit different
                    investment goals.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white rounded-xl px-6 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        ?
                      </div>
                      <span className="text-lg">
                        How are profits calculated?
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-gray-600 text-base leading-relaxed">
                    Profits are calculated based on your chosen plan's daily ROI
                    percentage and investment amount. Returns are distributed
                    daily according to the plan's schedule and reward structure.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="bg-white rounded-xl px-6 py-2 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                        ?
                      </div>
                      <span className="text-lg">How do I get started?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-14 pb-4 text-gray-600 text-base leading-relaxed">
                    Simply create an account, choose your investment plan, fund
                    your account, and start earning. Our 24/7 support team is
                    available to guide you through every step.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
  );
}