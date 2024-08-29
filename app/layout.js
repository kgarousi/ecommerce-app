"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Header from "./Header";
import Modal from "./Modal";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "E-commerce store",
  description: "Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`min-h-screen flex flex-col relative ${inter.className}`}>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <footer className="flex items-center flex-wrap justify-center border-t border-solid border-slate-300 p-4 md:p-8">
          <Link href="https://www.instagram.com/kendallgarousi/" target="_blank">
            <i className="fa-brands fa-instagram hover:text-slate-500 cursor-pointer p-4 text-3xl md:text-4xl"></i>
          </Link>
        </footer>
        <div id="portal"></div>
      </body>
    </html>
  );
}


