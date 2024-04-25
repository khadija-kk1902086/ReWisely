import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import EditDialog from "./EditDialog";

describe("EditDialog component", () => {
  //EditDialog component should be rendering wiout crashing
  test("should render without crashing", () => {
    render(
      <EditDialog
        open="true"
        initialContent="test"
        onConfirm="true"
        onClose="false"
      />
    );
    const dialog = screen.findAllByTestId(/Dialog/);
    expect(dialog).toBeDefined();
  });
});
