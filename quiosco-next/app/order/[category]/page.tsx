import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })

  return products
}

export default async function orderPage({params} : { params : { category : string}}) {

  const products = await getProducts(params.category)

  return (
    <>
    <Heading>Crear pedido</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-start">
        {products.map(p => (
          <ProductCard
          key={p.id}
          product={p}
          />
        ))}
      </div>
    </>
  )
}
