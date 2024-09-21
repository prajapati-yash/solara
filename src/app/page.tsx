"use client"

import Image from "next/image";
import HomePage from "@/components/HomePage/HomePage"
import { SessionProvider } from "next-auth/react";
export default function Home() {
  return (
    <>
    <SessionProvider>
      <HomePage/>
    </SessionProvider>
    </>
  );
}