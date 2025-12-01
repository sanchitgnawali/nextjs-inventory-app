import Link from "next/link";
import Sidebar from "../components/Sidebar";
import { getCurrentUser } from "../lib/auth";
import { createProduct } from "../lib/actions/products";

export default async function addPrduct() {

    const user = await getCurrentUser();
    return <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/add-product"/>
    
        <main className="ml-64 p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Add Product</h1>
                        <p className="text-sm text-gray-500">
                            Add a new product to your inventory</p>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl">
                <div className="bg-white rounded-lg border border-gray-200 p-6">

                    <form action={createProduct} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium texst-gray-700 mb-2">
                                Product Name*
                            </label>
                            <input type="text" 
                            id="name" 
                            name="name" 
                            required 
                            placeholder="Enter Product Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium texst-gray-700 mb-2">
                                    Quantity*
                                </label>
                                <input type="number" 
                                id="quantity" 
                                name="quantity"
                                step="1"
                                min="0"
                                required 
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium texst-gray-700 mb-2">
                                    Price*
                                </label>
                                <input type="number" 
                                id="price" 
                                name="price" 
                                step="0.01" 
                                min="0"
                                required 
                                placeholder="0.00"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                            </div>
                        </div>

                        <div>
                                <label htmlFor="price" className="block text-sm font-medium texst-gray-700 mb-2">
                                    SKU (Optional)
                                </label>
                                <input type="text" 
                                id="sku" 
                                name="sku" 
                                placeholder="Enter SKU"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                        </div>
                        <div>
                                <label htmlFor="price" className="block text-sm font-medium texst-gray-700 mb-2">
                                    Low Stock At (Optional)
                                </label>
                                <input type="number" 
                                id="price" 
                                name="lowStockAt" 
                                step="1" 
                                min="0"
                                required 
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-transparent"/>
                        </div>

                        <div className="flex gap-5">
                            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            type="submit">
                                Add Product
                            </button>
                            <Link href="/invetory" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
                                Cancel
                            </Link>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    </div>
}