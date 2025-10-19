// src/components/FX.tsx
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import React from "react";

/** === Variants helper (ekspor fungsi langsung) === */
export const stagger = (delay = 0, gap = 0.06): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

export const fadeUp = (dist = 10, dur = 0.5): Variants => ({
  hidden: { opacity: 0, y: dist },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: dur, ease: [0.22, 1, 0.36, 1] },
  },
});

export const fade = (dur = 0.4): Variants => ({
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur } },
});

export const zoom = (scaleFrom = 0.98, dur = 0.35): Variants => ({
  hidden: { opacity: 0, scale: scaleFrom },
  show: { opacity: 1, scale: 1, transition: { duration: dur } },
});

/** (Opsional) kompatibilitas lama: kalau masih ada import {fx} */
export const fx = { stagger, fadeUp, fade, zoom };

type AsProp = React.ElementType;

/** Pastikan selalu jadi motion component (menerima variants, initial, dll.) */
function toMotionComponent(as?: AsProp) {
  const Base: AsProp = as ?? "div";
  return (motion as any)(Base);
}

/** Reveal saat discroll (sekali saja) */
export function Reveal({
  children,
  variants = fadeUp(),
  as,
  once = true,
  amount = 0.18,
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  as?: AsProp;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const v = reduce ? fade() : variants;
  const Motion = toMotionComponent(as);

  return (
    <Motion
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </Motion>
  );
}

/** Muncul langsung (tanpa scroll) */
export function Appear({
  children,
  variants = fadeUp(),
  as,
  className,
}: {
  children: React.ReactNode;
  variants?: Variants;
  as?: AsProp;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const v = reduce ? fade() : variants;
  const Motion = toMotionComponent(as);

  // Perbaikan utama: initial={false} → jangan sembunyikan di SSR first paint
  return (
    <Motion className={className} variants={v} initial={false} animate="show">
      {children}
    </Motion>
  );
}
