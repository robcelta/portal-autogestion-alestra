import { Application } from "@hotwired/stimulus"

export async function connectController(identifier, Controller, html) {
  document.body.innerHTML = html

  const application = Application.start()
  application.register(identifier, Controller)
  await Promise.resolve()
  await Promise.resolve()

  const element = document.querySelector(`[data-controller~="${identifier}"]`)
  const controller = application.getControllerForElementAndIdentifier(element, identifier)

  return {
    controller,
    element,
    stop() {
      application.stop()
    }
  }
}
