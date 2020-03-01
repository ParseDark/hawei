import React from "react"
import renderer from "react-test-renderer"
import Button from "../src/components/Button/index"
describe("Header", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<Button siteTitle="Default Starter" />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})