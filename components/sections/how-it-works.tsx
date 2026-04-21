"use client"

import { useLang } from '@/lib/lang-context'

export function HowItWorks() {
  const { t } = useLang()

  const steps = [
    {
      number: 1,
      titleKey: "path.step1.title",
      descKey: "path.step1.desc",
    },
    {
      number: 2,
      titleKey: "path.step2.title",
      descKey: "path.step2.desc",
    },
    {
      number: 3,
      titleKey: "path.step3.title",
      descKey: "path.step3.desc",
    },
    {
      number: 4,
      titleKey: "path.step4.title",
      descKey: "path.step4.desc",
    },
    {
      number: 5,
      titleKey: "path.step5.title",
      descKey: "path.step5.desc",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold mb-6">
            {t('path.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('path.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-6 left-0 w-full h-0.5 bg-border hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white p-6 md:p-8 rounded-2xl editorial-shadow text-center"
              >
                {/* Step Number */}
                <div className="w-12 h-12 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 relative z-10">
                  {step.number}
                </div>

                <h4 className="font-headline font-bold text-lg mb-3">
                  {t(step.titleKey)}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(step.descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
