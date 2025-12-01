import Sidebar from "../components/Sidebar";

export default async function InventoryPage() {
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
        </main>
    </div>
}