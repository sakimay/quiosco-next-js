"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"

export default function ProductSearchForm() {

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }
        const result = SearchSchema.safeParse(data)
        
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        redirect(`/admin/products?search=${result.data.search}`)
    }

    return (
        <form action={handleSearchForm} className="flex items-center">
            <input
                type="text"
                placeholder="Buscar Producto"
                className="p-2 placeholder-gray-400 w-full"
                name="search"
            />

            <input type="submit" value="Buscar"
                className="bg-indigo-600 p-2 text-white cursor-pointer" />

        </form>
    )
}
