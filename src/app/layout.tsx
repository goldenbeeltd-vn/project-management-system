import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hệ Thống Quản Lý Dự Án",
  description: "Quản lý dự án đang triển khai và đã triển khai",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
