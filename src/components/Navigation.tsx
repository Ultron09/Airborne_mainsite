'use client';

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";

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
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(0,214,161,0.5)] transition-transform group-hover:scale-110">
            A
          </div>
          <span className="text-xl font-heading font-bold tracking-tight text-white group-hover:text-primary transition-colors drop-shadow-md hidden sm:block">
            Airborne<span className="text-primary font-medium">HRS</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href={`/${locale}/#features`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
            {tNav('features')}
          </Link>
          <Link href={`/${locale}/#technology`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
            {tNav('technology')}
          </Link>
          <Link href={`/${locale}/blog`} className="text-sm font-medium text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
            {tNav('blog')}
          </Link>
        </nav>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-4">
        <a
          href="https://jobs.airbornehrs.in"
          className="hidden lg:inline-flex text-sm font-bold text-primary hover:text-accent transition-colors py-2 px-3"
        >
          {tNav('jobPortal')}
        </a>
        <Link
          href={`/${locale}/#contact`}
          className="hidden sm:inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground shadow-[0_0_20px_rgba(0,214,161,0.4)] hover:bg-primary/90 transition-all hover:scale-105"
        >
          {tNav('requestDemo')}
        </Link>
        {/* Language Switcher */}
        <div className="flex items-center gap-2 sm:ml-4 sm:border-l border-white/20 sm:pl-4">
          <Link href="/en" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">EN</Link>
          <Link href="/es" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">ES</Link>
          <Link href="/hi" className="text-xs font-bold text-white/70 hover:text-primary transition-colors uppercase">HI</Link>
        </div>
      </div>
    </motion.header>
  );
}
