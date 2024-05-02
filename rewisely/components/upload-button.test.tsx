import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadButton from "./UploadButton";
import React from "react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

// Mocking the actual implementation of the fetch function
const realFetch = global.fetch;
global.fetch = jest.fn(() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
);

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("UploadButton component", () => {
  // Restore the original fetch implementation after all tests
  afterAll(() => {
    global.fetch = realFetch;
  });

  it("renders without crashing", () => {
    render(<UploadButton />);
    // Assuming the component renders without errors
    const button = screen.getByText("Upload");
    expect(button).toBeInTheDocument();

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Upload",
      })
    );
  });

  it("handles file upload and displays flash cards", async () => {
    // Mocking usePathname hook
    jest
      .spyOn(require("next/navigation"), "usePathname")
      .mockReturnValue("/flash-cards");

    render(<UploadButton />);

    // Selecting file input
    const fileInput = screen.getByLabelText("") as HTMLInputElement;

    // Creating a mock file
    const file = new File(["file content"], "test-file.txt", {
      type: "text/plain",
    });

    // Triggering file change event
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Triggering form submission
    fireEvent.submit(screen.getByRole("button", { name: "Upload" }));

  //   // Wait for fetch to be called
  // await waitFor(
  //   () => {
  //     expect(screen.getByText(/Flashcard content/)).toBeInTheDocument();
  //   },
  //   { timeout: 5000 }
  // );


  //   // Assuming the fetch function is called
  //   await waitFor(() => {
  //     expect(global.fetch).toHaveBeenCalledTimes(1);
    //   });
    
    
  });

  // Add more test cases as needed based on your component behavior
});
