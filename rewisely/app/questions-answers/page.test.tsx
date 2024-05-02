import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Page from "./page";

describe("Q&A Page", () => {
  //Q&A Page Page should be rendering wiout crashing
  test("should render without crashing", () => {
    render(<Page />);
    const title = screen.getByText(
      /Upload your document to get an insightful Q&A!/
    );
    expect(title).toBeInTheDocument();
  });
  //add other test cases
});
