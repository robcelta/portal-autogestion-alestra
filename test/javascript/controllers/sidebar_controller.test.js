import { afterEach, describe, expect, it } from "vitest"
import SidebarController from "../../../app/javascript/controllers/alestra/sidebar_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--sidebar", () => {
  let stop

  afterEach(() => stop?.())

  it("toggles, collapses, and expands its sidebar target", async () => {
    const setup = await connectController("alestra--sidebar", SidebarController, `
      <div data-controller="alestra--sidebar">
        <button data-alestra--sidebar-target="toggle"></button>
        <div data-alestra--sidebar-target="backdrop" hidden></div>
        <aside data-alestra--sidebar-target="sidebar"></aside>
      </div>
    `)
    stop = setup.stop
    const sidebar = setup.element.querySelector("aside")

    expect(setup.element.dataset.alestraSidebarConnected).toBe("true")
    setup.controller.toggle()
    expect(sidebar).toHaveClass("alestra-sidebar--collapsed")
    expect(setup.element.querySelector("button")).toHaveAttribute("aria-expanded", "false")
    setup.controller.expand()
    expect(sidebar).not.toHaveClass("alestra-sidebar--collapsed")
    setup.controller.collapse()
    expect(sidebar).toHaveClass("alestra-sidebar--collapsed")
  })

  it("opens the mobile drawer and closes it with Escape", async () => {
    window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} })
    const setup = await connectController("alestra--sidebar", SidebarController, `
      <div data-controller="alestra--sidebar">
        <button data-alestra--sidebar-target="toggle"></button>
        <div data-alestra--sidebar-target="backdrop" hidden></div>
        <aside data-alestra--sidebar-target="sidebar"></aside>
      </div>
    `)
    stop = setup.stop

    setup.controller.toggle()
    expect(setup.element.querySelector("aside")).toHaveClass("alestra-sidebar--open")
    expect(setup.element.querySelector("button")).toHaveAttribute("aria-expanded", "true")
    expect(setup.element.querySelector("[data-alestra--sidebar-target='backdrop']").hidden).toBe(false)

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    expect(setup.element.querySelector("aside")).not.toHaveClass("alestra-sidebar--open")
  })

  it("allows layouts that do not provide a sidebar target", async () => {
    const setup = await connectController("alestra--sidebar", SidebarController, '<div data-controller="alestra--sidebar"></div>')
    stop = setup.stop

    expect(() => setup.controller.toggle()).not.toThrow()
  })
})
