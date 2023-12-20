import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Icons } from "@/components/icons"


export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
        <div className="grid min-h-screen grid-cols-1 overflow-hidden md:grid-cols-3 lg:grid-cols-2">
            <AspectRatio ratio={16 / 9}>
                <Image
                    src="/images/layouts/annie-spratt-YGBaA4UdoLY-unsplash.webp"
                    alt="Tree"
                    fill
                    className="absolute inset-0 object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 md:to-background/40" />
                <Link
                    href="/"
                    className="absolute left-12 top-6 z-20 flex items-center text-lg font-bold"
                >
                    <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
                    <span>{siteConfig.name}</span>
                </Link>
                <div className="absolute bottom-6 left-12 z-20 line-clamp-1 text-xs">
                    Photo by{" "}
                    <Link
                        href="https://unsplash.com/ja/@pixelperfektion?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                        className="hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Annie Spratt
                    </Link>
                    {" on "}
                    <a
                        href="https://unsplash.com/photos/shallow-focus-photo-of-pink-flowers-YGBaA4UdoLY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        Unsplash
                    </a>
                </div>
            </AspectRatio>
            <main className="justify-center container absolute top-1/2 col-span-1 flex -translate-y-1/2 items-center md:static md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
                {children}
            </main>
        </div>
    )
}
