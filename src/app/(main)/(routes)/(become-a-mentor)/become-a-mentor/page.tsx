"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { currencyFormater } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/shells/shell"
import { Balancer } from "react-wrap-balancer"
import { ValuePropositionLayout2 } from "@/components/layouts/value-proposition-container2"
import { vProposition2 } from "@/config/valuep2"
import Image from "next/image";
import Link from "next/link"

const BecomeAMentorPage = () => {
	const [earnings, setEarnings] = useState(1);
	const [coursePriceMultiplier, setCoursePriceMultiplier] = useState(500);


	const router = useRouter();

	const handleBecomeMentor = () => {
		router.push('/dashboard/mentor/profile');
	};
	useEffect(() => {
		let currentEarnings = 1;
		const targetEarnings = Math.floor(Math.random() * (80 - 40 + 1) + 40);
		const increment = targetEarnings > currentEarnings ? 5 : -5;

		const interval = setInterval(() => {
		currentEarnings += increment;
		setEarnings(currentEarnings);

		if (
			(increment > 0 && currentEarnings >= targetEarnings) ||
			(increment < 0 && currentEarnings <= targetEarnings)
		) {
			clearInterval(interval);
		}
		}, 20);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setCoursePriceMultiplier(Math.floor(Math.random() * (1500 - 500 + 1) + 500));
	}, []);
	/*
	const handleRangeChange = (event: any) => {
		setEarnings(Number(event.target.value));
	};
	*/
	const handleChangeRange = (newValue: any) => {
		setEarnings(newValue);
	};   

	return (
		<Shell as="div" className="gap-6 xs:gap-6 lg:gap-9">
			<div className="text-center justify-center pb-6">
				<h1 className="text-3xl font-bold leading-tight tracking-tighterlg:text-4xl lg:leading-[1.1] mb-4">
					<span className="text-[#F2602D]">
						Become A <span className="text-[#00528A] inline-block mt-1"> Tutor</span>
					</span>				
				</h1>
				<Balancer className=" text-lg text-foreground sm:text-xl">
					Explore the exciting world of online tutoring and share your expertise with students everywhere. 
				</Balancer>

				{/*
				<h1 className="font-extrabold text-4xl text-[#F2602D] md:text-6xl bg-clip-text relative bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100">
                    Join
                    <span className="relative inline-flex sm:inline ml-1">
                        <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
						<span className="text-[#00528A] relative bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-rose-100 dark:to-teal-100"> Tukdo </span>
                    </span>
                </h1>

				<span className="font-medium text-3xl bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100">
					You could earn
				</span>

				<div className="flex items-center justify-center text-5xl md:text-6xl mt-6">
					{earnings && coursePriceMultiplier && (
						<div className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400 flex flex-row">
							<span className="font-bold mr-1">₱</span>
							<span>
								{(earnings * 10 * coursePriceMultiplier).toLocaleString('en-US')}
							</span>
							
						</div>
					)}
				</div>

				<span className="flex justify-center my-4">
					<p className="underline mr-1 font-semibold">{earnings * 10}</p>
					students on a {currencyFormater({ amount: coursePriceMultiplier, currency: "php" })} course
				</span>
				<div className="flex justify-center mx-auto">
					<Slider
						min={1}
						max={100}
						step={1}
						value={[earnings]}
						onValueChange={handleChangeRange}
						className="w-56 mt-4"
					/>
				</div>
				<br />
				<div className="my-6">
					<Button
						onClick={handleBecomeMentor}
					>
						Become a Tutor
					</Button>
				</div>
					*/}
			</div>

			<section
				id="value-proposition"
				aria-labelledby="value-proposition-heading"
				className="space-y-3 mx-0 xs:mx-0 sm:mx-8 lg:mx-14 md:mx-16"
			>          
				{vProposition2.map((valueproposition2, index) => (
					<ValuePropositionLayout2 key={index} valueproposition2={valueproposition2} index={index} />
				))}

			</section>

			<section
				id="create-a-application-banner"
				aria-labelledby="create-a-application-banner-heading"
				className="p-9 space-y-6 sm:mx-16 md:pt-9 lg:pt-9 lg:mx-32"

			>
			<div className="grid grid-cols-2 gap-32 py-9">
				<div className="relative w-full h-48">
					<Image
						src="/images/tutor.png"
						alt="tutor apply now"
						className="object-cover border rounded-md shadow-sm"
						sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
						fill
						loading="lazy"
					/>
				</div>
				<div className="my-auto">
					<h2 className="text-[#00528A] text-3xl font-bold leading-[1.1] mb-3 sm:text-2xl md:text-3xl">
						Consider Online Tutoring?
					</h2>

					<Button
						onClick={handleBecomeMentor}
					>
						Apply Now
					</Button>
				</div>
			</div>
			</section>
			
			{/*
			<div className="relative">
				<div aria-hidden="true"
					className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-rose-100 to-teal-100 dark:from-blue-700"></div>
					<div className="blur-[106px] h-32 bg-gradient-to-r from-rose-100 to-teal-100 dark:to-indigo-600"></div>
				</div>

				<div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
					<div className="blur-[106px] h-56 bg-gradient-to-br from-rose-100 to-teal-100 dark:from-blue-700"></div>
					<div className="relative blur-[106px] h-32">
						<div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-yellow-300 to-transparent"></div>
					</div>
				</div>



				<div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
					<div className="relative">
						<div className="flex items-center justify-center">
							<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><mask id=":r7:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:r7:)"><rect width="36" height="36" fill="#ff7d10"></rect><rect x="0" y="0" width="36" height="36" transform="translate(4 4) rotate(340 18 18) scale(1.1)" fill="#0a0310" rx="36"></rect><g transform="translate(-4 -1) rotate(0 18 18)"><path d="M15 20c2 1 4 1 6 0" stroke="#FFFFFF" fill="none" stroke-linecap="round"></path><rect x="14" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect><rect x="20" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect></g></g></svg>
							<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><mask id=":re:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:re:)"><rect width="36" height="36" fill="#49007e"></rect><rect x="0" y="0" width="36" height="36" transform="translate(1 1) rotate(183 18 18) scale(1)" fill="#ff7d10" rx="36"></rect><g transform="translate(-7 0) rotate(3 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path><rect x="11" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="23" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
							<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="64" height="64"><mask id=":rg:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rg:)"><rect width="36" height="36" fill="#ff005b"></rect><rect x="0" y="0" width="36" height="36" transform="translate(-5 9) rotate(189 18 18) scale(1)" fill="#ffb238" rx="36"></rect><g transform="translate(-5 4.5) rotate(-9 18 18)"><path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
							<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="48" height="48"><mask id=":r8:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:r8:)"><rect width="36" height="36" fill="#ff005b"></rect><rect x="0" y="0" width="36" height="36" transform="translate(0 0) rotate(324 18 18) scale(1)" fill="#ffb238" rx="36"></rect><g transform="translate(-4 -4) rotate(-4 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
							<svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><mask id=":rk:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36"><rect width="36" height="36" rx="72" fill="#FFFFFF"></rect></mask><g mask="url(#:rk:)"><rect width="36" height="36" fill="#ff005b"></rect><rect x="0" y="0" width="36" height="36" transform="translate(9 -5) rotate(219 18 18) scale(1)" fill="#ffb238" rx="6"></rect><g transform="translate(4.5 -4) rotate(9 18 18)"><path d="M15 19c2 1 4 1 6 0" stroke="#000000" fill="none" stroke-linecap="round"></path><rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect><rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect></g></g></svg>
						</div>
						{/*
						<div className="flex items-center justify-center">
							<img loading="lazy" width="400" height="400" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Satanic.jpg" alt="member photo" className="h-8 w-8 object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Mantastyle.jpg" alt="member photo" className="h-12 w-12 object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Butterfly.jpg" alt="member photo" className="z-10 h-16 w-16 object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Orchidmalevolence.jpg" alt="member photo" className="relative h-12 w-12 object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Pointbooster.jpg" alt="member photo" className="h-8 w-8 object-cover"/>
						</div>
						

							<img loading="lazy" width="400" height="400" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Satanic.jpg" alt="member photo" className="h-8 w-8 rounded-full object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Mantastyle.jpg" alt="member photo" className="h-12 w-12 rounded-full object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Butterfly.jpg" alt="member photo" className="z-10 h-16 w-16 rounded-full object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Orchidmalevolence.jpg" alt="member photo" className="relative h-12 w-12 rounded-full object-cover"/>
							<img loading="lazy" width="200" height="200" src="http://gaming-tools.com/warcraft-3/wp-content/uploads/sites/2/2020/04/Pointbooster.jpg" alt="member photo" className="h-8 w-8 rounded-full object-cover"/>
							<div className="flex items-center justify-center -space-x-2">
								<img loading="lazy" width="400" height="400" src="https://randomuser.me/api/portraits/women/12.jpg" alt="member photo" className="h-8 w-8 rounded-full object-cover"/>
								<img loading="lazy" width="200" height="200" src="https://randomuser.me/api/portraits/women/45.jpg" alt="member photo" className="h-12 w-12 rounded-full object-cover"/>
								<img loading="lazy" width="200" height="200" src="https://randomuser.me/api/portraits/women/60.jpg" alt="member photo" className="z-10 h-16 w-16 rounded-full object-cover"/>
								<img loading="lazy" width="200" height="200" src="https://randomuser.me/api/portraits/women/4.jpg" alt="member photo" className="relative h-12 w-12 rounded-full object-cover"/>
								<img loading="lazy" width="200" height="200" src="https://randomuser.me/api/portraits/women/34.jpg" alt="member photo" className="h-8 w-8 rounded-full object-cover"/>
							</div>
						
						<div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
							<h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
								Become a Tutor
							</h1>
							<p className="text-center text-xl text-gray-600 dark:text-gray-300">
								Be part of a community where people help people grow.
							</p>
							<div className="flex flex-wrap justify-center gap-6">
								<Button
									size="lg"
									onClick={handleBecomeMentor}
								>
									Get Started
								</Button>
								<Button
									variant="outline"
									size="lg"
								>
									Learn more
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			*/}
		</Shell>
	);
};

export default BecomeAMentorPage;
