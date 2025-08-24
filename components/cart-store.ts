'use client'
import { create } from 'zustand'

type CartItem = { id: string; title: string; price: number; qty: number; slug?: string }
type CartState = {
  items: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  clear: () => void
}

export const useCart = create<CartState>((set) => ({
  items: [],
  add: (item) => set((s) => {
    const existing = s.items.find(i => i.id === item.id)
    if (existing) {
      return { items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i) }
    }
    return { items: [...s.items, item] }
  }),
  remove: (id) => set((s) => ({ items: s.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] })
}))
