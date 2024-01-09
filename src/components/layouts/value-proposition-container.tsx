import Image from "next/image";
import React from "react";
import type { ValueProposition } from "@/types";
import { cn } from "@/lib/utils";

interface ValuePropositionLayoutProps {
  valueproposition: ValueProposition;
  index: number; // Add this line
}

export function ValuePropositionLayout({
  valueproposition,
  index, // Add this line
}: ValuePropositionLayoutProps) {
    return (
        <div className="group relative overflow-hidden rounded-md bg-transparent">
          <div className="grid flex-grow grid-cols-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-9 lg:grid-cols-2 lg:gap-16">
            <div
              className={`grid flex-grow card bg-base-300 px-0 xs:px-0 sm:px-4 lg:px-6 xl:px-6 pb-4 rounded-box place-items-center inset-0 z-10 ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
            >
              <div className="relative w-full h-50">
                <Image
                  src={valueproposition.image}
                  alt={`${valueproposition.title}`}
                  width={500}
                  height={500}
                  className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              className={`h-50 flex-grow bg-base-300 pb-4 flex items-center justify-center relative inset-0 z-20  px-0 xs:px-0 sm:px-4 lg:px-6 xl:px-6 ${
                index % 2 === 0 ? "order-2" : "order-1"
              }`}
            >
              <div className="">
                <h2 className="text-[#00528A] text-2xl font-bold leading-[1.1] mb-4">
                  {valueproposition.title}
                </h2>
                <p className="text-base text-foreground text-justify mb-4">
                  {valueproposition.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}
