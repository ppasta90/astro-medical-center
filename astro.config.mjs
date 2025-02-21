import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://centromedicoagliana.it",
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), partytown()]
});