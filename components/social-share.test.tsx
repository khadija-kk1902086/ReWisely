import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import SocialShare from "./SocialShare";

describe("SocialShare component", () => {
  //SocialShare component should be rendering wiout crashing
  test("should render without crashing", () => {
    render(<SocialShare type="/text-summary" user="KK" id="11" />);
    const facebookShareButton = screen.findAllByTestId(/FacebookShareButton/);
    expect(facebookShareButton).toBeDefined();
  });
});
