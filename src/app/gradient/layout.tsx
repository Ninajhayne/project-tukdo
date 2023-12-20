"use client"

//import { currentUser } from "@clerk/nextjs"

import { useEffect, useState } from "react";
import { Gradient } from "./_component/gradient";

import { SiteFooter } from "@/components/layouts/site-footer"
//import { SiteHeader } from "@/components/layouts/site-header"
import { TransparentHeader } from "@/components/layouts/transparent-header";

interface GradientLayoutProps {
    children: React.ReactNode
}

export default function GradientLayout({ children }: GradientLayoutProps) {
    const [isCanvasLoaded, setCanvasLoaded] = useState(false);

    useEffect(() => {
        const gradient = new Gradient();
        //@ts-ignore
        gradient.initGradient('#gradient-canvas');
        setCanvasLoaded(true);
    }, []);
    
    try {
        //const user = await currentUser();

        return (
            <div className={`relative flex min-h-screen flex-col ${isCanvasLoaded ? '' : 'hidden'}`}>
                {/*<TransparentHeader user={user}/>*/}
                <div className="gradient-wrapper">
                    <canvas id="gradient-canvas" data-transition-in></canvas>
                </div>
                <TransparentHeader/>
                    <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        )
    } catch (error) {
        console.log(error);
    }
}
