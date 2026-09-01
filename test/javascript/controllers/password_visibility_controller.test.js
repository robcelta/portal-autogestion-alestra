import { afterEach, describe, expect, it } from "vitest"
import PasswordVisibilityController from "../../../app/javascript/controllers/alestra/password_visibility_controller.js"
import { connectController } from "../support/stimulus.js"

describe("alestra--password-visibility", () => {
  let stop
  afterEach(() => stop?.())

  it("toggles password visibility and accessible state", async () => {
    const setup = await connectController("alestra--password-visibility", PasswordVisibilityController, `
      <div data-controller="alestra--password-visibility">
        <input type="password" data-alestra--password-visibility-target="input">
        <button data-alestra--password-visibility-target="toggle"></button>
      </div>
    `)
    stop = setup.stop
    const input = setup.element.querySelector("input")
    const toggle = setup.element.querySelector("button")

    setup.controller.toggle()
    expect(input.type).toBe("text")
    expect(toggle).toHaveAttribute("aria-pressed", "true")
    expect(toggle).toHaveAttribute("aria-label", "Ocultar contraseña")

    setup.controller.toggle()
    expect(input.type).toBe("password")
    expect(toggle).toHaveAttribute("aria-pressed", "false")
  })
})
