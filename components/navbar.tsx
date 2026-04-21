"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLang, type Lang } from "@/lib/lang-context"
import { useWishlist } from "@/lib/wishlist-context"

const LANG_OPTIONS: Lang[] = ["en", "ru", "kz"]

const navKeys = [
  { href: "/universities", key: "nav.universities" },
  { href: "/services", key: "nav.services" },
  { href: "/about", key: "nav.about" },
  { href: "/contact", key: "nav.contact" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { lang, setLang, t } = useLang()
  const { items } = useWishlist()

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <nav className="flex justify-between items-center px-4 md:px-8 h-20 max-w-screen-2xl mx-auto w-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-black text-foreground tracking-tighter font-headline flex items-center gap-2"
        >
          <span className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center text-secondary-foreground font-bold">E</span>
          EduPath
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium text-foreground hover:text-secondary transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((o) => !o)}
              className="px-4 py-1.5 rounded-full border-2 border-secondary text-secondary font-bold text-sm tracking-wide hover:bg-secondary hover:text-secondary-foreground transition-colors uppercase"
            >
              {lang}
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 min-w-[80px]">
                {LANG_OPTIONS.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false) }}
                    className={`w-full px-4 py-2 text-sm font-bold uppercase text-left transition-colors ${
                      lang === l
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist / Cart */}
          <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <ShoppingBag size={20} className="text-foreground" />
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-black rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile: wishlist + toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-muted transition-colors">
            <ShoppingBag size={20} className="text-foreground" />
            {items.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-secondary text-secondary-foreground text-xs font-black rounded-full flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <div className="flex flex-col p-4 gap-4">
            {navKeys.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-foreground hover:text-secondary py-2 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="flex gap-2 pt-4 border-t border-border">
              {LANG_OPTIONS.map((l) => (
                <button
                  key={l}
                  onClick={() => { setLang(l); setMobileMenuOpen(false) }}
                  className={`flex-1 py-2 rounded-full border-2 text-sm font-bold uppercase transition-colors ${
                    lang === l
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-secondary text-secondary-foreground">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
