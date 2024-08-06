import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ai Expense Tracker App",
  description: "Built with Nextjs, Clerk and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html className={roboto.className} data-theme="light" lang="en">
        <body>
          <main className="app">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
