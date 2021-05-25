import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders characters link", () => {
  render(<App />);

  // navigation links
  expect(screen.getByText("Characters")).toBeInTheDocument();
  expect(screen.getByText("Episodes")).toBeInTheDocument();
  expect(screen.getByText("Locations")).toBeInTheDocument();
});
