"use client"

import { Globe, Wallet, Languages, PartyPopper } from "lucide-react"
import { useLang } from "@/lib/lang-context"

export function WhyKazakhstan() {
  const { t } = useLang()

  const features = [
    {
      icon: Globe,
      titleKey: "whykz.international.title",
      descKey: "whykz.international.desc",
      large: true,
      bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGRQom0FaUiA1M6lylYmi8T-HkdQatugpYguhKVCHoDq3eUxSerw3jtJahc77RRE2kEZ61Is3sMdPNxV9_iruPmtrMyFpy5w3UqFF659SDivxm9DavMPyC03Wh86ZnTc90toofH-GM9hciYRV_orUTKKwPLFO2NORpBVPHqIXvBVc2K4A5A0Aik-8yeI58Ky6zSWUdBZa4wwCQEzp5unKyU9QAsSnU4YLckvPBu7OwYBIq9E1nuBmnHpjRhUk2M3x7WySYMO_MhNl3",
    },
    {
      icon: Wallet,
      titleKey: "whykz.affordable.title",
      descKey: "whykz.affordable.desc",
      featured: true,
    },
    {
      icon: Languages,
      titleKey: "whykz.english.title",
      descKey: "whykz.english.desc",
    },
    {
      icon: PartyPopper,
      titleKey: "whykz.vibrant.title",
      descKey: "whykz.vibrant.desc",
      large: true,
      bgImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwrhA5VmZWAmUFNfLQPp3FCp0nyZuyrc2-AaQGqIeXhIUtUToVUlyAaI_-UmEXA-Imvhh4z9ryrEX8v-9or48SDqfDgiUegEFfWP82mmAraOAsGcQaBh2BTEiloEB9kZKiAiTaxMOPQHLfiA-h6iO0w-fIB6P8KvvyvSnGgGlWZ0UPCsEGBjkEm_jgdN4kpW78lia5wD3mevZQwv46ioLPOHcFWIDiB9ljPOOB9yDa_nlqi5QelxQcdrnG7rHaInnsWmRGH7KjRvRb",
    },
  ]

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="mb-16 md:mb-20 text-center max-w-2xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-6">
          {t('whykz.section.title')}
        </h2>
        <p className="text-lg text-muted-foreground">
          {t('whykz.section.subtitle')}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
        {/* International Recognition - Large */}
        <div className="md:col-span-8 bg-muted rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-end min-h-[350px] md:min-h-[400px]">
          <img
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-20 pointer-events-none"
            alt="University degree with gold seal"
            src={features[0].bgImage}
          />
          <div className="relative z-10">
            <Globe className="text-secondary w-12 h-12 mb-6" />
            <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">
              {t(features[0].titleKey)}
            </h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              {t(features[0].descKey)}
            </p>
          </div>
        </div>

        {/* Affordable Tuition - Featured */}
        <div className="md:col-span-4 bg-secondary text-white rounded-2xl p-8 md:p-12 flex flex-col justify-center">
          <Wallet className="text-secondary-fixed w-12 h-12 mb-6" />
          <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">
            {t(features[1].titleKey)}
          </h3>
          <p className="text-white/80 leading-relaxed">
            {t(features[1].descKey)}
          </p>
        </div>

        {/* English-taught Programs */}
        <div className="md:col-span-5 bg-white editorial-shadow rounded-2xl p-8 md:p-12">
          <Languages className="text-tertiary-fixed-dim w-12 h-12 mb-6" />
          <h3 className="font-headline text-xl md:text-2xl font-bold mb-4">
            {t(features[2].titleKey)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t(features[2].descKey)}
          </p>
        </div>

        {/* Vibrant Student Life - Large */}
        <div className="md:col-span-7 bg-muted rounded-2xl p-8 md:p-12 relative overflow-hidden min-h-[300px]">
          <div className="relative z-10 h-full flex flex-col justify-center">
            <PartyPopper className="text-secondary w-12 h-12 mb-6" />
            <h3 className="font-headline text-2xl md:text-3xl font-bold mb-4">
              {t(features[3].titleKey)}
            </h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              {t(features[3].descKey)}
            </p>
          </div>
          <img
            className="absolute top-0 right-0 w-1/2 h-full object-cover opacity-10 pointer-events-none"
            alt="International students walking through university"
            src={features[3].bgImage}
          />
        </div>
      </div>
    </section>
  )
}
