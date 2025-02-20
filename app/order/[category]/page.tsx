import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

async function getProducts(category: string) {
  const response = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return response
}

export default async function OrderPage({ params }: { params: { category: string } }) {
  const { category } = await params
  const products = await getProducts(category)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
