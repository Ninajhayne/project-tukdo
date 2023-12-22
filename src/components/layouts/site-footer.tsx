import Link from "next/link"

import { siteConfig } from "@/config/site"
//import { cn } from "@/lib/utils"
import { Button, /*buttonVariants*/ } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/layouts/theme-toggle"
import { Shell } from "@/components/shells/shell"
import { Input } from "@/components/ui/input"
import Image from "next/image"

import { PaperPlaneIcon } from "@radix-ui/react-icons"

export function SiteFooter() {
    return (
        <footer className="w-full border-t bg-[#00538ae2]">
            <Shell as="div">
                <section
                    id="footer-content"
                    aria-labelledby="footer-content-heading"
                    className="flex flex-col gap-10 lg:flex-row lg:gap-20"
                >
                    <section
                        id="footer-branding"
                        aria-labelledby="footer-branding-heading"
                        className="flex-1"
                    >
                        <Link
                            aria-label="Home"
                            href="/"
                            className="flex items-center space-x-2"
                        >
                            <Image 
                                className="mask w-28 py-2" 
                                src="/logo.png" 
                                alt="TUKDO Logo"
                                width={1400}
                                height={400}
                            />   
                        </Link>
                        <p className="text-sm text-[#ffffffd4] text-justify">TUKDO, a web-based e-Learning Community Platform that will establish paid and free tutoring services on the cloud while maintaining a learner-tutor connection through an effective e-Learning presence.</p>
                    </section>
                    <section
                        id="footer-links"
                        aria-labelledby="footer-links-heading"
                        className="grid text-center flex-1 grid-cols-2 gap-10 xs:grid-cols-2 sm:grid-cols-2"
                    >
                        {siteConfig.footerNav.map((item) => (
                            <div key={item.title} className="space-y-3">
                                <h4 className="text-base text-[#FFFFFF] font-semibold">{item.title}</h4>
                                <ul className="space-y-3">
                                    {item.items.map((link) => (
                                        <li key={link.title}>
                                            <Link
                                                href={link.href}
                                                target={link?.external ? "_blank" : undefined}
                                                rel={link?.external ? "noreferrer" : undefined}
                                                className="truncate text-sm text-[#ffffffd4] hover:text-[#ffffff] transition-colors"
                                            >
                                                {link.title}
                                                <span className="sr-only">{link.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                    <section
                        id="become-a-sponsor"
                        aria-labelledby="become-a-sponsor-heading"
                        className="flex-1 space-y-3"
                    >
                        
                        <h4 className="text-base font-semibold text-[#FFFFFF]">
                            Become a sponsor
                        </h4>
                        {/*
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input
                                placeholder="tukdo@gmail.com"
                                className="pr-12"
                            />
                            
                            <Button
                                className="absolute right-7 z-20 h-7 w-7"
                                size="icon"
                            >
                                <PaperPlaneIcon className="h-3 w-3" aria-hidden="true" />
                                <span className="sr-only">Become a sponsor</span>
                            </Button>
                        </div>
                        */}
                        
                        <div className="grid w-full relative space-x-2">
                            <Input
                                placeholder="tukdo@gmail.com"
                                className="pr-12 text-sm text-[#09090b] bg-[#ffffff] pl-2"
                            />
                            <Button
                                className="absolute right-[4px] top-[4px] z-20 h-7 w-7 text-[#ffffff]"
                                size="icon"
                            >
                                <PaperPlaneIcon className="h-3 w-3" aria-hidden="true" />
                                <span className="sr-only">Join newsletter</span>
                            </Button>
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-base font-medium text-[#FFFFFF]">
                                Sponsored by
                            </h4>
                            <div className="font-bold flex space-x-1 text-lg">
                                <p className="text-blue-400">BICOL</p>
                                <p className="text-orange-400">UNIVERSITY</p>
                            </div>
                        </div>
                        
                    </section>
                </section>
                <section
                    id="footer-bottom"
                    aria-labelledby="footer-bottom-heading"
                    className="flex items-center space-x-4"
                >
                    <div className="flex-1 text-center text-sm leading-loose text-[#ffffffd4]">
                        © 2023{" "}
                        <span
                        className="font-semibold transition-colors hover:text-foreground"
                        >
                        TUKDO.{" "}
                        </span>
                        All right reserved.
                    </div>
                    <div className="flex items-center space-x-1">
                        <ThemeToggle />
                    </div>
                </section>
            </Shell>
        </footer>
    )
}

/*
{siteConfig.footerNav.map((item) => (
    <div key={item.title} className="space-y-3">
    <h4 className="text-base font-medium">{item.title}</h4>
    <ul className="space-y-3">
        {item.items.map((link) => (
        <li key={link.title}>
            <Link
            href={link.href}
            target={link?.external ? "_blank" : undefined}
            rel={link?.external ? "noreferrer" : undefined}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
            {link.title}
            <span className="sr-only">{link.title}</span>
            </Link>
        </li>
        ))}
    </ul>
    </div>
))}
*/
