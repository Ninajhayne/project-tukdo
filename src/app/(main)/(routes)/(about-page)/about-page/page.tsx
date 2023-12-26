"use client";

import { Shell } from "@/components/shells/shell"

import { buttonVariants } from "@/components/ui/button"
import { TbTargetArrow } from "react-icons/tb";
import { TbEyeSearch } from "react-icons/tb";

import { TeamMemberCard } from "@/components/cards/team-member-card"
import { teamMembers } from "@/config/members"


const AboutPage = () => {

	return (
		<Shell as="div" className="gap-6 xs:gap-6 lg:gap-9 pt-0 xs:pt-0 md:pt-0 lg:pt-0">
			<section
				id="hero" 
				aria-labelledby="hero-heading"
				className= "w-full h-[40vh] xs:h-[65vh] md:h-[65vh] lg:h-[85vh] px-9 flex flex-col gap-4 pb-8 text-center lg:"
				style={{
				backgroundImage: 'url("/about.png")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				}}
			>
			</section>
			
			<section
				id="about-us"
				aria-labelledby="about-us-heading"
				className="p-6 xs:p-6 xl:p-9 sm:mx-10 lg:mx-16"
			>          
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h1 className="text-2xl font-bold leading-tight sm:text-3xl">
						<span className="text-[#F2602D]">About </span><span className="text-[#00528A]">TUKDO</span>
					</h1>
					<p className="text-base text-foreground text-justify">
					TUKDO: An e-Learning Community Platform aims to develop a platform that strengthens the community and enables flexible e-Learning space in the Philippines, helping learners, regardless of status and age, expand their access to different levels of education and encourage qualified professionals, unemployed educators, and volunteers with educational advocacy to establish their paid and free tutoring services on the cloud. This project aims not to change but to merely fill the gaps/problems of the current education setting. 
					</p>
				</div>
			</section>

			<section
				id="vision-mission"
				aria-labelledby="vision-mission-heading"
				className="p-6 xs:p-6 xl:p-9 space-y-4"  
			>
				<div className="lg:mx-16">
					<h2 className="text-2xl font-bold leading-tight sm:text-3xl mb-4">
						<span className="text-[#F2602D]">Vision & </span><span className="text-[#00528A]">Mission</span>
					</h2>
				</div>   
				<div className="grid grid-cols-1 gap-8 md:gap-16 lg:gap-28 md:grid-cols-2 lg:grid-cols-2 sm:mx-16 lg:mx-32">	
					<div className="py-auto rounded-md p-4 h-full bg-[#F2602D] text-[#FFFFFF]">
						<div className="my-auto flex flex-col items-center">
							<TbTargetArrow className="h-12 w-12 mb-6" aria-hidden="true" />
							<h3 className="text-lg text-center font-bold leading-[1.1] mb-4">
								Our Vision
							</h3>
							<p className="text-base text-justify mb-4">
								To build a comprehensive and innovative e-Learning network that connects learners, volunteers, and professionals from around the Philippines that serves holistic and quality education, regardless of their status.						
							</p>
						</div>
					</div>
					<div className="py-auto rounded-md p-4 bg-[#00528A] text-[rgb(255,255,255)]">
						<div className="my-auto flex flex-col items-center">
							<TbEyeSearch className="h-12 w-12 mb-6" aria-hidden="true" />
							<h3 className="text-lg text-center font-bold leading-[1.1] mb-4">
								Our Mission
							</h3>
							<p className="text-base text-justify mb-4">
								To create a platform for e-Learning space for learners, volunteers, and professionals. It offers user-friendly, intuitive, and accessible for learners who can learn through dynamic, collaborative, and interactive learning environments with the technologies for free or for a fee. 
							</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="team-members"
				aria-labelledby="team-members-heading"
				className="p-6 xs:p-6 xl:p-9 space-y-4"
			>
				<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
					<h1 className="text-2xl font-bold leading-tight sm:text-3xl">
						<span className="text-[#F2602D]">Meet The </span> <span className="text-[#00528A]"> Team</span>
					</h1>
				</div>
				<div className="grid grid-cols-2 gap-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
					{teamMembers.map((members) => (
						<TeamMemberCard key={members.name} members={members} />
					))}
				</div>
			</section>

			
			
		</Shell>	
	);
};

export default AboutPage;

/*
	<AnimatedNumbers
		includeComma
		animateToNumber={(earnings * 10) * coursePriceMultiplier}
		fontStyle={{
			fontSize: '3rem',
			fontWeight: '700',
			WebkitBackgroundClip: 'text',
			backgroundClip: 'text',
			color: 'transparent',
			backgroundImage: 'linear-gradient(to right, rgba(251, 146, 60), rgba(245, 101, 101))',
		}}								
		
		locale="en-US"
		className="font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400"
		configs={[
			{ mass: 1, tension: 200, friction: 20 },
			{ mass: 1, tension: 120, friction: 14 },
			{ mass: 1, tension: 180, friction: 12 },
			{ mass: 1, tension: 100, friction: 18 },
			{ mass: 1, tension: 150, friction: 15 },
			{ mass: 1, tension: 240, friction: 10 },
		]}
		
	/>
*/
