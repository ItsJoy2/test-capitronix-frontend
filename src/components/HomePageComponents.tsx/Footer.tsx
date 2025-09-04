import { Images } from "@/lib/store/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdMailOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { CiFacebook } from "react-icons/ci";
import { PiTelegramLogo } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { PiYoutubeLogoLight } from "react-icons/pi";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:px-8 px-3 py-8">
          <div className="space-y-4 md:px-2">
            <Link href="/">
              <Image
                className="w-[150px]"
                src={Images.logo1}
                alt="img"
                width={300}
                height={300}
              />
            </Link>
            <p className="text-background/80 mt-5 justify-center">
              We believe in financial freedom for everyone, offering secure
              packages and multiple income streams to help you achieve
              sustainable wealth.
            </p>
          </div>

          <div className="space-y-4 md:pl-24">
            <h3 className="text-lg font-semibold">Quick Link</h3>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link
                  href="about-us"
                  className="hover:text-background transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="privacy-policy"
                  className="hover:text-background transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="cookies-policy"
                  className="hover:text-background transition-colors"
                >
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link
                  href="terms-and-conditions"
                  className="hover:text-background transition-colors"
                >
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-background/80">
              <p className="flex items-center gap-2">
                <MdMailOutline className="text-blue-500 size-5" />{" "}
                support@capitronix.com
              </p>
              <p className="flex items-center gap-2">
                <IoLocationOutline className="text-blue-500 size-5" /> 4711
                Yonge Street. Toronto, M2N 6K8, Canada
              </p>
            </div>
          </div>
        </div>

        <div className="md:px-8 px-3 border-t border-gray-700 py-8 text-start text-background/60 flex items-center justify-between w-full bg-[#001E42]">
          <p>
            &copy; {new Date().getFullYear()} Capitronix. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 text-xl md:pr-10 pr-0">
            <a
              href="https://www.facebook.com/share/1B7HBM69xZ/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white transition-colors"
            >
              <CiFacebook />
            </a>
            <a
              href="https://t.me/capitronixofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white transition-colors"
            >
              <PiTelegramLogo />
            </a>
            <a
              href="https://x.com/Capitronix2025"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white transition-colors"
            >
              <RiTwitterXFill />
            </a>
            <a
              href="https://youtube.com/@capitronixofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-white transition-colors"
            >
              <PiYoutubeLogoLight />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
