import './globals.css'

import type { Metadata, Viewport } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"

//import { Open_Sans } from 'next/font/google'
//import { Inter } from 'next/font/google'
//import { GeistSans, GeistMono } from 'geist/font'
//import { Nunito } from 'next/font/google'
import { fontHeading, fontMono, fontSans } from "@/lib/fonts"

import { siteConfig } from "@/config/site"
import { cn } from '@/lib/utils'

import { ClerkProvider } from '@clerk/nextjs'

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from './api/uploadthing/core';

import { Analytics } from '@/components/analytics';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from "@/components/ui/toaster";
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { TailwindIndicator } from '@/components/tailwind-indicator';

//const font = Open_Sans({ subsets: ['latin'] })
//const font = Inter({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });
//const font = GeistSans;
//const font = Nunito({ subsets: ['latin'], display: 'swap', adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Online Learning",
    "Teaching Platform",
    "Education",
    "Marketplace",
    "Online Courses",
    "Courses",
    "Mentors",
    "Free Courses",
    "Teach Online",
    "Knowledge",
    "Ideas",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
  /*
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  */
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn (
          //font.className,
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable
        )}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="tukdo-theme"
          >
            <TailwindIndicator/>
            <Analytics />
            <SpeedInsights />
            <ConfettiProvider />
            <Toaster />
            <ModalProvider />
            <QueryProvider> 
              {children}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
    
  )
}
