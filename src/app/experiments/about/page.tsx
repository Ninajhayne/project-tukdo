"use client";

//import { TeamMemberCard } from "@/components/cards/main-page/team-member-card";
//import { teamMembers } from "@/config/main-page/members"
import Balancer from "react-wrap-balancer";

const AboutPage = () => {

    return (
        <section className="relative overflow-hidden pt-12 pb-12">
            <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
            <div className="mx-auto max-w-2xl text-center">
                <h1 
                    className="bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100 bg-clip-text text-transparent text-3xl font-bold tracking-tight sm:text-5xl"
                >
                    Meet the Team
                </h1>
            </div>
            <div className="flex justify-center items-center relative mx-auto mt-6 max-w-lg">
                <img className="w-3/4 rounded-2xl shadow" src="/images/team/s.jpg" alt="" />
            </div>
            <div className="flex justify-center items-center relative mx-auto max-w-lg mt-2">
                <Balancer className="w-3/4 text-xs text-center">
                    <span
                        className="underline mr-1"
                    >
                        From left to right:
                    </span> 
                    Nikki Dominique Abogadie, Niña Jhayne Boral, Barbhea Acosta, Claude Allen Belgado
                </Balancer>
            </div>
            {/*
            <div className="cardGradient">
            <div className="card-content">
                <h3 className="card-title">I know exactly what I'm doing</h3>
                <h4 className="card-subtitle"></h4>
            </div>
            </div>
            */}
            
        </section>

    );
}

export default AboutPage;

/*
<div className="relative z-10">
    <div
        className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
        <svg className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20" aria-hidden="true">
            <defs>
                <pattern id="e9033f3e-f665-41a6-84ef-756f6778e6fe" width="200" height="200" x="50%" y="50%"
                    patternUnits="userSpaceOnUse" patternTransform="translate(-100 0)">
                    <path d="M.5 200V.5H200" fill="none"></path>
                </pattern>
            </defs>
            <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
                <path d="M-300 0h201v201h-201Z M300 200h201v201h-201Z" stroke-width="0"></path>
            </svg>
            <rect width="100%" height="100%" stroke-width="0" fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)">
            </rect>
        </svg>
    </div>
</div>
<div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Refreshingly Sustainable:
            <span className="text-blue-600">Boxed Water
            </span>
        </h1>
        <h2 className="mt-6 text-lg leading-8 text-gray-600">
            Choose a more eco-friendly way to hydrate with our 100% recyclable cartons.
        </h2>
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <a className="isomorphic-link isomorphic-link--internal inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                href="/login">Shop Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                </svg>
            </a>
        </div>
    </div>
    <div className="relative mx-auto mt-10 max-w-lg">
        <img className="w-full rounded-2xl border border-gray-100 shadow" src="/images/team/s.jpg" alt=""/>
    </div>
</div>
*/

/*
<div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
    <h2 className="text-3xl font-bold leading-[1.1] sm:text-2xl md:text-3xl">
        <span className="text-[#F2602D]">Meet The</span> <span className="text-[#00528A]"> Team</span>
    </h2>
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 py-9">
    {teamMembers.map((members) => (
        <TeamMemberCard key={members.name} members={members} />
    ))}
</div>
*/