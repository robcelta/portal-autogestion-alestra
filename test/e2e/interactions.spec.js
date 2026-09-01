import { expect, test } from "@playwright/test"
import { blockRemotePrototypeAssets, collectPageErrors } from "./support.js"

test.beforeEach(async ({ page }) => {
  await blockRemotePrototypeAssets(page)
})

test("toggles password visibility without a browser error", async ({ page }) => {
  const assertNoPageErrors = collectPageErrors(page)
  await page.goto("/login")

  const password = page.locator("#login_password")
  await expect(password).toHaveAttribute("type", "password")
  await page.locator(".alestra-login-password-toggle").click()
  await expect(password).toHaveAttribute("type", "text")
  assertNoPageErrors()
})

test("switches the consumption tab without a missing Stimulus action", async ({ page }) => {
  const assertNoPageErrors = collectPageErrors(page)
  await page.goto("/consumo")

  const tabs = page.getByRole("tab")
  const monthlyPanel = page.locator("#consumption-panel-monthly")
  const quarterlyPanel = page.locator("#consumption-panel-quarterly")
  const annualPanel = page.locator("#consumption-panel-annual")
  await tabs.nth(1).click()
  await expect(tabs.nth(1)).toHaveClass(/alestra-tabs__tab--active/)
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true")
  await expect(quarterlyPanel).toBeVisible()
  await expect(quarterlyPanel).toContainText("Consumo Trimestral")

  await page.keyboard.press("End")
  await expect(tabs.nth(2)).toBeFocused()
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true")
  await expect(annualPanel).toContainText("Consumo por mes | Anual")

  await page.keyboard.press("ArrowRight")
  await expect(tabs.nth(0)).toBeFocused()
  await expect(monthlyPanel).toContainText("Consumo Mensual")
  assertNoPageErrors()
})

test("opens and closes a modal initialized by the modal controller", async ({ page }) => {
  await page.goto("/gestion/limite_consumo")

  const modal = page.locator("[data-controller='alestra--modal']").first()
  await expect(modal).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(modal).toBeHidden()
})

test("toggles a FAQ accordion", async ({ page }) => {
  await page.goto("/ayuda")

  const trigger = page.locator("[data-controller='alestra--accordion'] button").first()
  await trigger.click()
  await expect(trigger).toHaveAttribute("aria-expanded", "false")
})

test("opens the notification center and marks all notifications read", async ({ page }) => {
  const assertNoPageErrors = collectPageErrors(page)
  await page.goto("/dashboard")

  const trigger = page.locator(".alestra-notification-cta").first()
  const center = page.locator("#alestra-notification-center")
  await trigger.click()

  await expect(center).toBeVisible()
  await expect(center).toBeFocused()
  await expect(trigger).toHaveAttribute("aria-expanded", "true")

  await center.locator(".alestra-notification-center__mark-all").click()
  await expect(center.locator(".alestra-notification-center__item--unread")).toHaveCount(0)
  await expect(trigger.locator(".alestra-notification-cta__dot")).toBeHidden()

  await page.keyboard.press("Escape")
  await expect(center).toBeHidden()
  await expect(trigger).toBeFocused()
  assertNoPageErrors()
})

test("expands management filters and shows applied filter tags", async ({ page }) => {
  await page.goto("/gestion")

  await page.getByRole("button", { name: "+ Más filtros" }).click()
  const activeFilter = page.getByLabel("Solo líneas activas")
  await expect(activeFilter).toBeVisible()
  await activeFilter.check()
  await expect(page.getByText("Filtros aplicados:")).toBeVisible()
  await expect(page.locator(".alestra-filter-bar__tag[data-value='active']")).toBeVisible()
})

test("selects a plan card", async ({ page }) => {
  await page.goto("/gestion/plan")

  const option = page.locator(".alestra-plan-card").filter({ hasText: "Básico 1GB" })
  await option.getByRole("button", { name: "Seleccionar" }).click()
  await expect(option).toHaveClass(/alestra-plan-card--selected/)
  await expect(option).toHaveAttribute("aria-selected", "true")
})
