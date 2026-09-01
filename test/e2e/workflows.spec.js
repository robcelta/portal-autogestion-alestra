import { test } from "@playwright/test"
import { blockRemotePrototypeAssets } from "./support.js"

test.beforeEach(async ({ page }) => {
  await blockRemotePrototypeAssets(page)
})

test("authenticates a demo user with arbitrary credentials", async ({ page }) => {
  await page.goto("/login")
  await page.locator("#login_username").fill("user@example.com")
  await page.locator("#login_password").fill("password")
  await page.getByRole("button", { name: "Ingresar" }).click()
  await page.waitForURL("**/dashboard")
})

test.fixme("submits and confirms an equipment-blocking request", async ({ page }) => {
  await page.goto("/gestion/bloqueo_equipo")
  await page.getByLabel("Marca*").fill("Alestra")
  await page.getByLabel("Modelo*").fill("Demo")
  await page.getByLabel("IMEI*").fill("123456789012345")
  await page.getByRole("button", { name: "Confirmar" }).click()
  await page.waitForURL("**/gestion/bloqueo_equipo/confirmar")
})
