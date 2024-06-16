import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTerm: string){
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive" //May o Min. todavía no hay para acentos
            }
        },
        include:{
            category: true
        }
    })
    return products
}

export default async function SearchpPage({searchParams} : {searchParams: {search: string}}) {

    const products = await searchProducts(searchParams.search)

  return (
    <>
        <Heading>Resultados de búsqueda: {searchParams.search}</Heading>

        <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
          <ProductSearchForm />
        </div>

        {products.length ? (
            <ProductsTable 
                products = {products}
            />
        ) : <p className="text-center text-lg">Sin resultados</p>}

       
    </>
  )
}
