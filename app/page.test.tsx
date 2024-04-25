import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import Home from "./page";

describe("Home", () => {
  //Home page rendering wiout crashing
  test("should render without crashing", () => {
    render(<Home />);
    // const title = screen.getByText(/ReWisely/);
    // expect(title).toBeInTheDocument();

  //   const MindMapCard = screen.getByText(/Generate a Mind Map from your notes/);
  //   expect(MindMapCard).toBeInTheDocument();

  //   const FlashCardsCard = screen.getByText(
  //     /Customize flash cards to your notes/
  //   );
  //   expect(FlashCardsCard).toBeInTheDocument();

  //   const SummaryCard = screen.getByText(
  //     /Simplify your notes through a summary/
  //   );
  //   expect(SummaryCard).toBeInTheDocument();

  //   const FeynmanCard = screen.getByText(/Explore the Feynman Technique/);
  //   expect(FeynmanCard).toBeInTheDocument();

  //   const QuestionsAnswersCard = screen.getByText(
  //     /Test yourself with your information/
  //   );
  //   expect(QuestionsAnswersCard).toBeInTheDocument();
  });

  //add other test cases
});
