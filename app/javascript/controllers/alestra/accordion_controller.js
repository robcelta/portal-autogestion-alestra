import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["detail"]

  toggle(event) {
    event.preventDefault()
    const trigger = event.currentTarget

    const tableRow = trigger.closest(".alestra-table__row")
    if (tableRow) {
      const detail = tableRow.nextElementSibling
      if (detail && detail.classList.contains("alestra-table__row-detail")) {
        detail.classList.toggle("alestra-table__row-detail--open")
        trigger.classList.toggle("alestra-table__expand-toggle--open")
        trigger.setAttribute("aria-expanded", detail.classList.contains("alestra-table__row-detail--open"))
      }
      return
    }

    const faqItem = trigger.closest(".alestra-accordion__item")
    if (faqItem) {
      const isOpen = faqItem.classList.toggle("alestra-accordion__item--open")
      if (isOpen) {
        trigger.setAttribute("aria-expanded", "true")
      } else {
        trigger.setAttribute("aria-expanded", "false")
      }
    }
  }
}
