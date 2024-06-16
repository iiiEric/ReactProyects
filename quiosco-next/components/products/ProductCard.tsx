import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({product} : ProductCardProps) {

  const imagePath = getImagePath(product.image)

  return (
    <div className="border bg-white">

        <Image
        alt={`Imagen producto ${product.name}`}
        src={imagePath}
        width={400}
        height={500}
        quality={75}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-2xl text-amber-500 font-black mt-5">{formatCurrency(product.price)}</p>
            <AddProductButton 
            product={product}/>
        </div>
    </div>
  )
}
