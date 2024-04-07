"use client";


import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import { days_one } from "@/app/font";


const LandingPageHeader = () => {
  return (
    <nav
      className={`flex justify-between py-5 pb-2 px-12 items-center border-b border-gray-100 fixed top-0 left-0 right-0 bg-white z-50`}
    >
      <div
        className={`flex gap-2 items-center text-2xl leading-normal orange_gradient cursor-default ${days_one.className} gap-5`}
      >
        <Image src={"/assets/dog.png"} height={120} width={120} alt="Logo" />
        DOG'TERXY
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-x-14 leading-5 py-3 text-base font-medium">
        <Link href="/">Explore</Link>
        <Link href="/">Community</Link>
        {/* <Link href="#testimonials">Testimonials</Link> */}
        <Link href="/">About</Link>
      </div>


      <div className="hidden lg:flex gap-x-8 items-center font-medium">
        <Link href="/login">Login</Link>
        <Button className="purple_gradient">
          <Link href="/login">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default LandingPageHeader;
