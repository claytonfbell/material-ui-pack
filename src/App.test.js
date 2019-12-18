import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "./App"

test("renders app", () => {
  const { getByText } = render(<App />)
  const el = getByText(/Examples/i)
  expect(el).toBeInTheDocument()
})