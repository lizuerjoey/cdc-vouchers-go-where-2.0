import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CDC Vouchers GoWhere Revamp",
  description: "A personal revamp of CDC Vouchers GoWhere with better filters and AI recommendations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
