import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-50 to-purple-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Next Level Inventory Management System</h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Streamline your inventory tracking with our poserful, 
          easy-to-use management system. Track products, 
          monitor stocks, and gain valuable insights.</p>
      
        <div className="flex gap-2 justify-center mt-8">
          <Link href="/sign-in" className="bg-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-800 transition-colors text-white"> Sign In</Link>
          <Link href="#" className="bg-white px-4 py-2 rounded-lg font-semibold border-2 hover:bg-purple-800 hover:text-white transition-colors text-purple-700"> Learn More</Link>
        </div>
        
      </div>
    </div>
  );
}
