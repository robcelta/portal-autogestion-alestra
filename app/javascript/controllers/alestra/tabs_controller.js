import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]

  connect() {
    this.boundNavigate = this.navigate.bind(this)
    this.tabTargets.forEach((tab) => tab.addEventListener("keydown", this.boundNavigate))

    const selectedIndex = this.tabTargets.findIndex((tab) => tab.getAttribute("aria-selected") === "true")
    this.showPanel(selectedIndex === -1 ? 0 : selectedIndex)
  }

  disconnect() {
    this.tabTargets.forEach((tab) => tab.removeEventListener("keydown", this.boundNavigate))
  }

  switch(event) {
    event.preventDefault()
    const index = this.tabTargets.indexOf(event.currentTarget)
    if (index !== -1) this.showPanel(index)
  }

  navigate(event) {
    const currentIndex = this.tabTargets.indexOf(event.currentTarget)
    if (currentIndex === -1) return

    let nextIndex
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % this.tabTargets.length
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + this.tabTargets.length) % this.tabTargets.length
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = this.tabTargets.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    this.showPanel(nextIndex)
    this.tabTargets[nextIndex].focus()
  }

  showPanel(index) {
    this.tabTargets.forEach((tab, i) => {
      const active = i === index
      tab.classList.toggle("alestra-tabs__tab--active", active)
      tab.setAttribute("aria-selected", String(active))
      tab.setAttribute("tabindex", active ? "0" : "-1")
    })
    this.panelTargets.forEach((panel, i) => {
      panel.hidden = i !== index
    })
  }
}
