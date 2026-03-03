import { Geist, Geist_Mono } from "next/font/google";
import { DM_Sans } from 'next/font/google'
import "./globals.css";
import Footer from "@/app/components/layout/Footer";
import Navbar from "@/app/components/layout/Navbar";
import { Sofia_Sans } from 'next/font/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const dmSans = DM_Sans({
//   subsets: ['latin'],
//   weight: ['300', '500', '700'],
//   variable: '--font-dm-sans',
//   display: 'swap',
// })


const sofia = Sofia_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})


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
      <body className={sofia.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}