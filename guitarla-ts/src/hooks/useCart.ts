import { useState, useEffect, useMemo } from 'react'
import { db } from '../data/db'
import type { TGuitar, TCartItem } from '../types'

export const useCart = () => {

    const initialCart = () :TCartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }

    //const [data, setData] = useState(db)
    //Como no usamos setData, podemos borrarlo
    const [data] = useState(db)
    const [cart, setCart] = useState(initialCart)

    const MIN_ITEMS = 1
    const MAX_ITEMS = 5

    //Cada vez que se actualice cart
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart)) //Se guardan solo string, por eso el JSON
    }, [cart])

    function addToCart(item : TGuitar) {
        const itemExists = cart.findIndex((it) => it.id === item.id)
        if (itemExists >= 0) {
            if (cart[itemExists].quantity === MAX_ITEMS) return
            //el state (cart) es inmutable. se debe crear copia y utilizar su función de set
            const updatedCart = [...cart]
            updatedCart[itemExists].quantity++
            setCart(updatedCart)
        }
        else {
            const newItem : TCartItem = {...item, quantity : 1}
            setCart([...cart, newItem])
        }

    }

    function decreaseQuantity(id : TGuitar['id']) {
        const updatedCart = cart.map(it => {
            if (it.id === id && it.quantity > MIN_ITEMS) {
                return {
                    ...it,
                    quantity: it.quantity - 1
                }
            }
            return it
        })
        setCart(updatedCart)
    }

    function increaseQuantity(id : TGuitar['id']) {
        const updatedCart = cart.map(it => {
            if (it.id === id && it.quantity < MAX_ITEMS) {
                return {
                    ...it,
                    quantity: it.quantity + 1
                }
            }
            return it
        })
        setCart(updatedCart)
    }

    function removeFromCart(id : TGuitar['id']) {
        setCart(prevCart => prevCart.filter(it => it.id !== id))
    }

    function clearCart() {
        setCart([])
    }

    const cartIsEmpty = useMemo(() => cart.length === 0, [cart]) //[cart] --> que se calcule cuando cart cambie, para eso sirve useMEMO
    const cartTotalPrice = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data, 
        cart, 
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        removeFromCart,
        clearCart,
        cartIsEmpty,
        cartTotalPrice
    }
}