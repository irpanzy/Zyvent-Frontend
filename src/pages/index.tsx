import { Geist, Geist_Mono } from "next/font/google";
import { Button } from "@heroui/react";
import PageHead from "@/components/commons/PageHead";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20`}
    >
      <PageHead title="Zyvent | Home" description="Welcome to the home page" />
      <Button color="primary">
        <Link href="/auth/register">Click me</Link>
      </Button>
    </div>
  );
}
