import { afterEach, describe, expect, it } from "vitest"
import FilterController from "../../../app/javascript/controllers/alestra/filter_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--filter", () => {
  let stop
  afterEach(() => stop?.())

  it("opens advanced filters and tracks applied quick filters", async () => {
    const setup = await connectController("alestra--filter", FilterController, `
      <div data-controller="alestra--filter">
        <button data-alestra--filter-target="toggle"></button>
        <div data-alestra--filter-target="advanced" hidden>
          <input type="checkbox" value="active" data-alestra--filter-target="quick">
        </div>
        <div data-alestra--filter-target="applied" hidden>
          <span data-alestra--filter-target="tag" data-value="active"></span>
        </div>
      </div>
    `)
    stop = setup.stop
    const input = setup.element.querySelector("input")

    setup.controller.toggleAdvanced()
    expect(setup.element.querySelector("[data-alestra--filter-target='advanced']").hidden).toBe(false)
    expect(setup.element.querySelector("button")).toHaveAttribute("aria-expanded", "true")

    input.checked = true
    setup.controller.quickChanged()
    expect(setup.element.querySelector("[data-alestra--filter-target='applied']").hidden).toBe(false)

    setup.controller.clear()
    expect(input.checked).toBe(false)
  })
})
