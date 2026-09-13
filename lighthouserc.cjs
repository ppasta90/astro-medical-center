module.exports = {
  ci: {
    collect: {
      chromePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
      startServerCommand: "npm run preview -- --host 127.0.0.1",
      startServerReadyPattern: "Local",
      url: [
        "http://127.0.0.1:4321/",
        "http://127.0.0.1:4321/specializzazioni",
        "http://127.0.0.1:4321/romani-endocrinologa",
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox",
        onlyCategories: ["performance", "accessibility", "seo"],
      },
    },
    assert: {
      aggregationMethod: "median-run",
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "resource-summary:total:size": ["error", { maxNumericValue: 1536000 }],
        "resource-summary:script:size": ["error", { maxNumericValue: 512000 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: ".lighthouseci/reports",
    },
  },
};
