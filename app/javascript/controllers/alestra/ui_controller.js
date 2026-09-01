import { Controller } from "@hotwired/stimulus"

/**
 * Controlador namespaced: alestra--ui
 * Compatible con Turbo y Stimulus del host; no pisa otros controladores.
 */
export default class extends Controller {
  static targets = ["dismissible"]

  connect() {
    this.element.dataset.alestraUiConnected = "true"
  }

  dismiss(event) {
    event?.preventDefault()
    const node = this.hasDismissibleTarget ? this.dismissibleTarget : this.element
    node.remove()
  }
}
