
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import HouseDashboard from "./HouseDashboard";

it("renders house details", () => {
  render(<HouseDashboard />);
  expect(screen.getByText(/house_id/i)).toBeInTheDocument(); 
});