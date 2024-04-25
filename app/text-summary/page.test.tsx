import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Page from "./page";

describe("Summary Page", () => {
  //Summary Page should be rendering wiout crashing
  test("should render without crashing", () => {
    render(<Page />);
    const title = screen.getByText(
      /Upload your document to get the perfect Summary tailored just for you!/
    );
    expect(title).toBeInTheDocument();
  });

  //add other test cases
});
