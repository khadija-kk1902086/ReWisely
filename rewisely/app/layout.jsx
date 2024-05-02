"use client";
import ".././styles/globals.css";
import Nav from "../components/Nav";
import Providers from "../components/Providers";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { useReportWebVitals } from "next/web-vitals";
import Script from "next/script";
import Footer from '../components/Footer'
//import NavBar from "../components/NavBar"
//import Providers from "../app/providers.tsx"
//import AppBar from '../components/AppBar'

// export
const metadata = {
  title: "ReWisely",
  description: "comperehensive revision tool using AI ",
};

const RootLayout = ({ children }) => {
  //performance metrics
  useReportWebVitals((metric) => {
    console.log(metric);
  });

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="\assets\images\favicon.png" sizes="164x164" />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-8TZ07PF28B"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-8TZ07PF28B');`}
        </Script>
      </head>
      <body className="bg-white">
        <Providers>
          {/*         <div className="main"> </div>
          <div className="gradient"> </div> */}
          <main className="app">
            <Nav />
            {children}
          </main>
          <Footer/>
        </Providers>
        <Toaster />

      </body>
    </html>
  );
};

export default RootLayout;
