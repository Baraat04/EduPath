"use client"

import { Card } from '@/components/ui/card'
import { useLang } from '@/lib/lang-context'

export function Benefits() {
  const { t } = useLang()

  const benefits = [
    {
      number: 1,
      titleKey: 'benefits.fast.title',
      descKey: 'benefits.fast.desc',
    },
    {
      number: 2,
      titleKey: 'benefits.verified.title',
      descKey: 'benefits.verified.desc',
    },
    {
      number: 3,
      titleKey: 'benefits.expert.title',
      descKey: 'benefits.expert.desc',
    },
  ]

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            {t('benefits.section.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('benefits.section.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card
              key={benefit.number}
              className="p-6 hover:editorial-shadow transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform font-bold text-xl">
                {benefit.number}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{t(benefit.titleKey)}</h3>
              <p className="text-muted-foreground text-sm">{t(benefit.descKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
