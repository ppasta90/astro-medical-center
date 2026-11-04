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

test("i contatti specialista mostrano solo i canali disponibili", async ({
  page,
}) => {
  await page.route(/^https?:\/\//, async (request) => {
    const hostname = new URL(request.request().url()).hostname;
    if (hostname === "127.0.0.1") await request.continue();
    else await request.abort();
  });

  await page.goto("/specializzazioni");

  const romaniCard = page
    .locator("[data-doctor-card]")
    .filter({ hasText: "Alessia Romani" });
  await expect(romaniCard.locator('a[href="tel:+393313521633"]')).toBeVisible();
  await expect(
    romaniCard.locator('a[href="mailto:dr.alessiaromani@gmail.com"]'),
  ).toBeVisible();
  await expect(
    romaniCard.locator('a[href*="doctolib.it/endocrinologo"]'),
  ).toBeVisible();

  const pastacaldiCard = page
    .locator("[data-doctor-card]")
    .filter({ hasText: "Sandro Pastacaldi" });
  await expect(pastacaldiCard.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(pastacaldiCard.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(pastacaldiCard.locator('a[href*="doctolib.it"]')).toBeVisible();

  const pellegrinoCard = page
    .locator("[data-doctor-card]")
    .filter({ hasText: "Sandra Pellegrino" });
  await expect(pellegrinoCard.locator('a[href^="tel:"]')).toHaveCount(0);

  const bortotCard = page
    .locator("[data-doctor-card]")
    .filter({ hasText: "Giulia Bortot" });
  await expect(
    bortotCard.locator('a[href="mailto:bgiulss88@gmail.com"]'),
  ).toBeVisible();

  await page.goto("/romani-endocrinologa");
  await expect(page.locator('a[href="tel:+393313521633"]')).toBeVisible();
  await expect(
    page.locator('a[href="mailto:dr.alessiaromani@gmail.com"]'),
  ).toBeVisible();

  const physicianSchemas = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  const physician = physicianSchemas.find(
    (schema: { "@type": string }) => schema["@type"] === "Physician",
  );
  expect(physician.telephone).toBe("+393313521633");
  expect(physician.email).toBe("dr.alessiaromani@gmail.com");

  await page.goto("/bortot-urologa");
  await expect(
    page.locator('a[href="mailto:bgiulss88@gmail.com"]'),
  ).toBeVisible();
  const bortotSchemas = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  const bortotPhysician = bortotSchemas.find(
    (schema: { "@type": string }) => schema["@type"] === "Physician",
  );
  expect(bortotPhysician.email).toBe("bgiulss88@gmail.com");

  await page.goto("/pellegrino-podologa");
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  const pellegrinoSchemas = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  const pellegrinoPhysician = pellegrinoSchemas.find(
    (schema: { "@type": string }) => schema["@type"] === "Physician",
  );
  expect(pellegrinoPhysician.telephone).toBeUndefined();
});

test("la prenotazione globale indirizza alla sezione specialisti", async ({
  page,
}) => {
  await page.route(/^https?:\/\//, async (request) => {
    const hostname = new URL(request.request().url()).hostname;
    if (hostname === "127.0.0.1") await request.continue();
    else await request.abort();
  });

  await page.goto("/");
  await expect(page.locator('a[href="tel:+390574027087"]')).toHaveCount(0);
  await expect(page.getByText("0574 027087")).toHaveCount(0);
  await expect(page.getByText(/la nostra segreteria/i)).toHaveCount(0);

  const contacts = page.locator("#contatti");
  await expect(contacts).toContainText(
    "Per prenotare una visita, consulta la sezione Specialisti e scegli il professionista di tuo interesse.",
  );
  await expect(contacts.locator('a[href="/specializzazioni"]')).toBeVisible();

  await page.goto("/lavora-con-noi");
  await expect(page.locator('a[href="tel:+390574027087"]')).toHaveCount(0);
  await expect(page.getByText("0574 027087")).toHaveCount(0);
});
