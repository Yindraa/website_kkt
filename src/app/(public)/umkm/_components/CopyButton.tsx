"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // diamkan
    }
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={onCopy}>
      {copied ? "Disalin ✓" : "Salin Kontak"}
    </button>
  );
}
