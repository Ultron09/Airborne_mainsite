"use client";

import dynamic from "next/dynamic";

const NeuromorphicCore = dynamic(() => import("./NeuromorphicCore"), { ssr: false });

export default function NeuromorphicCoreWrapper() {
  return <NeuromorphicCore />;
}
