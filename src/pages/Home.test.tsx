import { render, screen } from "@testing-library/react";
import Home from "./Old";

test("renders learn react link", () => {
  render(<Home />);
  const buttonEelement = screen.getByText(/Connect Wallet/i);
  expect(buttonEelement).toBeInTheDocument();
});
