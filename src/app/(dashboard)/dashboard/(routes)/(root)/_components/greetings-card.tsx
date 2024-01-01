"use client";

import React, { useRef, useState } from 'react';
import Image from "next/image";

interface GreetingsCardSpotlightProps {
	name: string;
}

export const GreetingsCardSpotlight = ({
	name,
}: GreetingsCardSpotlightProps) => {
	const divRef = useRef<HTMLDivElement>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [opacity, setOpacity] = useState(0);

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!divRef.current || isFocused) return;

		const div = divRef.current;
		const rect = div.getBoundingClientRect();

		setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
	};

	const handleFocus = () => {
		setIsFocused(true);
		setOpacity(1);
	};

	const handleBlur = () => {
		setIsFocused(false);
		setOpacity(0);
	};

	const handleMouseEnter = () => {
		setOpacity(1);
	};

	const handleMouseLeave = () => {
		setOpacity(0);
	};

	return (
		<div
			ref={divRef}
			onMouseMove={handleMouseMove}
			onFocus={handleFocus}
			onBlur={handleBlur}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			className='relative items-center justify-center overflow-hidden rounded-xl border px-8 py-16'
			style={{
				backgroundImage: 'url("/images/header/dashboard.png")',
				backgroundSize: 'cover',
			  }}
		>
			<div
				className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
				style={{
				opacity,
				background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
				}}
			/>
			{/*
			<div className="ml-auto flex-shrink-">
                <Image
                    src="/images/header/owl.png"
                    alt=""
                    width={100}
                    height={100}
                    className="w-32 h-28 object-cover"
                    loading="lazy"
                />
            </div>
			*/}
			{/*<div className="absolute bottom-0 left-0">*/}
			<div>
				<div className="flex flex-col font-bold text-xl text-slate-200 leading-none ml-2">
					<h1 className="font-bold tracking-tighter lg:leading-[1.1] text-2xl md:text-3xl text-[#ffffff] mb-2">Good Day,</h1>					
					<span className="bg-clip-text text-xl text-[#ffffff]">
						{name}
					</span>
				</div>
			</div>
			
		</div>

	);
};