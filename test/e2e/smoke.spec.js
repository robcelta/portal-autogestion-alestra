import { expect, test } from "@playwright/test"
import { blockRemotePrototypeAssets, collectPageErrors } from "./support.js"

const pages = [
  ["/", /Administra tu Alestra M[oó]vil/],
  ["/login", /Bienvenido a tu portal/],
  ["/dashboard", /Administra tu Alestra M[oó]vil/],
  ["/gestion", /Gesti[oó]n/],
  ["/consumo", /Consumo y reportes/],
  ["/ayuda", /Ayuda/],
  ["/configuracion", /Perfil y notificaciones/]
]

test.beforeEach(async ({ page }) => {
  await blockRemotePrototypeAssets(page)
})

for (const [path, content] of pages) {
  test(`renders ${path}`, async ({ page }) => {
    const assertNoPageErrors = collectPageErrors(page)

    await page.goto(path)
    await expect(page.locator("body")).toContainText(content)
    await expect(page.locator("link[href*='alestra_rails_ui/components']")).toHaveCount(1)
    assertNoPageErrors()
  })
}

test("uses the portal navigation at desktop and mobile widths", async ({ page }) => {
  await page.goto("/dashboard")

  await expect(page.locator("nav.alestra-sidebar__nav")).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator("main.alestra-portal-content")).toBeVisible()
  await expect(page.locator("#alestra-sidebar")).not.toHaveClass(/alestra-sidebar--open/)
  await page.locator(".alestra-sidebar-toggle").click()
  await expect(page.locator("#alestra-sidebar")).toHaveClass(/alestra-sidebar--open/)
  await expect(page.locator(".alestra-sidebar-toggle")).toHaveAttribute("aria-expanded", "true")
  await page.keyboard.press("Escape")
  await expect(page.locator("#alestra-sidebar")).not.toHaveClass(/alestra-sidebar--open/)
})

test("uses the portal width and grid appropriate to each viewport", async ({ page }) => {
  await page.goto("/dashboard")

  for (const [width, expectedColumns] of [[1600, 4], [1280, 2], [768, 2]]) {
    await page.setViewportSize({ width, height: 1000 })

    const [main, content, cards] = await Promise.all([
      page.locator(".alestra-portal-main").boundingBox(),
      page.locator(".alestra-portal-content").boundingBox(),
      page.locator(".alestra-dashboard-ql-card").evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().top)
      )
    ])

    expect(content.width).toBeCloseTo(main.width, 0)
    expect(new Set(cards).size).toBe(Math.ceil(cards.length / expectedColumns))
  }
})

test("keeps account configuration readable across desktop widths", async ({ page }) => {
  await page.goto("/configuracion")

  await page.setViewportSize({ width: 2560, height: 1200 })
  const widePage = await page.locator(".alestra-configuracion-page").boundingBox()
  expect(widePage.width).toBeLessThanOrEqual(1440)

  await page.setViewportSize({ width: 1200, height: 1000 })
  const [columns, scrollWidth] = await Promise.all([
    page.locator(".alestra-configuracion-card").evaluate((element) => getComputedStyle(element).gridTemplateColumns),
    page.evaluate(() => document.documentElement.scrollWidth)
  ])

  expect(columns.trim().split(/\s+/)).toHaveLength(1)
  expect(scrollWidth).toBeLessThanOrEqual(1200)
})

for (const path of ["/login", "/dashboard"]) {
  test(`loads local images for ${path}`, async ({ page }) => {
    await page.goto(path)

    const images = await page.locator("img").evaluateAll((elements) =>
      elements.map((image) => ({
        complete: image.complete,
        height: image.naturalHeight,
        src: image.getAttribute("src")
      }))
    )

    expect(images.length).toBeGreaterThan(0)
    expect(images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ complete: true })
      ])
    )
    expect(images.every((image) => image.complete && image.height > 0)).toBe(true)
    expect(images.every((image) => !image.src?.includes("figma.com/api/mcp/asset"))).toBe(true)
  })
}
