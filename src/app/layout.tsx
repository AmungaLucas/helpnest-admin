import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HelpNest Admin",
  description: "Operations dashboard for HelpNest — users, pricing, payments, KYC, analytics."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
