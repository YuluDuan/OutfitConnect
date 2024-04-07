import LandingPageHeader from "@/components/LandingPageHeader";
import React from "react";

export default function PostLayout({ children }) {
  return (
    <section>
      <LandingPageHeader />
      {children}
    </section>
  );
}
