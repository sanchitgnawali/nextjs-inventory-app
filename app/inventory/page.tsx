import { get } from "http";
import Sidebar from "../components/Sidebar";
import { getCurrentUser } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { deleteProduct } from "../lib/actions/products";
import Pagination from "../components/pagination";

export default async function InventoryPage({searchParams

} : {searchParams: Promise<{search? : string, page? : string}>}) {

    const user = await getCurrentUser();
    const userId = user.id;

    const params = await searchParams;
    const search = (params.search ?? "").trim();

    const pageSize = 5;
    const currentPage = Math.max(1, Number(params.page ?? "1"));

    const where = {
            userId,
           ...(search ? {name: {contains: search, mode: "insensitive" as const}} : {})
        }
    
    const [totalCount, items] = await Promise.all([
        prisma.product.count({where}),
        prisma.product.findMany({
            where,
            orderBy: {createdAt: "desc"},
            skip: (currentPage -1) * pageSize,
            take: pageSize
        })
    ])
 
     const totalPages = Math.max(1,Math.ceil(totalCount / pageSize));


    return <div className="min-h-screen bg-gray-50">
        <Sidebar currentPath="/inventory"/>

        <main className="ml-64 p-8">
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">Inventory</h1>
                        <p className="text-sm text-gray-500">
                            Manage your products and track inventory levels</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <form className="flex gap-2" action="/inventory" method="GET">
                        <input type="text" name="search" placeholder="Search products..." className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                        <button type="submit"   className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">Search</button>
                    </form>
                </div>

                {/* Inventory table goes here */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="table-head">Name</th>
                                <th className="table-head">SKU</th>
                                <th className="table-head">Price</th>
                                <th className="table-head">Quantity</th>
                                <th className="table-head">Low Stock At</th>
                                <th className="table-head">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {
                                items.map((product, key) =>(
                                    <tr key ={key} className="hover:bg-gray-50 table-row">
                                        <td>
                                            {product.name}
                                        </td>
                                        <td>
                                            {product.sku || "-"}
                                        </td>
                                        <td>
                                            {Number(product.price).toFixed(2)}
                                        </td>
                                        <td >
                                            {product.quantity}
                                        </td>
                                        <td >
                                            {product.lowStockAt || "-"}
                                        </td>
                                        <td>
                                            <form action={async (formData : FormData) => {
                                                "use server";
                                                await deleteProduct(formData);
                                            }}>
                                                <input type="hidden" name="id" value={product.id}/>
                                                <button className="text-red-600 hover:text-red-900 text-sm">Delete</button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                {/* Pagination controls can be added here in the future */}
                {totalPages > 1 && <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <Pagination currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/inventory"
                    searchParams={{search,
                        pageSize: String(pageSize)
                    }} />    
                </div>}
            </div>
        </main>
    </div>
}