import { afterEach, describe, expect, it, vi } from "vitest"
import TabsController from "../../../app/javascript/controllers/alestra/tabs_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--tabs", () => {
  let stop

  afterEach(() => stop?.())

  it("shows the first panel when connected", async () => {
    const setup = await connectController("alestra--tabs", TabsController, `
      <div data-controller="alestra--tabs">
        <button data-alestra--tabs-target="tab">One</button><button data-alestra--tabs-target="tab">Two</button>
        <section data-alestra--tabs-target="panel"></section><section data-alestra--tabs-target="panel"></section>
      </div>
    `)
    stop = setup.stop
    const tabs = setup.element.querySelectorAll("button")
    const [first, second] = setup.element.querySelectorAll("section")

    expect(first.hidden).toBe(false)
    expect(second.hidden).toBe(true)
    expect(tabs[0]).toHaveAttribute("tabindex", "0")
    expect(tabs[1]).toHaveAttribute("tabindex", "-1")
  })

  it("switches the selected tab and visible panel", async () => {
    const setup = await connectController("alestra--tabs", TabsController, `
      <div data-controller="alestra--tabs">
        <button data-alestra--tabs-target="tab">One</button><button data-alestra--tabs-target="tab">Two</button>
        <section data-alestra--tabs-target="panel"></section><section data-alestra--tabs-target="panel"></section>
      </div>
    `)
    stop = setup.stop
    const tabs = setup.element.querySelectorAll("button")
    const event = { preventDefault: vi.fn(), currentTarget: tabs[1] }

    setup.controller.switch(event)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(tabs[1]).toHaveClass("alestra-tabs__tab--active")
    expect(tabs[1]).toHaveAttribute("aria-selected", "true")
    expect(setup.element.querySelectorAll("section")[1].hidden).toBe(false)
  })

  it.each([
    ["ArrowRight", 1],
    ["ArrowDown", 1],
    ["ArrowLeft", 2],
    ["ArrowUp", 2],
    ["End", 2]
  ])("moves selection with %s", async (key, expectedIndex) => {
    const setup = await connectController("alestra--tabs", TabsController, `
      <div data-controller="alestra--tabs">
        <button data-alestra--tabs-target="tab">One</button>
        <button data-alestra--tabs-target="tab">Two</button>
        <button data-alestra--tabs-target="tab">Three</button>
        <section data-alestra--tabs-target="panel"></section>
        <section data-alestra--tabs-target="panel"></section>
        <section data-alestra--tabs-target="panel"></section>
      </div>
    `)
    stop = setup.stop
    const tabs = setup.element.querySelectorAll("button")
    const event = { key, preventDefault: vi.fn(), currentTarget: tabs[0] }
    tabs[expectedIndex].focus = vi.fn()

    setup.controller.navigate(event)

    expect(event.preventDefault).toHaveBeenCalled()
    expect(tabs[expectedIndex]).toHaveAttribute("aria-selected", "true")
    expect(tabs[expectedIndex]).toHaveAttribute("tabindex", "0")
    expect(tabs[expectedIndex].focus).toHaveBeenCalled()
    expect(setup.element.querySelectorAll("section")[expectedIndex].hidden).toBe(false)
  })

  it("moves to the first tab with Home and ignores unrelated keys", async () => {
    const setup = await connectController("alestra--tabs", TabsController, `
      <div data-controller="alestra--tabs">
        <button data-alestra--tabs-target="tab">One</button><button data-alestra--tabs-target="tab">Two</button>
        <section data-alestra--tabs-target="panel"></section><section data-alestra--tabs-target="panel"></section>
      </div>
    `)
    stop = setup.stop
    const tabs = setup.element.querySelectorAll("button")
    setup.controller.showPanel(1)

    setup.controller.navigate({ key: "Home", preventDefault: vi.fn(), currentTarget: tabs[1] })
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")

    const event = { key: "Enter", preventDefault: vi.fn(), currentTarget: tabs[0] }
    setup.controller.navigate(event)
    expect(event.preventDefault).not.toHaveBeenCalled()
    expect(tabs[0]).toHaveAttribute("aria-selected", "true")
  })

  it("handles keyboard events registered on the tab elements", async () => {
    const setup = await connectController("alestra--tabs", TabsController, `
      <div data-controller="alestra--tabs">
        <button data-alestra--tabs-target="tab">One</button><button data-alestra--tabs-target="tab">Two</button>
        <section data-alestra--tabs-target="panel"></section><section data-alestra--tabs-target="panel"></section>
      </div>
    `)
    stop = setup.stop
    const tabs = setup.element.querySelectorAll("button")

    tabs[0].focus()
    tabs[0].dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }))

    expect(tabs[1]).toHaveFocus()
    expect(tabs[1]).toHaveAttribute("aria-selected", "true")
    expect(setup.element.querySelectorAll("section")[1].hidden).toBe(false)
  })
})
