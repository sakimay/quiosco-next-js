import { create } from 'zustand'
import { OrderItem } from './types'
import { Product } from '@prisma/client'

type Store = {
    order: OrderItem[]
    addToCart: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToCart: (product) => {

        const { categoryId, image, ...data } = product

        let order: OrderItem[] = []

        if (get().order.find(item => item.id === data.id)) {
            order = get().order.map(item => item.id === data.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * product.price
            } : item)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set(() => ({
            order
        }))


    },
    increaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: (item.quantity + 1) * item.price
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: (item.quantity - 1) * item.price
            } : item)
        }))
    },
    removeItem: (id) => {
        set((state) => ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
    clearOrder: () => set(() => ({ order: [] }))
})) 