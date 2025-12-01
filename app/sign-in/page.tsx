import { SignIn } from "@stackframe/stack";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-50 to-purple-100">
            <div>
              <SignIn />
              <Link href="/" className="mt-4 block text-center text-purple-700 hover:underline">
                Back to Home
              </Link>
            </div>
        </div>
    );
}