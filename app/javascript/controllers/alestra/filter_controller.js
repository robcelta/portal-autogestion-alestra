import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["advanced", "toggle", "quick", "applied", "tag"]

  connect() {
    this.sync()
  }

  toggleAdvanced() {
    if (!this.hasAdvancedTarget) return
    this.advancedTarget.hidden = !this.advancedTarget.hidden
    this.sync()
  }

  quickChanged() {
    this.sync()
  }

  clear() {
    this.quickTargets.forEach((input) => { input.checked = false })
    this.sync()
  }

  remove(event) {
    const value = event.currentTarget.dataset.value
    const input = this.quickTargets.find((candidate) => candidate.value === value)
    if (input) input.checked = false
    this.sync()
  }

  sync() {
    if (this.hasToggleTarget && this.hasAdvancedTarget) {
      this.toggleTarget.textContent = this.advancedTarget.hidden ? "+ Más filtros" : "- Menos filtros"
      this.toggleTarget.setAttribute("aria-expanded", String(!this.advancedTarget.hidden))
    }

    if (!this.hasAppliedTarget) return
    const active = this.quickTargets.filter((input) => input.checked)
    this.appliedTarget.hidden = active.length === 0
    this.tagTargets.forEach((tag) => {
      tag.hidden = !active.some((input) => input.value === tag.dataset.value)
    })
  }
}
