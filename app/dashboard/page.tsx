import { TrendingUp } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { getCurrentUser } from "../lib/auth";
import { prisma } from "../lib/prisma";
import ProductsChart from "../components/product-charts";

export default async function DashboardPage() {

    const user = await getCurrentUser();

    const [totalProducts, lowStock, allProducts] = await Promise.all([
        prisma.product.count({
        where: { userId: user.id }
    }), 
     prisma.product.count({
        where: {
            userId: user.id,
            lowStockAt: {not: 0}, 
            quantity: { lte: 5}
        }
    }),
     prisma.product.findMany(
        {
            where: { userId: user.id },
            select: {price: true, quantity: true, createdAt: true}
        }
    )
    ])
    
    const recent = await prisma.product.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5
    })


    const totalValue = allProducts.reduce(
        (sum, product) => sum + Number(product.price) * product.quantity, 0
    );


    const inStockCount = allProducts.filter(product => product.quantity >= 5).length;
    const lowStockCount = allProducts.filter(product => product.quantity > 0 && product.quantity <= 5).length;
    const outOfStockCount = allProducts.filter(product => product.quantity === 0).length;
    const inStockPercentage =  totalProducts > 0 ? Math.round((inStockCount / totalProducts) * 100) : 0;

    const now = new Date();
    const weeklyProductsData = [];

    for (let i = 11; i >= 0; i--) {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - (i * 7));
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekStart.setHours(23, 59, 59, 999);
        
        const weekLabel = `${String(weekStart.getMonth() + 1).padStart(
            2, 
            '0')}/${String(weekStart.getDate() + 1).padStart(2, '0')}`;
        
            const weekProducts = allProducts.filter(product =>{
            const productDate = new Date(product.createdAt);
            return productDate >= weekStart && productDate <= weekEnd;
        })

        weeklyProductsData.push({
            week: weekLabel,
            products: weekProducts.length
        });
    }

    return (
        <div className="min-h-screen bg-gray-50"> 
            <Sidebar currentPath="/dashboard" />

            <main className="ml-64 p-8">
                {/* Header goes here */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div >
                            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500">Welcome back! Here is the overview of your inventory</p>
                        </div>
                    </div>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6"> Key Metrics</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
                                <div className="text-sm text-gray-600">Total Products</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{totalProducts}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div> 
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">${Number(totalValue).toFixed(0)}</div>
                                <div className="text-sm text-gray-600">Total Value</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+${Number(totalValue).toFixed(0)}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div> 
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">{lowStock}</div>
                                <div className="text-sm text-gray-600">Low Stock</div>
                                <div className="flex items-center justify-center mt-1">
                                    <span className="text-xs text-green-600">+{lowStock}</span>
                                    <TrendingUp className="w-3 h-3 text-green-600 ml-1"/>
                                </div> 
                            </div>
                        </div>
                    </div>

                    {/* Placeholder for New Products per week */}

                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">New Products Per Week</h2>
                        </div>
                        <div className="h-48">
                            <ProductsChart data={weeklyProductsData} />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Stock Levels</h2>
                        </div>
                        <div className="space-y-3">
                            {
                                recent.map((product, key) => {
                                    const stockLevel = product.quantity === 0 
                                    ? 0 
                                    : product.quantity <= (product.lowStockAt || 5)
                                    ? 1 
                                    : 2;
                                    
                                    const bgColors = ["bg-red-600", "bg-yellow-600", "bg-green-600"]
                                    const textColors = ["text-red-600", "text-yellow-600", "text-green-600"]

                                    return <div className="flex justify-between bg-gray-50 rounded-lg p-2" key={key}>
                                       <div className="flex items-center gap-3">
                                        <div className={`w-3 h-3 rounded-full ${bgColors[stockLevel]}`}/>
                                         <span className="text-gray-800">{product.name}</span>
                                        </div> 
                                        <div className={`${textColors[stockLevel]}`}>
                                            {product.quantity} units
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>

                        {/* Efficiency card goes here */}
                       <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-6">Efficiency</h2>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="relative w-48 h-48">
                                    <div className="absolute inset-0 rounded-full border-8 border-gray-200"/>
                                    <div className="absolute inset-0 rounded-full border-8 border-purple-600"
                                        style={{
                                            clipPath: "polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)",
                                        }}
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-gray-900">{inStockPercentage}%</div>
                                            <div className="text-sm text-gray-600">In Stock</div>
                                        </div>
                                    </div>
                                </div>  
                            </div>

                            <div className="mt-6 space-y-2">
                                <div className="flex flex-col items-start text-sm text-gray-600 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-600 rounded-full"/>
                                        <span>In Stock ({inStockCount})</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-purple-300 rounded-full"/>
                                        <span>Low Stock ({lowStock})</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 bg-red-200 rounded-full"/>
                                        <span>Out of Stock ({outOfStockCount})</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    <div>
                    </div>

                </div>
                

            </main>
        </div>
    )
}