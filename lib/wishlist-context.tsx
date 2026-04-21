"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type WishlistItem = {
  id: string | number
  name: string
  location: string
  price: string
  image: string
}

type WishlistContextType = {
  items: WishlistItem[]
  add: (item: WishlistItem) => void
  remove: (id: string | number) => void
  has: (id: string | number) => boolean
  clear: () => void
}

const WishlistContext = createContext<WishlistContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  has: () => false,
  clear: () => {},
})

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])

  const add = (item: WishlistItem) => {
    setItems((prev) => prev.find((i) => String(i.id) === String(item.id)) ? prev : [...prev, item])
  }

  const remove = (id: string | number) => {
    setItems((prev) => prev.filter((i) => String(i.id) !== String(id)))
  }

  const has = (id: string | number) => items.some((i) => String(i.id) === String(id))

  const clear = () => setItems([])

  return (
    <WishlistContext.Provider value={{ items, add, remove, has, clear }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
