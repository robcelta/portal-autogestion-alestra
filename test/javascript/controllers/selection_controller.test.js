import { afterEach, describe, expect, it } from "vitest"
import SelectionController from "../../../app/javascript/controllers/alestra/selection_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--selection", () => {
  let stop
  afterEach(() => stop?.())

  it("selects one card at a time", async () => {
    const setup = await connectController("alestra--selection", SelectionController, `
      <div data-controller="alestra--selection">
        <article data-alestra--selection-target="item"><button>One</button></article>
        <article data-alestra--selection-target="item"><button>Two</button></article>
        <a data-alestra--selection-target="confirm" aria-disabled="true"></a>
      </div>
    `)
    stop = setup.stop
    const items = setup.element.querySelectorAll("article")

    setup.controller.select({ currentTarget: items[1].querySelector("button") })
    expect(items[1]).toHaveClass("alestra-plan-card--selected")
    expect(items[1]).toHaveAttribute("aria-selected", "true")
    expect(items[0]).not.toHaveClass("alestra-plan-card--selected")
    expect(setup.element.querySelector("a")).not.toHaveAttribute("aria-disabled")
  })
})
