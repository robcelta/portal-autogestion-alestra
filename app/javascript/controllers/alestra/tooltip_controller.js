import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  show() {
    const tooltip = this.element.querySelector(".alestra-tooltip__text")
    if (tooltip) tooltip.style.opacity = "1"
  }

  hide() {
    const tooltip = this.element.querySelector(".alestra-tooltip__text")
    if (tooltip) tooltip.style.opacity = "0"
  }
}
