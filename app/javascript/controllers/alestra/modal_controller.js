import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dialog"]
  static values = { open: { type: Boolean, default: false } }

  connect() {
    this.boundKeydown = this.keydown.bind(this)
    this.syncVisibility()
    if (this.openValue) {
      this.installKeyboardHandling()
      this.focusCloseButton()
    }
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundKeydown)
  }

  open() {
    this.previousActiveElement = document.activeElement
    this.openValue = true
    this.syncVisibility()
    this.installKeyboardHandling()
    this.focusCloseButton()
  }

  close() {
    this.openValue = false
    this.syncVisibility()
    document.removeEventListener("keydown", this.boundKeydown)
    if (this.previousActiveElement?.isConnected) this.previousActiveElement.focus()
  }

  clickOutside(event) {
    if (!this.hasDialogTarget) return
    if (event.target === this.element && event.target !== this.dialogTarget) {
      this.close()
    }
  }

  openValueChanged() {
    this.syncVisibility()
  }

  syncVisibility() {
    this.element.hidden = !this.openValue
    if (this.hasDialogTarget) {
      this.dialogTarget.hidden = !this.openValue
    }
  }

  installKeyboardHandling() {
    document.addEventListener("keydown", this.boundKeydown)
  }

  focusCloseButton() {
    const closeBtn = this.element.querySelector(".alestra-modal__close")
    if (closeBtn) closeBtn.focus()
  }

  keydown(event) {
    if (event.key === "Escape") {
      this.close()
      return
    }
    if (event.key === "Tab") {
      const focusable = this.element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }
}
