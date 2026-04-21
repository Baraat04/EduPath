'use client'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Globe, Target, Briefcase, HeartHandshake, Clock, GraduationCap, MapPin, Users } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/fade-in'
import { useLang } from '@/lib/lang-context'

export default function AboutPage() {
  const { t } = useLang()

  const partnerUniversities = [
    {
      name: 'Nazarbayev University',
      location: 'Astana',
      focus: 'Global Research & Sciences',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrM8E97O9X2Gyol4_3oZRPRnimqLTactkHIqqniN8XGy4KpCqQsNZ5NI7dGW9beMT4lIsFvx8Pgg48-rWXVo7SFuqnnNrJFel0QqQ_gZRSArI-iS8P6tB-ExKx1aFgEfwf4xn1RL3cdYlo4EiWcG4JT2JCBvY6CMqvJBT0M3VQk5WUwBec5WhhPRjSG3ekDb6xLT6sqJKMJ6PG5HOoUcB6Vtqkrn5I6iMJ9zMjPHPEOX6Staa0HgL2NT2SOWdWKQ0lAHWJa08_f2Cl',
    },
    {
      name: 'KIMEP University',
      location: 'Almaty',
      focus: 'Business, Law & Social Sciences',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCl0IqFTI9eFIwvCgui3rH1f8Zm7r1sFmxMvTFH3rU8odAa6rJE22mXRbNvIN-JcdV1PR4Q8gizHxZ6_bESxkhD8yrUanIN6XFsv1bigVJMVPi5aq7Krd0Es-w1m15KVlITnlZ-I5hlX1GzXSfssmoLA0YYNCMxfzmy7QtaCj4RznFfpaXpq0EZOfUibG_niDzmGJV64jij_kRFoRf8Y_JLLGqsP2ZZDSPTFGRqzjWfMZYiKYk7yGgdRvz20FbMP0zsIVv0X7xePElp',
    },
    {
      name: 'Astana IT University',
      location: 'Astana',
      focus: 'Technology & Innovation',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3kASiVhKIXlvLC4kFk33QvPvDxggF-YdN15xtXFeYfudWrFjvDrQk_ABXc7a-16MfSrYqh-OLvsqaxY7EHGq17NpSvH9H-_hddWwDYAnaTMSTug2RMTuower0Awuj7f4F1i5SXNrW2ElNMy6H38pa807tJfvxN0kTv3sW7JMkKi3o2B653FvRomYb_yuJc5pryOMWaG-HQxG_ZmeYrsUxH4ZGG4GZ_vnrgX4zbwJX9QVktaEvLtSXGZmJjHidD1YOkXpSvbI8rxny',
    },
    {
      name: 'Kazakh-British Technical University',
      location: 'Almaty',
      focus: 'Engineering & IT (UK Partnership)',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJmRDbt_xIen3VY2y3ZE9a6K1K_A5dLE3ojTYWetpCgre9c8HCrKZqGrHk-KVP0Lt49ePOaKXCWQJw4fxg_OzC7X_dcC4K5eP_XEflpV7Wp3D8ovKPlboiUFF4gQlptWnjgxKP0DO2Mpckrp4QARJyyuFspC1EJXChtIud-GOnOfKFgJseQ4bgOeu2NajWLihEthcXbP5oPGL1lJLal_bgfOyglrod6R4G4ZFD1Cr-fJVgG7smppmMalszLzEHPpXSufNqhAizv-sD',
    },
    {
      name: 'Al-Farabi KazNU',
      location: 'Almaty',
      focus: 'Multidisciplinary Research University',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBue7lhmV4tZYVOkM277XeHg08mVCSZ3euqZVDrR3HCVhWdAc_GMirPQmiRvfLU2XspWB5DJihf1sUKmxhk8S8YCbIsG67LFJg0uYYp21K8Tku2NU9-77gpcBeJOsa6YxHiDU9zS2nKdIeQpaR5limbRe7hZr9xFMc6ug4pZ-Qq5FArakeKpBYgdmWURYYhVhbdYP-FgHEbrZ3VJKQ0vy2HS-FvLFS6du-VXk6Kj_RfpwxcDbzHhLfoGIF3eLqZQB2CkoA1zQJExlEu',
    },
    {
      name: 'Medical University of Astana',
      location: 'Astana',
      focus: 'Medicine & Clinical Practice',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwrhA5VmZWAmUFNfLQPp3FCp0nyZuyrc2-AaQGqIeXhIUtUToVUlyAaI_-UmEXA-Imvhh4z9ryrEX8v-9or48SDqfDgiUegEFfWP82mmAraOAsGcQaBh2BTEiloEB9kZKiAiTaxMOPQHLfiA-h6iO0w-fIB6P8KvvyvSnGgGlWZ0UPCsEGBjkEm_jgdN4kpW78lia5wD3mevZQwv46ioLPOHcFWIDiB9ljPOOB9yDa_nlqi5QelxQcdrnG7rHaInnsWmRGH7KjRvRb',
    },
  ]

  const whyChoose = [
    {
      icon: Briefcase,
      titleKey: 'about.whychoose.experts.title',
      descKey: 'about.whychoose.experts.desc',
    },
    {
      icon: Users,
      titleKey: 'about.whychoose.personal.title',
      descKey: 'about.whychoose.personal.desc',
    },
    {
      icon: Clock,
      titleKey: 'about.whychoose.support.title',
      descKey: 'about.whychoose.support.desc',
    },
  ]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <FadeIn>
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-4">
                {t('about.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground mb-4 text-balance">
                {t('about.title')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('about.subtitle')}
              </p>
            </div>
          </FadeIn>

          {/* Mission, Vision, Values */}
          <FadeIn delay={150}>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
              <Card className="p-6 md:p-8 border-2 border-accent/50 hover:border-accent transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 text-secondary mb-4 mx-auto">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground text-center mb-3">{t('about.mission.title')}</h3>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                  {t('about.mission.desc')}
                </p>
              </Card>

              <Card className="p-6 md:p-8 border-2 border-secondary/50 hover:border-secondary transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary/20 text-secondary mb-4 mx-auto">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground text-center mb-3">{t('about.vision.title')}</h3>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                  {t('about.vision.desc')}
                </p>
              </Card>

              <Card className="p-6 md:p-8 border-2 border-amber-500/50 hover:border-amber-500 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/20 text-amber-600 mb-4 mx-auto">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-foreground text-center mb-3">{t('about.values.title')}</h3>
                <p className="text-muted-foreground text-center text-sm md:text-base">
                  {t('about.values.desc')}
                </p>
              </Card>
            </div>
          </FadeIn>

          {/* About Section */}
          <FadeIn delay={200}>
            <Card className="p-8 md:p-12 mb-12 md:mb-16 bg-card border-border">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-6">{t('about.story.title')}</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
                <div className="bg-secondary/5 border-l-4 border-secondary p-4 rounded-r-lg">
                  <p className="text-foreground font-medium">
                    {t('about.story.p4')}
                  </p>
                </div>
                <p>{t('about.story.p5')}</p>
              </div>
            </Card>
          </FadeIn>

          {/* Partner Universities Section */}
          <FadeIn delay={250}>
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-3 text-center">{t('about.partners.title')}</h2>
              <p className="text-muted-foreground text-center mb-8 md:mb-12 max-w-2xl mx-auto">
                {t('about.partners.subtitle')}
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                {partnerUniversities.map((uni, i) => (
                  <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow border-border group">
                    <div className="h-44 md:h-48 bg-muted overflow-hidden">
                      <img
                        src={uni.image}
                        alt={uni.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start gap-2 mb-2">
                        <GraduationCap className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                        <h3 className="text-base font-bold text-foreground leading-tight">{uni.name}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {uni.location}, Kazakhstan
                      </div>
                      <p className="text-xs text-secondary font-medium mt-2">{uni.focus}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Why Choose Us */}
          <FadeIn delay={300}>
            <Card className="p-8 md:p-12 bg-muted border-border mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-8 md:mb-12 text-center">{t('about.why.title')}</h2>
              <div className="grid sm:grid-cols-3 gap-6 md:gap-8">
                {whyChoose.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{t(item.titleKey)}</h3>
                      <p className="text-muted-foreground text-sm">
                        {t(item.descKey)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </Card>
          </FadeIn>

          {/* CTA */}
          <FadeIn delay={350}>
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground mb-4">{t('about.cta.title')}</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t('about.cta.subtitle')}
              </p>
              <Link href="/contact">
                <Button className="bg-secondary text-secondary-foreground px-8 py-3 text-lg">
                  {t('about.cta.button')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  )
}
