import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <main
        className={cn(
          poppins.className,
          "lg:py flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10",
        )}
      >
        <Component {...pageProps} />
      </main>
    </HeroUIProvider>
  );
}
