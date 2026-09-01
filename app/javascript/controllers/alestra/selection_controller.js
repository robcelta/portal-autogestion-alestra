import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "confirm"]

  select(event) {
    const selected = event.currentTarget.closest("[data-alestra--selection-target='item']") || event.currentTarget
    this.itemTargets.forEach((item) => {
      const active = item === selected
      item.classList.toggle("alestra-plan-card--selected", active)
      item.classList.toggle("alestra-product-card--selected", active)
      item.setAttribute("aria-selected", String(active))
    })
    if (this.hasConfirmTarget) this.confirmTarget.removeAttribute("aria-disabled")
  }
}
