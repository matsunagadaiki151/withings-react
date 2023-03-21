import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "../src/components/Main";

test("Mainのタイトルが正しいか", () => {
  render(<Main />);
  const linkElement = screen.getByText("私の体重の遷移");
  expect(linkElement).toBeInTheDocument();
});
