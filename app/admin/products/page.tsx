import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/src/lib/prisma";
import ProductPagination from "@/components/products/ProductPagination";
import ProductTable from "@/components/products/ProductTable";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import Heading from "@/components/ui/Heading";

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

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >Crear Producto</Link>

        <ProductSearchForm />
      </div>

      <ProductTable products={products} />

      <ProductPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
