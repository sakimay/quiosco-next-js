"use client";
import { ProductSchema } from "@/src/schema";
import ProductForm from "./ProductForm";
import { toast } from "react-toastify";

export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
        }
        const result = ProductSchema.safeParse(data)

        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        console.log('desde handleSubmit');

    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action={handleSubmit}
                className="space-y-5">

                {children}
                <input type="submit" value="Registrar Producto" className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 cursor-pointer" />

            </form>

        </div>
    )
}
