import { afterEach, describe, expect, it } from "vitest"
import NotificationCenterController from "../../../app/javascript/controllers/alestra/notification_center_controller.js"
import { connectController } from "../support/stimulus.js"

const markup = `
  <div data-controller="alestra--notification-center">
    <button class="alestra-notification-cta" aria-label="Notificaciones">Bell</button>
    <section id="notification-center" data-alestra--notification-center-target="panel" aria-hidden="true" tabindex="-1" hidden>
      <button data-alestra--notification-center-target="markAll" data-action="alestra--notification-center#markAllRead">Mark all</button>
      <article class="alestra-notification-center__item alestra-notification-center__item--unread" data-alestra--notification-center-target="item" data-read="false"></article>
      <article class="alestra-notification-center__item" data-alestra--notification-center-target="item" data-read="true"></article>
    </section>
  </div>
`

describe("alestra--notification-center", () => {
  let stop

  afterEach(() => stop?.())

  it("automatically binds notification CTAs and manages open focus and close focus", async () => {
    const setup = await connectController("alestra--notification-center", NotificationCenterController, markup)
    stop = setup.stop
    const trigger = setup.element.querySelector(".alestra-notification-cta")
    const panel = setup.element.querySelector("#notification-center")

    expect(trigger).toHaveAttribute("aria-controls", "notification-center")
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog")
    expect(trigger.querySelector(".alestra-notification-cta__dot")).not.toBeNull()

    trigger.click()
    expect(panel).not.toHaveAttribute("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "false")
    expect(trigger).toHaveAttribute("aria-expanded", "true")
    expect(panel).toHaveFocus()

    trigger.click()
    expect(panel).toHaveAttribute("hidden")
    expect(trigger).toHaveAttribute("aria-expanded", "false")
    expect(trigger).toHaveFocus()
  })

  it("closes for outside interactions and Escape", async () => {
    const setup = await connectController("alestra--notification-center", NotificationCenterController, markup)
    stop = setup.stop
    const trigger = setup.element.querySelector(".alestra-notification-cta")
    const panel = setup.element.querySelector("#notification-center")

    trigger.click()
    document.body.dispatchEvent(new Event("pointerdown", { bubbles: true }))
    expect(panel).toHaveAttribute("hidden")

    trigger.click()
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }))
    expect(panel).toHaveAttribute("hidden")
    expect(trigger).toHaveFocus()
  })

  it("marks every notification read and clears unread indicators", async () => {
    const setup = await connectController("alestra--notification-center", NotificationCenterController, markup)
    stop = setup.stop
    const trigger = setup.element.querySelector(".alestra-notification-cta")
    const markAll = setup.element.querySelector("[data-alestra--notification-center-target='markAll']")

    markAll.click()

    setup.element.querySelectorAll("[data-alestra--notification-center-target='item']").forEach((item) => {
      expect(item).toHaveAttribute("data-read", "true")
      expect(item).not.toHaveClass("alestra-notification-center__item--unread")
    })
    expect(markAll).toBeDisabled()
    expect(trigger).toHaveAttribute("aria-label", "Notificaciones")
    expect(trigger.querySelector(".alestra-notification-cta__dot")).toHaveAttribute("hidden")
  })
})
