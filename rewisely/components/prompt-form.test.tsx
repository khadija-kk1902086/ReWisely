import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import PromptForm from "./PromptForm";

describe("PromptForm component", () => {
  //PromptForm component should be rendering wiout crashing
  test("should render without crashing", () => {
    render(<PromptForm onSubmit={""}/>);
    const title = screen.getByText(/Submit/);
    expect(title).toBeInTheDocument();
  });
  //add other test cases
});
