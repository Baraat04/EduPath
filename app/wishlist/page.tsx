"use client"

import { useWishlist } from "@/lib/wishlist-context"
import { useLang } from "@/lib/lang-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingBag, Trash2, ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/fade-in"

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist()
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-headline text-foreground">
                  {t('wishlist.title')}
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  {items.length === 0
                    ? t('wishlist.empty')
                    : `${items.length} universit${items.length === 1 ? "y" : "ies"} saved`}
                </p>
              </div>
              {items.length > 0 && (
                <button
                  onClick={clear}
                  className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 size={15} />
                  {t('wishlist.clearAll')}
                </button>
              )}
            </div>
          </FadeIn>

          {items.length === 0 ? (
            <FadeIn delay={80}>
              <div className="text-center py-24">
                <ShoppingBag size={48} className="mx-auto mb-4 text-muted-foreground/40" />
                <h2 className="text-xl font-bold text-foreground mb-2">{t('wishlist.empty')}</h2>
                <p className="text-muted-foreground mb-8 text-sm">
                  {t('wishlist.emptyDesc')}
                </p>
                <Link href="/universities">
                  <Button className="bg-secondary text-secondary-foreground">
                    {t('wishlist.browse')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {items.map((item, i) => (
                  <FadeIn key={item.id} delay={i * 50}>
                    <Card className="flex items-center gap-4 p-4 hover:shadow-md transition-shadow border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-sm sm:text-base leading-tight truncate">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                          <MapPin size={12} />
                          {item.location}, Kazakhstan
                        </div>
                        <p className="text-secondary font-bold text-sm mt-1">{item.price}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                        <Link href={`/universities/${item.id}`}>
                          <Button size="sm" variant="outline" className="text-xs">
                            {t('wishlist.view')}
                          </Button>
                        </Link>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </Card>
                  </FadeIn>
                ))}
              </div>

              <FadeIn delay={200}>
                <Card className="p-6 bg-secondary/5 border-secondary/20 text-center">
                  <h3 className="font-bold text-foreground mb-2">{t('wishlist.readyTitle')}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t('wishlist.readyDesc')}
                  </p>
                  <Link href="/contact">
                    <Button className="bg-secondary text-secondary-foreground">
                      {t('wishlist.applyBtn')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </Card>
              </FadeIn>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
