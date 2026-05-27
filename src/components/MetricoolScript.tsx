"use client";

import Script from "next/script";

export default function MetricoolScript() {
  return (
    <Script
      id="metricool-tracker"
      src="https://tracker.metricool.com/resources/be.js"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-expect-error beTracker is injected by the metricool script
        if (window.beTracker) {
          // @ts-expect-error beTracker is injected by the metricool script
          window.beTracker.t({ hash: "da5e1d7f32d81f2648f985368dfaaee9" });
        }
      }}
    />
  );
}
