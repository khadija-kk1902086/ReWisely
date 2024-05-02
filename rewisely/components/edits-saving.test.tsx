import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import EditsSaving from "./EditsSaving";

describe("EditsSaving component", () => {
  //EditsSaving component should be rendering wiout crashing
  test("should render without crashing", () => {
    render(
      <EditsSaving
        choices="test"
        type="summary"
        userId="10"
        materialId="11"
      />
    );
    const saveIcon = screen.findAllByTestId(/SaveIcon/);
    expect(saveIcon).toBeDefined();
  });
});
