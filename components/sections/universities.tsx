"use client"

import { useState, useEffect } from "react"
import { Star, ChevronRight, MapPin, ShoppingBag, Check, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useWishlist } from "@/lib/wishlist-context"
import { useLang } from "@/lib/lang-context"
import { getUniversitiesFromSupabase, type UniversityData } from "@/lib/universities-supabase"

function WishlistButton({ uni, name, location, tuition, image }: { 
  uni: UniversityData
  name: string
  location: string
  tuition: string
  image: string
}) {
  const { add, remove, has } = useWishlist()
  const inWishlist = has(uni.id)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (inWishlist) {
      remove(uni.id)
    } else {
      add({ id: uni.id, name, location, price: tuition, image })
    }
  }

  return (
    <button
      onClick={handleClick}
      title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-2 rounded-full border-2 transition-all ${
        inWishlist
          ? "bg-secondary border-secondary text-secondary-foreground"
          : "border-border text-muted-foreground hover:border-secondary hover:text-secondary"
      }`}
    >
      {inWishlist ? <Check size={16} /> : <ShoppingBag size={16} />}
    </button>
  )
}

interface UniversityCardProps {
  university: UniversityData
}

function UniversityCard({ university }: UniversityCardProps) {
  const router = useRouter()
  const { t, lang } = useLang()
  const trans = university.translations[lang]
  
  return (
    <div
      className="group cursor-pointer"
      onClick={() => router.push(`/universities/${university.id}`)}
    >
      <div className="relative h-[280px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden mb-4 md:mb-6 editorial-shadow">
        {university.image ? (
          <img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt={`${trans.name} campus`}
            src={university.image}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Building2 className="w-16 h-16 text-muted-foreground" />
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
          <Star className="text-amber-500 fill-amber-500" size={16} />
          {university.rating}
        </div>

        {/* Top Pick Badge */}
        {university.rating >= 4.7 && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold">
              {t("unis.topPick")}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="font-headline text-lg sm:text-xl md:text-2xl font-bold group-hover:text-secondary transition-colors leading-tight">
          {trans.name || 'Untitled University'}
        </h3>
        <WishlistButton 
          uni={university} 
          name={trans.name}
          location={trans.location}
          tuition={trans.tuition}
          image={university.image}
        />
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
        <MapPin size={14} />
        <span>{trans.location || 'No location'}</span>
        {trans.ranking && (
          <>
            <span className="mx-1">•</span>
            <span>{trans.ranking}</span>
          </>
        )}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <span className="text-muted-foreground text-sm">{t("unis.from")}</span>
        <span className="text-lg sm:text-xl font-black text-foreground">{trans.tuition || '—'}</span>
      </div>
    </div>
  )
}

export function Universities() {
  const { t } = useLang()
  const [universities, setUniversities] = useState<UniversityData[]>([])
  
  useEffect(() => {
    async function loadData() {
      const allUniversities = await getUniversitiesFromSupabase()
      // Show top 3 universities sorted by rating
      const featured = [...allUniversities]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
      setUniversities(featured)
    }
    loadData()
  }, [])

  return (
    <section className="py-16 md:py-32 bg-card">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-6">
          <div>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-4">
              {t("unis.title")}
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base">
              {t("unis.subtitle")}
            </p>
          </div>
          <Link href="/universities">
            <Button variant="ghost" className="hidden md:flex items-center gap-2 font-bold text-secondary hover:text-secondary/80">
              {t("unis.viewAll")}
              <ChevronRight size={20} />
            </Button>
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {universities.map((uni) => (
            <UniversityCard key={uni.id} university={uni} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link href="/universities">
            <Button variant="outline" className="w-full">
              {t("unis.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
