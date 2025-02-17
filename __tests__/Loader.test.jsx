import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "../package/src/Loader";

describe("Loader Component", () => {
  test("renders the Trophy Modular BIOS text", () => {
    render(<Loader />);
    
    // Check if heading is present
    expect(screen.getByText(/Trophy Modular BIOS v4.51PG/i)).toBeInTheDocument();
    expect(screen.getByText(/Copyright \(C\) 1997-2025, Trophy Software, Inc./i)).toBeInTheDocument();
  });

  test("renders the memory test correctly", () => {
    render(<Loader />);
    
    // Check Memory Test Text
    expect(screen.getByText(/Memory Test/i)).toBeInTheDocument();
    expect(screen.getByText(/32768K OK/i)).toBeInTheDocument();
  });

  test("renders the energy logo", () => {
    render(<Loader />);
    
    // Check if the logo is in the document
    const logo = screen.getByAltText("energy-star-logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders the IDE detection rows correctly", () => {
    render(<Loader />);
    
    // Check if IDE detection messages exist
    expect(screen.getByText(/Detecting IDE Primary Thing/i)).toBeInTheDocument();
    expect(screen.getByText(/Detecting IDE Secondary Thing/i)).toBeInTheDocument();
    expect(screen.getByText(/Detecting Another Thing/i)).toBeInTheDocument();
  });

  test("renders the date dynamically", () => {
    render(<Loader />);
    
    // Ensure today's date is displayed
    const today = new Date().toLocaleDateString();
    expect(screen.getByText(new RegExp(today, "i"))).toBeInTheDocument();
  });
});
