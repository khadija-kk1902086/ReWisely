import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import FileActions from "./FileActions";

describe("FileActions component", () => {
  //FileActions component should be rendering wiout crashing
  test("should render without crashing", () => {
    render(
      <FileActions
        choices="test"
        pathname="/text-summary"
        authorName="KK"
        userId="11"
        fileTitle="test"
      />
    );
    const aside = screen.findAllByTestId(/aside/);
    expect(aside).toBeDefined();
  });
});
