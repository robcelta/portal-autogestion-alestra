import { afterEach, describe, expect, it } from "vitest"
import TooltipController from "../../../app/javascript/controllers/alestra/tooltip_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--tooltip", () => {
  let stop

  afterEach(() => stop?.())

  it("shows and hides tooltip text", async () => {
    const setup = await connectController("alestra--tooltip", TooltipController, '<div data-controller="alestra--tooltip"><span class="alestra-tooltip__text"></span></div>')
    stop = setup.stop
    const tooltip = setup.element.querySelector("span")

    setup.controller.show()
    expect(tooltip.style.opacity).toBe("1")
    setup.controller.hide()
    expect(tooltip.style.opacity).toBe("0")
  })

  it("does not throw when tooltip markup is incomplete", async () => {
    const setup = await connectController("alestra--tooltip", TooltipController, '<div data-controller="alestra--tooltip"></div>')
    stop = setup.stop

    expect(() => setup.controller.show()).not.toThrow()
    expect(() => setup.controller.hide()).not.toThrow()
  })
})
