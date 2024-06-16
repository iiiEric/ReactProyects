import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product) => {
       
        const {categoryId, image, ...dataNecessary} = product 
        let order : OrderItem[] = []
        if(get().order.find( items => items.id === dataNecessary.id)) {
            order = get().order.map( item => item.id === dataNecessary.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }
        else {
            order = [...get().order, {
                ...dataNecessary,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }

        set ((state) => ({
            order
        }))
    },
    increaseQuantity: (id) => {
        set ((state) => ({
            order: state.order.map( item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },
    decreaseQuantity: (id) => {
        const order = get().order.map( item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set (() => ({
            order
        }))
    },
    removeItem: (id) => {
        const order = get().order.filter( item => item.id !== id)

        set (() => ({
            order
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))