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
  console.log(products);
  
  return (
    <div>OrderPage</div>
  )
}
