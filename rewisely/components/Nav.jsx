"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { getProviders } from "next-auth/react";
import React from "react";
import SignInBTN from "./SignInBTN";

function Nav() {
  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProviders();
  }, []);

  return (
    
    <nav className="navBar">
      <div className="imageWithTabs">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/moderateGreenLogo.png"
          alt="ReWisely Logo"
          width={120}
          height={120}
          className="object-contain rounded-full mr-3 ml-3 w-12 h-12"
        ></Image>
      </Link>
      <div className="flex gap-6">
        <Link
          href="/"
          className="nav-text"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="nav-text"
        >
          Dashboard
        </Link>
      {/*   <Link
          href="/contacts"
          className="nav-text"
        >
          Contacts
        </Link> */}
      </div>
      {/* <SigninButton></SigninButton> */}
      </div>
       
      <SignInBTN ></SignInBTN>
      
      
    </nav>
  );
}

export default Nav;
