import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "푸드득 - 쉽게 시작하고, 넓게 파는 새로운 창업 방식",
  description: "푸드득은 소자본 배달 프랜차이즈 창업으로 여러 메뉴를 한 점포에서 동시 운영할 수 있습니다. 밀키트 제품으로 쉽고 빠르게 메뉴를 늘려보세요.",
  keywords: "푸드득, 배달창업, 프랜차이즈, 소자본창업, 밀키트, 배달점포, 외식업",
  openGraph: {
    title: "푸드득 - 쉽게 시작하고, 넓게 파는 새로운 창업 방식",
    description: "푸드득은 소자본 배달 프랜차이즈 창업으로 여러 메뉴를 한 점포에서 동시 운영할 수 있습니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
