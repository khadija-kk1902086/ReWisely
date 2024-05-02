"use client";
import React from "react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="form-container-inputs flex flex-row items-center flex-wrap">
        <div className="pfd-steps">
          <p className="step-text">
            For pdf files, you need to follow these steps:
          </p>

          <div className="individual-step">
            <p className="step-text">click convert pdf button</p>
            <CursorArrowRaysIcon className="pdfIcon" />
          </div>
          <div className="individual-step">
            <p className="step-text">download the file converted</p>
            <ArrowDownTrayIcon className="pdfIcon"></ArrowDownTrayIcon>
          </div>
          <div className="individual-step">
            <p className="step-text">
              Upload your .txt file using Upload button
            </p>
            <ArrowUpTrayIcon className="pdfIcon"></ArrowUpTrayIcon>
          </div>
        </div>
        <button className="pdf_btn">
          <Link href="https://www.pdf2go.com/pdf-to-text">Convert PDF</Link>
        </button>
      </div>
    </main>
  );
};

export default page;
