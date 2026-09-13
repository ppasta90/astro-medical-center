import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/specializzazioni",
  "/romani-endocrinologa",
  "/lavora-con-noi",
];

for (const route of routes) {
  test(`${route} risponde e non ha violazioni axe gravi`, async ({ page }) => {
    await page.route(/^https?:\/\//, async (request) => {
      const hostname = new URL(request.request().url()).hostname;
      if (hostname === "127.0.0.1") await request.continue();
      else await request.abort();
    });

    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();

    const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
    const severeViolations = results.violations.filter(
      ({ impact }) => impact === "critical" || impact === "serious",
    );

    expect(severeViolations).toEqual([]);
  });
}

test("menu mobile, filtro e carosello restano accessibili senza React", async ({
  page,
}) => {
  await page.route(/^https?:\/\//, async (request) => {
    const hostname = new URL(request.request().url()).hostname;
    if (hostname === "127.0.0.1") await request.continue();
    else await request.abort();
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const menuButton = page.getByRole("button", {
    name: "Apri il menu di navigazione",
  });
  await menuButton.click();
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");

  await expect(page.locator("[data-carousel-toggle-label]")).toHaveText(
    "Avvia",
  );

  await page.goto("/specializzazioni");
  await page.locator("[data-specialization-filter]").selectOption("Nutrizione");
  const visibleCards = page.locator("[data-doctor-card]:visible");
  await expect(visibleCards).toHaveCount(3);
  await expect(visibleCards).toContainText([
    "Anna Maria Anichini",
    "Linda Prosperi",
    "Francesca Mastrorosato",
  ]);
});

test("metadati social e dati strutturati sono coerenti", async ({ page }) => {
  await page.route(/^https?:\/\//, async (request) => {
    const hostname = new URL(request.request().url()).hostname;
    if (hostname === "127.0.0.1") await request.continue();
    else await request.abort();
  });

  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    "content",
    "https://www.centromedicoagliana.it/",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /https:\/\/www\.centromedicoagliana\.it\//,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );

  const schemas = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  expect(schemas.map((schema: { "@type": string }) => schema["@type"])).toEqual(
    ["MedicalClinic", "FAQPage"],
  );

  await page.goto("/romani-endocrinologa");
  const physicianSchemas = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  expect(
    physicianSchemas.map((schema: { "@type": string }) => schema["@type"]),
  ).toEqual(["MedicalClinic", "Physician"]);

  await page.goto("/404.html");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("le varianti di prenotazione espongono azioni coerenti", async ({
  page,
}) => {
  await page.route(/^https?:\/\//, async (request) => {
    const hostname = new URL(request.request().url()).hostname;
    if (hostname === "127.0.0.1") await request.continue();
    else await request.abort();
  });

  await page.goto("/romani-endocrinologa");
  await expect(
    page.getByRole("link", { name: "Prenota online" }),
  ).toHaveAttribute("href", /^https:\/\/www\.doctolib\.it\//);

  await page.goto("/cirillo-massofisioterapista");
  await expect(
    page.getByText(
      "Prenotazione online non disponibile, chiamaci per prenotare",
    ),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Prenota online" })).toHaveCount(
    0,
  );
});
