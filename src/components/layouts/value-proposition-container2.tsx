import Image from "next/image";
import React from "react";
import type { ValueProposition2 } from "@/types";

interface ValuePropositionLayout2Props {
  valueproposition2: ValueProposition2;
  index: number; // Add this line
}

export function ValuePropositionLayout2({
  valueproposition2,
  index, // Add this line
}: ValuePropositionLayout2Props) {
    return (
        <div className="group relative overflow-hidden rounded-md bg-transparent">
          <div className="grid flex-grow grid-cols-1 sm:grid-cols-1 sm:gap-4 md:grid-cols-2 md:gap-9 lg:grid-cols-2 lg:gap-16">
            <div
              className={`grid flex-grow card bg-base-300 p-10 rounded-box place-items-center inset-0 z-10 ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
            >
              <div className="relative w-full h-65">
                <Image
                  src={valueproposition2.image}
                  alt={`${valueproposition2.title}`}
                  width={1280}
                  height={800}
                  className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-md object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div
              className={`h-70 flex-grow bg-base-300 p-6 flex items-center justify-center relative inset-0 z-20 ${
                index % 2 === 0 ? "order-2" : "order-1"
              }`}
            >
              <div className="">
                <h2 className="text-[#00528A] text-3xl font-bold leading-[1.1] mb-4 sm:text-2xl md:text-3xl">
                  {valueproposition2.title}
                </h2>
                <p className="text-base text-foreground text-justify mb-4">
                  {valueproposition2.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
}
