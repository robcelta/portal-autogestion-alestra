import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["sidebar", "toggle", "backdrop"]

  connect() {
    this.element.dataset.alestraSidebarConnected = "true"
    this.boundKeydown = this.keydown.bind(this)
    this.mobileQuery = window.matchMedia?.("(max-width: 900px)") || { matches: false }
    this.boundViewportChange = this.viewportChanged.bind(this)
    this.mobileQuery.addEventListener?.("change", this.boundViewportChange)
    this.syncState()
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundKeydown)
    this.mobileQuery?.removeEventListener?.("change", this.boundViewportChange)
  }

  toggle() {
    if (!this.hasSidebarTarget) return
    const className = this.isMobile ? "alestra-sidebar--open" : "alestra-sidebar--collapsed"
    this.sidebarTarget.classList.toggle(className)
    this.syncState()
  }

  collapse() {
    if (!this.hasSidebarTarget) return
    if (this.isMobile) this.sidebarTarget.classList.remove("alestra-sidebar--open")
    else this.sidebarTarget.classList.add("alestra-sidebar--collapsed")
    this.syncState()
  }

  expand() {
    if (!this.hasSidebarTarget) return
    if (this.isMobile) this.sidebarTarget.classList.add("alestra-sidebar--open")
    else this.sidebarTarget.classList.remove("alestra-sidebar--collapsed")
    this.syncState()
  }

  keydown(event) {
    if (event.key === "Escape" && this.isMobile && this.sidebarTarget.classList.contains("alestra-sidebar--open")) {
      this.collapse()
      if (this.hasToggleTarget) this.toggleTarget.focus()
    }
  }

  viewportChanged() {
    this.sidebarTarget.classList.remove("alestra-sidebar--open", "alestra-sidebar--collapsed")
    this.syncState()
  }

  syncState() {
    if (!this.hasSidebarTarget) return
    const open = this.isMobile ? this.sidebarTarget.classList.contains("alestra-sidebar--open") : !this.sidebarTarget.classList.contains("alestra-sidebar--collapsed")
    if (this.hasToggleTarget) {
      this.toggleTarget.setAttribute("aria-expanded", String(open))
      this.toggleTarget.setAttribute("aria-label", open && this.isMobile ? "Cerrar menú" : "Abrir menú")
    }
    if (this.hasBackdropTarget) this.backdropTarget.hidden = !this.isMobile || !open
    document.removeEventListener("keydown", this.boundKeydown)
    if (this.isMobile && open) document.addEventListener("keydown", this.boundKeydown)
  }

  get isMobile() {
    return this.mobileQuery?.matches === true
  }
}
