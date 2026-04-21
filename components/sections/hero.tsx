"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useLang } from "@/lib/lang-context"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLang()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover object-center"
          alt="Modern architectural skyline of Astana Kazakhstan at dusk with glowing city lights and glass skyscrapers reflecting evening sky"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_2nCK0Li4xPkV44OTgCPS_X5tSkXR2jYrdiHN3wafEvyJ8j-zNM3Lv_xVWFtRYGGWrUqw7vF0ULbOBN8caRn_8bKcYbT7w2cggoZzJfuHviLHNmAR7sWkZT1xV1bNH_0MAMXTUt-HjZEk1EhdC2HXSYB8L2HIFqwXVgvW6K2sj3ejUp_fekWaKzssWDK11WWrSXOOYyzRmgRKD8hZO1cHgY-3FzOO6ZTvaU0rUyZsmWXBaRSq_msLXIJ9KHqDct4OOUPVvkubH14U"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/70 to-[#0f172a]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-4 md:px-8 w-full py-12 md:py-0">
        <div
          className="max-w-3xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 800ms ease-out, transform 800ms ease-out",
          }}
        >
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold tracking-wider mb-4 md:mb-6">
            {t("hero.badge")}
          </span>

          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-4 md:mb-6 text-balance">
            {t("hero.title1")}{" "}
            <span className="text-accent">{t("hero.title2")}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-10 max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-secondary text-secondary-foreground px-6 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-base sm:text-lg hover:bg-secondary/90 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {t("hero.apply")}
                <ArrowRight size={20} />
              </Button>
            </Link>
            <Link href="/universities">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 sm:px-10 py-5 sm:py-6 rounded-xl font-bold text-base sm:text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
              >
                <Play size={18} className="fill-current" />
                {t("hero.learnMore")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </div>
      </div>
    </section>
  )
}
