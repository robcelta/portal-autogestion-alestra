import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "toggle"]

  toggle() {
    if (!this.hasInputTarget) return
    const visible = this.inputTarget.type === "password"
    this.inputTarget.type = visible ? "text" : "password"
    if (this.hasToggleTarget) {
      this.toggleTarget.setAttribute("aria-label", visible ? "Ocultar contraseña" : "Mostrar contraseña")
      this.toggleTarget.setAttribute("aria-pressed", String(visible))
    }
  }
}
