import { afterEach, describe, expect, it } from "vitest"
import DropdownController from "../../../app/javascript/controllers/alestra/dropdown_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--dropdown", () => {
  let stop

  afterEach(() => stop?.())

  it("opens, selects an item, and closes", async () => {
    const setup = await connectController("alestra--dropdown", DropdownController, `
      <div data-controller="alestra--dropdown">
        <button class="alestra-dropdown__trigger"><span class="alestra-dropdown__trigger-label">Current</span></button>
        <div class="alestra-dropdown__menu" data-alestra--dropdown-target="menu"></div>
      </div>
    `)
    stop = setup.stop
    const item = document.createElement("button")
    item.textContent = "Selected"

    setup.controller.open()
    expect(setup.element.querySelector("[data-alestra--dropdown-target='menu']")).toHaveClass("alestra-dropdown__menu--open")

    setup.controller.select({ currentTarget: item })
    expect(setup.element.querySelector(".alestra-dropdown__trigger-label")).toHaveTextContent("Selected")
    expect(setup.element.querySelector("[data-alestra--dropdown-target='menu']")).not.toHaveClass("alestra-dropdown__menu--open")
  })

  it("closes for Escape and outside clicks", async () => {
    const setup = await connectController("alestra--dropdown", DropdownController, `
      <div data-controller="alestra--dropdown"><div data-alestra--dropdown-target="menu"></div></div>
    `)
    stop = setup.stop

    setup.controller.open()
    setup.controller.keydown(new KeyboardEvent("keydown", { key: "Escape" }))
    expect(setup.element.querySelector("div")).not.toHaveClass("alestra-dropdown__menu--open")

    setup.controller.open()
    setup.controller.clickOutside({ target: document.body })
    expect(setup.element.querySelector("div")).not.toHaveClass("alestra-dropdown__menu--open")
  })

  it("handles markup without a menu target safely", async () => {
    const setup = await connectController("alestra--dropdown", DropdownController, '<div data-controller="alestra--dropdown"></div>')
    stop = setup.stop

    expect(() => setup.controller.toggle()).not.toThrow()
  })
})
