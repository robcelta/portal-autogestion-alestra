import { afterEach, describe, expect, it } from "vitest"
import ModalController from "../../../app/javascript/controllers/alestra/modal_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--modal", () => {
  let stop

  afterEach(() => stop?.())

  it("closes an initially open modal with Escape", async () => {
    const setup = await connectController("alestra--modal", ModalController, `
      <div data-controller="alestra--modal" data-alestra--modal-open-value="true">
        <section data-alestra--modal-target="dialog"><button class="alestra-modal__close">Close</button></section>
      </div>
    `)
    stop = setup.stop

    expect(setup.element.hidden).toBe(false)
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))
    expect(setup.element.hidden).toBe(true)
  })

  it("restores focus after closing an opened modal", async () => {
    const setup = await connectController("alestra--modal", ModalController, `
      <div data-controller="alestra--modal">
        <section data-alestra--modal-target="dialog"><button class="alestra-modal__close">Close</button></section>
      </div>
    `)
    stop = setup.stop
    const opener = document.createElement("button")
    opener.textContent = "Open"
    document.body.prepend(opener)
    opener.focus()

    setup.controller.open()
    expect(document.activeElement).toHaveClass("alestra-modal__close")
    setup.controller.close()
    expect(document.activeElement).toBe(opener)
  })

  it("closes only when the backdrop itself is clicked", async () => {
    const setup = await connectController("alestra--modal", ModalController, `
      <div data-controller="alestra--modal" data-alestra--modal-open-value="true">
        <section data-alestra--modal-target="dialog"><button>Content</button></section>
      </div>
    `)
    stop = setup.stop

    setup.controller.clickOutside({ target: setup.element.querySelector("button") })
    expect(setup.element.hidden).toBe(false)
    setup.controller.clickOutside({ target: setup.element })
    expect(setup.element.hidden).toBe(true)
  })
})
