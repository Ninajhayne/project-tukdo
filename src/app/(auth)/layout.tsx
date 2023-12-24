
import Link from "next/link";
//import { siteConfig } from "@/config/site"
//import { Icons } from "@/components/icons"
import Image from "next/image"

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="h-full flex items-center justify-center">
            <Link
                href="/"
                className="space-x-2 absolute p-4 top-0 left-0 z-20 flex items-center text-lg font-bold tracking-tight"
            >
                <Image 
                    className="mask w-28 py-2" 
                    src="/logo.png" 
                    alt="TUKDO Logo"
                    width={1400}
                    height={400}
                />
            </Link>
            {children}
        </div>
        
    );
}
 
export default AuthLayout;