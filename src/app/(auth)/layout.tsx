
import Link from "next/link";
//import { siteConfig } from "@/config/site"
//import { Icons } from "@/components/icons"
import Image from "next/image"

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Link
                aria-label="Home"
                href="/"
                className="sticky top-0 z-50 border-b bg-background h-16 mx-8 items-center hidden space-x-2 lg:flex"
            >
                <Image 
                    className="mask w-28 py-2" 
                    src="/logo.png" 
                    alt="TUKDO Logo"
                    width={1400}
                    height={400}
                />
            </Link>
            <div>
            {children}
            </div>
        </div>
    );
}
 
export default AuthLayout;