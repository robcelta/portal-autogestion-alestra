import { afterEach, describe, expect, it, vi } from "vitest"
import AccordionController from "../../../app/javascript/controllers/alestra/accordion_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--accordion", () => {
  let stop

  afterEach(() => stop?.())

  it("opens and closes a FAQ item with accessible state", async () => {
    const setup = await connectController("alestra--accordion", AccordionController, `
      <section data-controller="alestra--accordion">
        <article class="alestra-accordion__item">
          <button aria-expanded="false">Question</button>
        </article>
      </section>
    `)
    stop = setup.stop
    const trigger = setup.element.querySelector("button")
    const event = { preventDefault: vi.fn(), currentTarget: trigger }

    setup.controller.toggle(event)
    expect(event.preventDefault).toHaveBeenCalled()
    expect(trigger.closest("article")).toHaveClass("alestra-accordion__item--open")
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    setup.controller.toggle(event)
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("expands a table detail row and updates aria-expanded", async () => {
    const setup = await connectController("alestra--accordion", AccordionController, `
      <div data-controller="alestra--accordion">
        <div class="alestra-table__row"><button aria-expanded="false">Expand</button></div>
        <div class="alestra-table__row-detail"></div>
      </div>
    `)
    stop = setup.stop
    const trigger = setup.element.querySelector("button")

    setup.controller.toggle({ preventDefault: vi.fn(), currentTarget: trigger })
    expect(setup.element.querySelector(".alestra-table__row-detail")).toHaveClass("alestra-table__row-detail--open")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
  })
})
