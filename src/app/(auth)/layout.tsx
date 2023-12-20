
import Link from "next/link";
import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className="h-full flex items-center justify-center">
            <Link
                href="/"
                className="space-x-2 absolute p-4 top-0 left-0 z-20 flex items-center text-lg font-bold tracking-tight"
            >
                <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
                <span>{siteConfig.name}</span>
            </Link>
            {children}
        </div>
    );
}
 
export default AuthLayout;