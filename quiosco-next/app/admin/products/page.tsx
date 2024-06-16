import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productsCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  return await prisma.product.findMany({
    take: pageSize,
    skip: skip,
    include: {
      category: true
    }
  })
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams} : {searchParams: {page: string}}) {

    const page = +searchParams.page || 1
    const pageSize = 10

    if (page < 0)
      redirect("/admin/products")

    const productsData = getProducts(page, pageSize)
    const totalProductsData = productsCount()
    //Como son independientes, podemos hacer que empiecen a la vez
    const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)

    //Por si se modifica la url
    if (page > totalPages)
      redirect("/admin/products")

    return (
      <>
        <Heading>
          Administrar productos
        </Heading>

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
          <Link
            href={"/admin/products/new"}
            className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer">
          Crear producto
          </Link>

          <ProductSearchForm />
        </div>

        <ProductsTable 
        products={products}
        />

        <ProductsPagination 
        page={page}
        totalPages={totalPages}
        />
      </>
    )
  }
  