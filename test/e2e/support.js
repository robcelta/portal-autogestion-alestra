import { expect } from "@playwright/test"

export async function blockRemotePrototypeAssets(page) {
  await page.route("https://www.figma.com/api/mcp/asset/**", (route) => route.fulfill({
    status: 200,
    contentType: "image/svg+xml",
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>'
  }))
}

export function collectPageErrors(page) {
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text())
  })
  return () => expect(errors, errors.join("\n")).toEqual([])
}
