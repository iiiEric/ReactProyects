"use client"

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

  const order = useStore( (state) => state.order)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
  const clearOrder = useStore( (state) => state.clearOrder)

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total: total,
      order
    }
    const response = await createOrder(data)
    if (response?.errors){
      response.errors.forEach((issue) => {
        toast.error(issue.message)
      })
      return
    }

    toast.success('Pedido realizado')
    clearOrder()
  }

  return (
    <>
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
    <h1 className="text-4xl text-center font-black">Pedido</h1>

    {order.length === 0 ? <p className="text-center my-10">El carrito está vacío</p> : (
      <div className="mt-5">
        {order.map(o => (
          <ProductDetails 
            key={o.id}
            item={o}
          />
        ))}

        <p className="text-2xl mt-20 text-center">
          Total a pagar: {''}
          <span className="font-bold">{total}</span>
        </p>

        <form
          className="w-full mt-10 space-y-5"
          action={handleCreateOrder}
        >
          <input 
            type="text"
            placeholder="Nombre cliente"
            className="bg-white border border-gray-100 p-2 w-full"
            name="name"
          />

          <input
            type="submit"
            className="py-2 rounded uppercase text-white font-bold bg-black w-full text-center cursor-pointer"
            value="confirmar pedido">
          </input>
        </form>
      </div>
    )}
    </aside>
    </>
  )
}
