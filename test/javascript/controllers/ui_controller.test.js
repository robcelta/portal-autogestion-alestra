import { afterEach, describe, expect, it, vi } from "vitest"
import UiController from "../../../app/javascript/controllers/alestra/ui_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--ui", () => {
  let stop

  afterEach(() => stop?.())

  it("marks itself connected and dismisses its configured target", async () => {
    const setup = await connectController("alestra--ui", UiController, `
      <div data-controller="alestra--ui"><div data-alestra--ui-target="dismissible">Alert</div></div>
    `)
    stop = setup.stop
    const event = { preventDefault: vi.fn() }

    setup.controller.dismiss(event)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(setup.element.dataset.alestraUiConnected).toBe("true")
    expect(setup.element).toBeInTheDocument()
    expect(setup.element.querySelector("div")).toBeNull()
  })

  it("dismisses its root element when no target is configured", async () => {
    const setup = await connectController("alestra--ui", UiController, '<div data-controller="alestra--ui">Alert</div>')
    stop = setup.stop

    setup.controller.dismiss()
    expect(document.body.contains(setup.element)).toBe(false)
  })
})
