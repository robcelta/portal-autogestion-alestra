import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel", "item", "markAll"]

  connect() {
    this.isOpen = false
    this.activeTrigger = null
    this.boundClickOutside = this.clickOutside.bind(this)
    this.boundKeydown = this.keydown.bind(this)
    this.boundReposition = this.positionPanel.bind(this)
    this.triggerHandlers = new Map()
    this.bindTriggers()
    this.syncUnreadState()
  }

  disconnect() {
    this.close({ restoreFocus: false })
    this.triggerHandlers.forEach((handler, trigger) => trigger.removeEventListener("click", handler))
    this.triggerHandlers.clear()
  }

  bindTriggers() {
    if (!this.hasPanelTarget) return

    this.element.querySelectorAll(".alestra-notification-cta").forEach((trigger) => {
      trigger.setAttribute("aria-controls", this.panelTarget.id)
      trigger.setAttribute("aria-expanded", "false")
      trigger.setAttribute("aria-haspopup", "dialog")

      const handler = (event) => {
        event.preventDefault()
        this.toggle(trigger)
      }
      trigger.addEventListener("click", handler)
      this.triggerHandlers.set(trigger, handler)
    })
  }

  toggle(trigger) {
    if (this.isOpen && this.activeTrigger === trigger) {
      this.close()
    } else {
      this.open(trigger)
    }
  }

  open(trigger) {
    if (!this.hasPanelTarget) return

    this.activeTrigger?.setAttribute("aria-expanded", "false")
    this.activeTrigger = trigger
    this.activeTrigger?.setAttribute("aria-expanded", "true")
    this.panelTarget.hidden = false
    this.panelTarget.setAttribute("aria-hidden", "false")
    this.isOpen = true
    this.positionPanel()
    document.addEventListener("pointerdown", this.boundClickOutside)
    document.addEventListener("keydown", this.boundKeydown)
    window.addEventListener("resize", this.boundReposition)
    window.addEventListener("scroll", this.boundReposition, true)
    this.panelTarget.focus()
  }

  close({ restoreFocus = true } = {}) {
    if (this.hasPanelTarget) {
      this.panelTarget.hidden = true
      this.panelTarget.setAttribute("aria-hidden", "true")
    }
    document.removeEventListener("pointerdown", this.boundClickOutside)
    document.removeEventListener("keydown", this.boundKeydown)
    window.removeEventListener("resize", this.boundReposition)
    window.removeEventListener("scroll", this.boundReposition, true)

    const trigger = this.activeTrigger
    trigger?.setAttribute("aria-expanded", "false")
    this.activeTrigger = null
    this.isOpen = false
    if (restoreFocus && trigger?.isConnected) trigger.focus()
  }

  clickOutside(event) {
    if (!this.isOpen || this.panelTarget.contains(event.target) || this.activeTrigger?.contains(event.target)) return
    this.close()
  }

  keydown(event) {
    if (event.key === "Escape" && this.isOpen) {
      event.preventDefault()
      this.close()
    }
  }

  markAllRead() {
    this.itemTargets.forEach((item) => {
      item.dataset.read = "true"
      item.classList.remove("alestra-notification-center__item--unread")
    })
    this.syncUnreadState()
  }

  syncUnreadState() {
    const hasUnread = this.itemTargets.some((item) => item.dataset.read !== "true")

    this.triggerHandlers.forEach((_handler, trigger) => {
      let indicator = trigger.querySelector(".alestra-notification-cta__dot")
      if (hasUnread && !indicator) {
        indicator = document.createElement("span")
        indicator.className = "alestra-notification-cta__dot"
        trigger.prepend(indicator)
      }
      if (indicator) {
        indicator.setAttribute("aria-hidden", "true")
        indicator.hidden = !hasUnread
      }
      trigger.setAttribute("aria-label", hasUnread ? "Notificaciones sin leer" : "Notificaciones")
    })

    if (this.hasMarkAllTarget) {
      this.markAllTarget.disabled = !hasUnread
      this.markAllTarget.classList.toggle("alestra-notification-center__mark-all--complete", !hasUnread)
    }
  }

  positionPanel() {
    const isMobile = window.matchMedia?.("(max-width: 600px)").matches
    if (!this.isOpen || !this.activeTrigger || isMobile) return

    const triggerRect = this.activeTrigger.getBoundingClientRect()
    const panelWidth = this.panelTarget.offsetWidth || 456
    const left = Math.min(window.innerWidth - panelWidth - 16, Math.max(16, triggerRect.right - panelWidth))
    const availableBelow = window.innerHeight - triggerRect.bottom - 16
    const top = availableBelow >= 280 ? triggerRect.bottom + 8 : Math.max(16, triggerRect.top - this.panelTarget.offsetHeight - 8)
    this.panelTarget.style.left = `${left}px`
    this.panelTarget.style.top = `${top}px`
  }
}
