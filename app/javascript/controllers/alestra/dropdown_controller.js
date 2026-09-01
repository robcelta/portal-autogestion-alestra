import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["menu"]

  connect() {
    this.boundClickOutside = this.clickOutside.bind(this)
    this.boundKeydown = this.keydown.bind(this)
  }

  disconnect() {
    this.close()
  }

  toggle() {
    if (!this.hasMenuTarget) return
    if (this.menuTarget.classList.contains("alestra-dropdown__menu--open")) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    if (!this.hasMenuTarget) return
    this.menuTarget.classList.add("alestra-dropdown__menu--open")
    document.addEventListener("click", this.boundClickOutside)
    document.addEventListener("keydown", this.boundKeydown)
  }

  close() {
    if (!this.hasMenuTarget) return
    this.menuTarget.classList.remove("alestra-dropdown__menu--open")
    document.removeEventListener("click", this.boundClickOutside)
    document.removeEventListener("keydown", this.boundKeydown)
  }

  select(event) {
    const item = event.currentTarget
    const trigger = this.element.querySelector(".alestra-dropdown__trigger")
    if (trigger) {
      const label = trigger.querySelector(".alestra-dropdown__trigger-label")
      if (label) {
        label.textContent = item.textContent.trim()
      }
    }
    this.close()
  }

  clickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.close()
    }
  }

  keydown(event) {
    if (event.key === "Escape") {
      this.close()
    }
  }
}
