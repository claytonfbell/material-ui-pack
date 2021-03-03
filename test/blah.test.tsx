import * as React from "react"
import * as ReactDOM from "react-dom"
import { Debug } from "../src/Debug"

describe("it", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<Debug object={{ foo: "bar" }} />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
