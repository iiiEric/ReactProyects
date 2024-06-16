"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function completeOrder(formData: FormData){

    const data = {
        orderId : formData.get('order_id')
    }

    const result = OrderIdSchema.safeParse(data)
    if (result.success){
        try {
            await prisma.order.update({
                where: {
                    id: result.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAT: new Date(Date.now())
                }
            })
        } catch (error) {
            console.log(error)
        }

        revalidatePath('/admin/orders')
    }
}