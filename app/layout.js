import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "RiskyWipe",
  description: "Video Editor | Cinametographer",
  icons: {
    icon: "/profile.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}