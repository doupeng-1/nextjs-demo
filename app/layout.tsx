import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import SupabaseErrorBoundary from "@/components/SupabaseErrorBoundary";

export const metadata: Metadata = {
  title: "视频播放器",
  description: "输入URL播放视频",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <SupabaseErrorBoundary>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SupabaseErrorBoundary>
      </body>
    </html>
  );
}
