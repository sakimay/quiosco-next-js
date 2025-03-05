import { redirect } from "next/navigation";
import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {

  const page = parseInt(searchParams.page) || 1
  const pageSize = 10

  if (page < 1) redirect(`/admin/products`)

  const productsData = getProducts(page, pageSize)
  const totalproductsData = productCount()
  const [products, totalproducts] = await Promise.all([productsData, totalproductsData])

  const totalPages = Math.ceil((totalproducts as number) / pageSize)
  
  if (page > totalPages) redirect(`/admin/products`)

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <ProductTable products={products} />

      <ProductPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
