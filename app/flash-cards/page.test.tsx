import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Page from "./page";

describe("Flash Cards Page", () => {
  //Flash Cards Page Page should be rendering wiout crashing
  test("should render without crashing", () => {
    render(<Page />);
    const title = screen.getByText(
      /Upload your document to get insightful flashcards tailored just for you!/
    );
    expect(title).toBeInTheDocument();
  });
  //add other test cases
});
