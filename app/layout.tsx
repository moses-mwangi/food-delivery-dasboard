"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SideBar from "./SideBar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["700", "500", "400"],
  variable: "--font-roboto",
});

const client = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true}>
        <body
          style={{ fontFamily: "var(--font-roboto)" }}
          className={`${cn(roboto.variable)}`}
        >
          <QueryClientProvider client={client}>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              // enableSystem
              disableTransitionOnChange
            >
              <div className="h-svh overflow-hidden grid md:grid-cols-[210px_auto] lg:grid-cols-[230px_auto]">
                <SideBar />
                <div>
                  <Navbar />
                  <main>{children}</main>
                </div>
              </div>
              <Toaster />
            </ThemeProvider>
          </QueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
