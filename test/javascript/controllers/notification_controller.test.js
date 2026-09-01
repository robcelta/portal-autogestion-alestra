import { afterEach, describe, expect, it, vi } from "vitest"
import NotificationController from "../../../app/javascript/controllers/alestra/notification_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--notification", () => {
  let stop

  afterEach(() => {
    stop?.()
    vi.useRealTimers()
  })

  it("dismisses a notification after its configured timeout", async () => {
    vi.useFakeTimers()
    const setup = await connectController("alestra--notification", NotificationController, '<div data-controller="alestra--notification" data-alestra--notification-timeout-value="100"></div>')
    stop = setup.stop

    vi.advanceTimersByTime(100)
    expect(document.body.contains(setup.element)).toBe(false)
  })

  it("keeps notifications with a zero timeout until dismissed", async () => {
    const setup = await connectController("alestra--notification", NotificationController, '<div data-controller="alestra--notification" data-alestra--notification-timeout-value="0"></div>')
    stop = setup.stop

    setup.controller.dismiss()
    expect(document.body.contains(setup.element)).toBe(false)
  })
})
