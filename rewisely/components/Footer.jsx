import { Contact } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="footer">
      <div className="footerCol">
        <h1 className="footerHead">Features</h1>
        <Link href="/mind-map" className="footer-text">
          {" "}
          Mindmap
        </Link>
        <Link href="/flash-cards" className="footer-text">
          {" "}
          Flash Cards
        </Link>
        <Link href="/text-summary" className="footer-text">
          {" "}
          Summary
        </Link>
        <Link href="/learning-technique" className="footer-text">
          {" "}
          Learning Techniques
        </Link>
        <Link href="/questions-answers" className="footer-text">
          {" "}
          Q & A
        </Link>
        <Link href="/pdf-support" className="footer-text">
          {" "}
          PDF Support
        </Link>
      </div>
      <div className="footerCol">
        <h1 className="footerHead">Contact Us</h1>
        <Link href="/contacts" className="footer-text">
          {" "}
          Contacts
        </Link>
        <Link href="/" className="footer-text">
          {" "}
          Instagram
        </Link>
        <Link href="/" className="footer-text">
          {" "}
          Twitter
        </Link>
        <Link href="/" className="footer-text">
          {" "}
          Youtube
        </Link>
      </div>

      {/* <div className="footerCol">
        <div className="logoandSlogan">
          <img
            src="/assets/images/whiteLogo.png"
            alt=""
            className="footerLogo"
          />
          <h3 className="text-white font-bold">Revise Wisely..Use ReWisely</h3>
        </div>
      </div> */}
    </div>
  );
}

export default Footer;
