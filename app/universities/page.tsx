"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Star, MapPin, ArrowUpDown, GraduationCap, Search, Filter, X, ShoppingBag, Check, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { FadeIn } from "@/components/fade-in"
import { useWishlist } from "@/lib/wishlist-context"
import { useLang } from "@/lib/lang-context"
import { getUniversitiesFromSupabase, type UniversityData } from "@/lib/universities-supabase"

// Convert tuition string to number for filtering
function parseTuitionMin(tuition: string): number {
  const match = tuition.match(/\$?([\d,]+)/)
  if (match) {
    return parseInt(match[1].replace(/,/g, ''), 10)
  }
  return 0
}

// Derive city from location
function getCityFromLocation(location: string): string {
  if (location.toLowerCase().includes('astana')) return 'Astana'
  if (location.toLowerCase().includes('almaty')) return 'Almaty'
  if (location.toLowerCase().includes('shymkent')) return 'Shymkent'
  return 'Other'
}

export default function UniversitiesPage() {
  const router = useRouter()
  const { add, remove, has } = useWishlist()
  const { lang, t } = useLang()
  const [universities, setUniversities] = useState<UniversityData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [tuitionRange, setTuitionRange] = useState([1000, 5000])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [topRatedOnly, setTopRatedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  useEffect(() => {
    async function loadData() {
      const data = await getUniversitiesFromSupabase()
      console.log(data)
      setUniversities(data)
    }
    loadData()
  }, [])

  const toggleCity = (city: string) => {
    setSelectedCities(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    )
  }

  const filteredUniversities = useMemo(() => {
    let result = universities.filter(uni => {
      const trans = uni.translations[lang]
      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matchesAny = 
          uni.translations.en.name.toLowerCase().includes(q) ||
          uni.translations.ru.name.toLowerCase().includes(q) ||
          uni.translations.kz.name.toLowerCase().includes(q) ||
          trans.location.toLowerCase().includes(q)
        if (!matchesAny) return false
      }
      // City filter
      if (selectedCities.length > 0) {
        const city = getCityFromLocation(trans.location)
        if (!selectedCities.includes(city)) return false
      }
      // Tuition filter
      const price = parseTuitionMin(trans.tuition)

      // Only filter if tuition exists
      if (price > 0 && (price < tuitionRange[0] || price > tuitionRange[1])) {
        return false
      }
      // Top rated filter
      if (topRatedOnly && uni.rating < 4.5) {
        return false
      }
      return true
    })

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => parseTuitionMin(a.translations[lang].tuition) - parseTuitionMin(b.translations[lang].tuition))
        break
      case "price-high":
        result.sort((a, b) => parseTuitionMin(b.translations[lang].tuition) - parseTuitionMin(a.translations[lang].tuition))
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // Popular - by rating
        result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [universities, searchQuery, selectedCities, tuitionRange, topRatedOnly, sortBy, lang])

  const formatPrice = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const clearFilters = () => {
    setSearchQuery("")
    setTuitionRange([1000, 5000])
    setSelectedCities([])
    setTopRatedOnly(false)
  }

  const hasActiveFilters = !!(searchQuery || selectedCities.length > 0 || topRatedOnly || tuitionRange[0] !== 1000 || tuitionRange[1] !== 5000)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 min-h-screen">
        <div className="max-w-screen-2xl mx-auto flex gap-8 px-4 md:px-8 py-8 md:py-12">
          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 lg:hidden flex items-center gap-2 shadow-lg bg-card"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter size={18} />
            {t('unilist.filters')}
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-secondary" />
            )}
          </Button>

          {/* Mobile Filters Overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-card p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-headline font-bold text-xl">{t('unilist.filters')}</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                    <X size={20} />
                  </Button>
                </div>
                <FilterContent
                  selectedCities={selectedCities}
                  toggleCity={toggleCity}
                  tuitionRange={tuitionRange}
                  setTuitionRange={setTuitionRange}
                  formatPrice={formatPrice}
                  topRatedOnly={topRatedOnly}
                  setTopRatedOnly={setTopRatedOnly}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  t={t}
                />
                <Button className="w-full mt-6 bg-secondary text-secondary-foreground" onClick={() => setShowMobileFilters(false)}>
                  {lang === 'ru' ? `Показать ${filteredUniversities.length} результатов` : lang === 'kz' ? `${filteredUniversities.length} нәтиже көрсету` : `Show ${filteredUniversities.length} Results`}
                </Button>
              </div>
            </div>
          )}

          {/* Sidebar Filters (Desktop) */}
          <aside className="w-80 hidden lg:flex flex-col gap-6 shrink-0">
            <FadeIn direction="left">
              <div className="bg-card p-6 rounded-2xl border border-border sticky top-28">
                <FilterContent
                  selectedCities={selectedCities}
                  toggleCity={toggleCity}
                  tuitionRange={tuitionRange}
                  setTuitionRange={setTuitionRange}
                  formatPrice={formatPrice}
                  topRatedOnly={topRatedOnly}
                  setTopRatedOnly={setTopRatedOnly}
                  clearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  t={t}
                />
              </div>
            </FadeIn>

            {/* Consultation Card */}
            <FadeIn direction="left" delay={200}>
              <div className="bg-[#131b2e] p-6 rounded-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-white font-headline font-bold text-lg mb-2">
                    {lang === 'ru' ? 'Нужна помощь?' : lang === 'kz' ? 'Көмек керек пе?' : 'Need Guidance?'}
                  </h4>
                  <p className="text-white/60 text-sm mb-4">
                    {lang === 'ru' ? 'Наши консультанты помогут подобрать идеальный университет.' : lang === 'kz' ? 'Біздің кеңесшілер сізге тамаша университет таңдауға көмектеседі.' : 'Our academic advisors can help you find the perfect match for your career goals.'}
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      {lang === 'ru' ? 'Записаться на консультацию' : lang === 'kz' ? 'Кеңеске жазылу' : 'Book Consultation'}
                    </Button>
                  </Link>
                </div>
                <GraduationCap className="absolute -bottom-4 -right-4 text-white/10 w-24 h-24" />
              </div>
            </FadeIn>
          </aside>

          {/* Main Content */}
          <section className="flex-1">
            {/* Header */}
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4 md:gap-6">
                <div>
                  <h1 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl mb-2 tracking-tight">
                    {t('unilist.title')}
                  </h1>
                  <p className="text-muted-foreground text-sm md:text-base">
                    {lang === 'ru' 
                      ? `Показано ${filteredUniversities.length} из ${universities.length} университетов Казахстана`
                      : lang === 'kz'
                      ? `Қазақстанның ${universities.length} университетінің ${filteredUniversities.length} көрсетілуде`
                      : `Showing ${filteredUniversities.length} of ${universities.length} institutions in Kazakhstan`}
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      placeholder={t('unilist.search')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-card border-border"
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] bg-card border-border">
                      <ArrowUpDown size={16} className="mr-2" />
                      <SelectValue placeholder={t('unilist.sortBy')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">{t('unilist.popular')}</SelectItem>
                      <SelectItem value="rating">{t('unilist.ratingHigh')}</SelectItem>
                      <SelectItem value="price-low">{t('unilist.priceLow')}</SelectItem>
                      <SelectItem value="price-high">{t('unilist.priceHigh')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </FadeIn>

            {/* University Grid */}
            {filteredUniversities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6 md:gap-8">
                {filteredUniversities.map((uni, index) => {
                  const trans = uni.translations[lang]
                  const price = parseTuitionMin(trans.tuition)
                  return (
                    <FadeIn key={uni.id} delay={index * 50}>
                      <div
                        className="group cursor-pointer bg-card rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-border hover:border-secondary/50 hover:shadow-lg"
                        onClick={() => router.push(`/universities/${uni.id}`)}
                      >
                        {/* Image */}
                        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                          {uni.image ? (
                            <img
                              alt={trans.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              src={uni.image}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Building2 className="w-16 h-16 text-muted-foreground" />
                            </div>
                          )}
                          {uni.rating >= 4.7 && (
                            <div className="absolute top-4 left-4">
                              <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                {t('unis.topPick')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5 md:p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <h3 className="font-headline font-bold text-base sm:text-lg md:text-xl mb-1 group-hover:text-secondary transition-colors line-clamp-1">
                                {trans.name || 'Untitled University'}
                              </h3>
                              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                <MapPin size={14} />
                                {trans.location || 'No location'}
                              </div>
                            </div>
                            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded text-amber-700 dark:text-amber-400 font-bold text-sm shrink-0">
                              <Star size={14} className="fill-current" />
                              {uni.rating}
                            </div>
                          </div>

                          {/* Ranking */}
                          {trans.ranking && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              <span className="bg-muted px-2 py-1 rounded-full text-xs font-medium text-muted-foreground">
                                {trans.ranking}
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="border-t border-border pt-4 mb-4">
                            <p className="text-xs text-muted-foreground mb-1">{t('unis.from')}</p>
                            <p className="text-lg md:text-xl font-black tracking-tight text-foreground">
                              {trans.tuition || 'Contact for price'}
                              <span className="text-xs font-normal text-muted-foreground"> / {lang === 'ru' ? 'год' : lang === 'kz' ? 'жыл' : 'year'}</span>
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 rounded-full text-sm"
                              onClick={(e) => { e.stopPropagation(); router.push(`/universities/${uni.id}`) }}
                            >
                              {t('unis.viewCard')}
                            </Button>
                            <Link href="/contact" onClick={(e) => e.stopPropagation()}>
                              <Button className="rounded-full bg-secondary text-secondary-foreground text-sm px-4">
                                {t('unis.apply')}
                              </Button>
                            </Link>
                            <button
                              title={has(uni.id) ? (lang === 'ru' ? 'Удалить из списка' : lang === 'kz' ? 'Тізімнен алып тастау' : 'Remove from wishlist') : (lang === 'ru' ? 'Добавить в список' : lang === 'kz' ? 'Тізімге қосу' : 'Save to wishlist')}
                              onClick={(e) => {
                                e.stopPropagation()
                                if (has(uni.id)) {
                                  remove(uni.id)
                                } else {
                                  add({ id: uni.id, name: trans.name, location: trans.location, price: trans.tuition, image: uni.image })
                                }
                              }}
                              className={`p-2 rounded-full border-2 transition-all shrink-0 ${
                                has(uni.id)
                                  ? "bg-secondary border-secondary text-secondary-foreground"
                                  : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
                              }`}
                            >
                              {has(uni.id) ? <Check size={15} /> : <ShoppingBag size={15} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  )
                })}
              </div>
            ) : (
              <FadeIn>
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-headline font-bold text-xl mb-2">{t('unilist.noResults')}</h3>
                  <p className="text-muted-foreground mb-6">
                    {lang === 'ru' ? 'Попробуйте изменить фильтры' : lang === 'kz' ? 'Сүзгілерді өзгертіп көріңіз' : 'Try adjusting your filters to see more results'}
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    {t('unilist.clearAll')}
                  </Button>
                </div>
              </FadeIn>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface FilterContentProps {
  selectedCities: string[]
  toggleCity: (city: string) => void
  tuitionRange: number[]
  setTuitionRange: (range: number[]) => void
  formatPrice: (num: number) => string
  topRatedOnly: boolean
  setTopRatedOnly: (topRated: boolean) => void
  clearFilters: () => void
  hasActiveFilters: boolean
  t: (key: string) => string
}

function FilterContent({
  selectedCities,
  toggleCity,
  tuitionRange,
  setTuitionRange,
  formatPrice,
  topRatedOnly,
  setTopRatedOnly,
  clearFilters,
  hasActiveFilters,
  t,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-headline font-bold text-lg">{t('unilist.filters')}</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-destructive hover:text-destructive">
            {t('unilist.clearFilters')}
          </Button>
        )}
      </div>
      
      {/* City Filter */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
          {t('unilist.location')}
        </label>
        <div className="space-y-2">
          {["Almaty", "Astana", "Shymkent"].map(city => (
            <Label key={city} className="flex items-center gap-3 cursor-pointer group">
              <Checkbox 
                checked={selectedCities.includes(city)}
                onCheckedChange={() => toggleCity(city)}
              />
              <span className="group-hover:text-secondary transition-colors text-sm">
                {city}
              </span>
            </Label>
          ))}
        </div>
      </div>

      {/* Tuition Range */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-3 uppercase tracking-wider">
          {t('unilist.priceLow').split(':')[0]} (USD/{t('unis.from').toLowerCase()})
        </label>
        <Slider
          value={tuitionRange}
          onValueChange={setTuitionRange}
          min={1000}
          max={5000}
          step={200}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-xs font-medium text-muted-foreground">
          <span>${formatPrice(tuitionRange[0])}</span>
          <span>${formatPrice(tuitionRange[1])}+</span>
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3 pt-2">
        <Label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium">{t('unilist.topRated')}</span>
          <Switch checked={topRatedOnly} onCheckedChange={setTopRatedOnly} />
        </Label>
      </div>
    </div>
  )
}
