"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const { data: session } = useSession();


  const router = useRouter();


  useEffect(() => {
    
    if (session) {

      router.push("/Chat")
  
    }

  }, [session])
  

  



  return (
    <>
      <div className="bg-emerald-800 min-h-screen flex justify-center items-center px-4">
        <div className="bg-emerald-950 w-full max-w-lg md:max-w-2xl lg:max-w-4xl rounded-xl shadow-lg p-8">
          {/* Logo Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <img src="/logo.png" className="w-28 md:w-36" alt="ChatTrix Logo" />
            <h1 className="text-white font-bold text-3xl md:text-5xl">ChatTrix</h1>
          </div>

          {/* Form Section */}
          <div className="flex justify-center">
            <form className="flex flex-col w-full max-w-sm gap-6">


              <button onClick={(e) =>
             { e.preventDefault();
              signIn("google")}} type="button"

                className="bg-blue-700 text-white p-3 flex items-center gap-4 justify-center rounded-lg hover:bg-blue-800 w-full transition-all duration-200">
                <span><img src="/google.svg" width={35} alt="" /></span>  Sign in with Google  
              </button>

            </form>
          </div>
        </div>
      </div>


    </>
  );
}
