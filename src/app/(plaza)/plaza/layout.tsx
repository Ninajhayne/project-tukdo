import { NavigationSideBar } from "@/components/navigation/navigation-sidebar";
import { SocketProvider } from "@/components/providers/socket-provider";
import { cn } from "@/lib/utils";

import { Open_Sans } from 'next/font/google'
import { type Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Messages | TUKDO",
    description: "Manage your classroom",
}

const font = Open_Sans({ subsets: ['latin'] });


const PlazaMainLayout = async ({
    children
} : {
    children: React.ReactNode
}) => {
    return (
        <SocketProvider>
            <div 
                //className="h-full bg-white dark:bg-[#313338]"
                className={cn (
                    font.className,
                    "h-full bg-white dark:bg-[#313338]"
                )}
            >
                <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
                    <NavigationSideBar />
                </div>
                <main
                    /* 
                    className={cn (
                        //font.className,
                        "md:pl-[72px] h-full"
                    )}
                    */
                    className="md:pl-[72px] h-full"
                >
                    {children}
                </main>
            </div>
        </SocketProvider>

    );
}
 
export default PlazaMainLayout;

//<main className="md:pl-[72px] h-full">{children}</main>