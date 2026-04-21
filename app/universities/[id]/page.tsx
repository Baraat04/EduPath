'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin, Users, Globe, Award, ArrowRight, Star, DollarSign, BookOpen,
  CheckCircle, Clock, GraduationCap, Building2, ChevronLeft
} from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/fade-in'
import { useLang } from '@/lib/lang-context'
import { getUniversitiesFromSupabase, type UniversityData } from '@/lib/universities-supabase'

export default function UniversityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { lang, t } = useLang()
  const [university, setUniversity] = useState<UniversityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions'>('overview')

  useEffect(() => {
    async function loadData() {
      const universities = await getUniversitiesFromSupabase()
      const found = universities.find(u => u.id === id)
      setUniversity(found || null)
      setLoading(false)
    }
    loadData()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-2xl font-bold text-foreground mb-4">University not found</h1>
            <Link href="/universities">
              <Button className="bg-secondary text-secondary-foreground">
                Back to Universities
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Get translation for current language
  const trans = university.translations[lang]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Back */}
          <FadeIn>
            <Link href="/universities" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8">
              <ChevronLeft size={18} />
              <span className="text-sm font-medium">{t('unilist.title')}</span>
            </Link>
          </FadeIn>

          {/* Hero */}
          <FadeIn delay={50}>
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 h-48 sm:h-64 md:h-96">
              {university.image ? (
                <img
                  src={university.image}
                  alt={trans.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <Building2 className="w-16 h-16 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {trans.ranking}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold font-headline text-white mb-1 text-balance">
                  {trans.name}
                </h1>
                <div className="flex items-center gap-1 text-white/80 text-sm">
                  <MapPin size={14} />
                  {trans.location}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Quick Stats - without Established */}
          <FadeIn delay={100}>
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              {[
                { icon: Star, label: lang === 'ru' ? 'Рейтинг' : lang === 'kz' ? 'Рейтинг' : 'Rating', value: `${university.rating}/5`, sub: `${university.reviews} ${lang === 'ru' ? 'отзывов' : lang === 'kz' ? 'пікір' : 'reviews'}` },
                { icon: Users, label: lang === 'ru' ? 'Студенты' : lang === 'kz' ? 'Студенттер' : 'Students', value: university.students },
                { icon: DollarSign, label: lang === 'ru' ? 'Обучение' : lang === 'kz' ? 'Оқу ақысы' : 'Tuition', value: trans.tuition, sub: lang === 'ru' ? 'в год' : lang === 'kz' ? 'жылына' : 'per year' },
              ].map(({ icon: Icon, label, value, sub }) => (
                <Card key={label} className="p-3 md:p-4 text-center border-border">
                  <Icon className="w-5 h-5 text-secondary mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="font-bold text-foreground text-sm md:text-base">{value || '—'}</p>
                  {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
                </Card>
              ))}
            </div>
          </FadeIn>

          {/* Tabs - without Programs */}
          <FadeIn delay={150}>
            <div className="flex gap-1 bg-muted rounded-xl p-1 mb-6 md:mb-8 w-full sm:w-auto">
              {(['overview', 'admissions'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 sm:flex-none px-3 md:px-6 py-2 rounded-lg font-medium text-xs md:text-sm transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-card shadow text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab === 'overview' 
                    ? (lang === 'ru' ? 'Обзор' : lang === 'kz' ? 'Шолу' : 'Overview')
                    : (lang === 'ru' ? 'Поступление' : lang === 'kz' ? 'Қабылдау' : 'Admissions')}
                </button>
              ))}
            </div>
          </FadeIn>

          {activeTab === 'overview' && (
            <FadeIn delay={200}>
              <div className="space-y-6">
                <Card className="p-5 md:p-8 border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">
                    {lang === 'ru' ? 'Об университете' : lang === 'kz' ? 'Университет туралы' : `About ${trans.name}`}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">{trans.description}</p>
                </Card>

                {trans.highlights && trans.highlights.length > 0 && trans.highlights.some(h => h.trim()) && (
                  <Card className="p-5 md:p-8 border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {lang === 'ru' ? 'Преимущества' : lang === 'kz' ? 'Артықшылықтар' : 'Highlights'}
                    </h2>
                    <ul className="space-y-3">
                      {trans.highlights.filter(h => h.trim()).map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {trans.scholarships && (
                  <Card className="p-5 md:p-8 border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {lang === 'ru' ? 'Стипендии' : lang === 'kz' ? 'Стипендиялар' : 'Scholarship Information'}
                    </h2>
                    <p className="text-muted-foreground text-sm">{trans.scholarships}</p>
                  </Card>
                )}

                {university.website && (
                  <Card className="p-5 md:p-8 border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {lang === 'ru' ? 'Сайт' : lang === 'kz' ? 'Веб-сайт' : 'Website'}
                    </h2>
                    <a 
                      href={`https://${university.website}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline flex items-center gap-2"
                    >
                      <Globe size={16} />
                      {university.website}
                    </a>
                  </Card>
                )}

                <Link href="/contact">
                  <Button className="w-full bg-secondary text-secondary-foreground py-5 md:py-6 text-base">
                    {lang === 'ru' ? 'Подать заявку' : lang === 'kz' ? 'Өтінім беру' : 'Apply Now'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}

          {activeTab === 'admissions' && (
            <FadeIn delay={200}>
              <div className="space-y-6">
                {trans.admissions.requirements && trans.admissions.requirements.length > 0 && trans.admissions.requirements.some(r => r.trim()) && (
                  <Card className="p-5 md:p-8 border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {lang === 'ru' ? 'Требования для поступления' : lang === 'kz' ? 'Қабылдау талаптары' : 'Admission Requirements'}
                    </h2>
                    <ul className="space-y-3">
                      {trans.admissions.requirements.filter(r => r.trim()).map((req: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {trans.admissions.deadline_text && (
                  <Card className="p-5 md:p-8 border-border">
                    <h2 className="text-xl font-bold text-foreground mb-4">
                      {lang === 'ru' ? 'Дедлайн подачи' : lang === 'kz' ? 'Өтінім мерзімі' : 'Application Deadline'}
                    </h2>
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-secondary" />
                      <div>
                        <p className="font-bold text-foreground">{trans.admissions.deadline_text}</p>
                        <p className="text-muted-foreground text-sm">
                          {lang === 'ru' ? 'Заявки принимаются до этой даты' : lang === 'kz' ? 'Өтініштер осы күнге дейін қабылданады' : 'Applications close on this date'}
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                <Link href="/contact">
                  <Button className="w-full bg-secondary text-secondary-foreground py-5 md:py-6 text-base">
                    {lang === 'ru' ? 'Начать подачу заявки' : lang === 'kz' ? 'Өтінім беруді бастау' : 'Start Your Application'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
