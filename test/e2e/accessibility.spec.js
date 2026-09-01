import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { blockRemotePrototypeAssets } from "./support.js"

test.beforeEach(async ({ page }) => {
  await blockRemotePrototypeAssets(page)
})

for (const path of ["/login", "/dashboard", "/ayuda", "/consumo"]) {
  test.fixme(`has no automated accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()

    expect(results.violations).toEqual([])
  })
}
