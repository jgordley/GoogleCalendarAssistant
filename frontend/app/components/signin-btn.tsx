"use client";
import { signIn, signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";

export default function SignInButton() {

    const { status, data:session } = useSession();

    return (
        <div className="flex items-center">

            {status === "authenticated" ? (
                <button onClick={() => signOut()} className="text-lg flex items-center bg-white text-gray-900 p-2 rounded-md">
                    <img src={session?.user?.image || "google.svg"} alt="profile" className="w-6 h-6 mr-2 rounded-full"></img> Logout
                </button>
            ) : (
                <button onClick={() => signIn("google", { callbackUrl: '/chat' })} className="text-lg flex items-center bg-white text-gray-900 p-2 rounded-md">
                    <img src="google.svg" alt="Google Login" className="w-4 h-4 mr-2"></img> Login
                </button>
            )}
        </div>
    )
}