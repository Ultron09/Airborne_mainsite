'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/MotionWrappers";

export default function Navigation({ locale }: { locale: string }) {
  const tNav = useTranslations('Navigation');
  const { scrollY } = useScroll();

  // Morph header from full width to a compact pill
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "70%"]);
  const headerY = useTransform(scrollY, [0, 100], [16, 24]);
  const headerBorderRadius = useTransform(scrollY, [0, 100], ["2rem", "3rem"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["1.5rem", "1rem"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(6, 60, 53, 0.1)", "rgba(6, 60, 53, 0.4)"]);

  return (
    <motion.header
      style={{
        width: headerWidth,
        y: headerY,
        borderRadius: headerBorderRadius,
        backgroundColor: headerBg,
        paddingLeft: headerPadding,
        paddingRight: headerPadding,
      }}
      className="fixed z-50 left-1/2 -translate-x-1/2 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,17,14,0.5)] flex items-center justify-between"
    >
      {/* Logo */}
      <div className="flex items-center gap-8">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <img
            src="/logo.webp"
            alt="Airborne HRS Logo"
            className="h-8 w-8 rounded-xl object-contain shadow-[0_0_15px_rgba(0,214,161,0.5)] transition-transform group-hover:scale-110"
          />
          <span className="text-xl font-heading font-bold tracking-tight text-white group-hover:text-primary transition-colors drop-shadow-md hidden sm:block">
            Airborne<span className="text-primary font-medium">HRS</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <MagneticButton href={`/${locale}/#features`}>
            <span className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all inline-block px-2 py-1">
              {tNav('features')}
            </span>
          </MagneticButton>
          <MagneticButton href={`/${locale}/#technology`}>
            <span className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all inline-block px-2 py-1">
              {tNav('technology')}
            </span>
          </MagneticButton>
          <MagneticButton href={`/${locale}/blog`}>
            <span className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all inline-block px-2 py-1">
              {tNav('blog')}
            </span>
          </MagneticButton>
        </nav>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <MagneticButton href="https://jobs.airbornehrs.in/jobs">
          <span className="hidden lg:inline-flex text-sm font-bold text-primary hover:text-accent transition-colors py-2 px-3">
            {tNav('jobPortal')}
          </span>
          <span className="sr-only lg:hidden">
            {tNav('jobPortal')}
          </span>
        </MagneticButton>
        <MagneticButton href={`/${locale}/#contact`}>
          <span className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,214,161,0.4)] hover:bg-primary/90 transition-all hover:scale-105">
            {tNav('requestDemo')}
          </span>
        </MagneticButton>
        {/* Language Switcher */}
        <div className="flex items-center gap-2 sm:ml-4 sm:border-l border-white/20 sm:pl-4">
          <Link href="/en" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">EN</Link>
          <Link href="/es" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">ES</Link>
          <Link href="/hi" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">HI</Link>
          <Link href="/fr" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">FR</Link>
          <Link href="/ar" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">AR</Link>
          <Link href="/nl" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">NL</Link>
          <Link href="/ja" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">JA</Link>
          <Link href="/zh" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">ZH</Link>
        </div>
      </div>
    </motion.header>
  );
}
