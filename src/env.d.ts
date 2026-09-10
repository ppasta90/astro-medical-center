/// <reference types="astro/client" />

interface Window {
  dataLayer: unknown[];
  gtag: (...args: unknown[]) => void;
  gtag_report_conversion: (url?: string) => false;
  _iub: {
    csConfiguration?: {
      siteId: number;
      cookiePolicyId: number;
      lang: string;
      googleConsentMode: boolean;
      googleAdsDataRedaction: boolean;
    };
  } & unknown[];
}
