"use client";

// @ref https://whatamesh.vercel.app/
import { useEffect, useState } from "react";
import { Gradient } from "./_component/gradient";

import { currencyFormater } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const GradientPage = () => {
    const [isCanvasLoaded, setCanvasLoaded] = useState(false);
    const [earnings, setEarnings] = useState(1);
	const [coursePriceMultiplier, setCoursePriceMultiplier] = useState(500);


    useEffect(() => {
        const gradient = new Gradient();
        //@ts-ignore
        gradient.initGradient('#gradient-canvas');
        setCanvasLoaded(true);
    }, []);

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
        <>
            <section className="h-screen">
                {/*
                <div className="gradient-wrapper">
                    <canvas id="gradient-canvas" data-transition-in></canvas>
                </div>
                */}
                {/*
                <div className="gradient-wrapper">
                    <canvas id="gradient-canvas" data-transition-in></canvas>
                </div>
                */}
                
                {/*
                <h1 className="font-extrabold text-4xl md:text-6xl bg-clip-text relative bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100">
                    Join Tukdo
                </h1>
                */}
                <div className="grid w-full grid-cols-1 my-auto mt-24 mb-8 md:grid-cols-2 xl:gap-14 md:gap-5 px-6">
                    {/*
                    
                    <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
                        <h1 className="mb-8 text-7xl font-extrabold leading-tight text-opacity-80">
                            Become a tutor
                        </h1>
                        <p className="mb-6 text-base font-normal leading-7 lg:w-3/4">
                            Be part of a community where people help people grow.
                        </p>
                    </div>
                    */}
                    {/*
                    <div className="text-center justify-center pb-6">
                        <h1 className="font-extrabold text-4xl md:text-6xl bg-clip-text relative bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100">
                            Join Tukdo
                        </h1>

                        <span className="font-medium text-3xl bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100">
                            You could earn
                        </span>

                        <div className="flex items-center justify-center text-5xl md:text-6xl mt-6">
                            {earnings && coursePriceMultiplier && (
                                <div className="font-black">
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
                            <Button>Become a tutor</Button>
                        </div>
                    </div>
                    */}
                    <div className="flex flex-col justify-center col-span-1 text-center lg:text-start">
                        <h1 className="text-6xl font-extrabold leading-tight text-opacity-80">
                            Join Tukdo
                        </h1>
                        <p className="mb-6 font-semibold leading-7 lg:w-3/4">
                            Be part of a community where people help people grow.
                        </p>
                    </div>

                    <div className="items-center -mt-32 justify-end hidden col-span-1 md:flex">
                        <img className="w-full rounded-md" src="/images/gradient/Notion.webp" alt="notion" />
                    </div>
                </div>
            </section>
        </>
    );
}

export default GradientPage;

/*
<section className="container space-y-12 mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
    <div className="grid gap-8 md:grid-cols-2">
        <div>
            <div className="-ml-24 rounded-lg md:rounded-r-full bg-[#f2eae3] dark:bg-black h-[256px]">
                <video className="w-full h-full object-cover" autoPlay loop muted>
                    <source src="/videos/slack/3.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
                Simple and easy
            </p>
            <h2 className="text-4xl font-bold">Bring your students together</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                autem, a recusandae vero praesentium qui impedit doloremque
                molestias necessitatibus.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                <div>
                    <p className="font-semibold text-gray-400">Made with love</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Delectus labor.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-400">It's easy to build</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                        amet consectetur.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
        <div className="flex flex-col justify-center">
            <p
                className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
                Simple and easy
            </p>
            <h2 className="text-4xl font-bold">Made for devs and designers</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                autem, a recusandae vero praesentium qui impedit doloremque
                molestias necessitatibus.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                <div>
                    <p className="font-semibold text-gray-400">Made with love</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Delectus labor.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-400">It's easy to build</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                        amet consectetur.
                    </p>
                </div>
            </div>
        </div>
        <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-[256px]">
                <video className="w-full h-full object-cover" autoPlay loop muted>
                    <source src="/videos/slack/2.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    </div>

    <div className="grid gap-8 md:grid-cols-2">
        <div>
            <div className="-ml-24 rounded-lg md:rounded-r-full bg-[#f2eae3] dark:bg-black h-[256px]">
                <video className="w-full h-full object-cover" autoPlay loop muted>
                    <source src="/videos/slack/1.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div className="flex flex-col justify-center">
            <p className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
                Simple and easy
            </p>
            <h2 className="text-4xl font-bold">Move faster with your tools in one place</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                autem, a recusandae vero praesentium qui impedit doloremque
                molestias necessitatibus.
            </p>
            <div className="h-8"></div>
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
                <div>
                    <p className="font-semibold text-gray-400">Made with love</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Delectus labor.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-400">It's easy to build</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                        amet consectetur.
                    </p>
                </div>
            </div>
        </div>
    </div>


    <div className="grid gap-8 md:grid-cols-3">
        <div className="flex flex-col justify-center md:col-span-2">
            <p
                className="self-start inline font-sans text-xl font-medium text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-600">
                We are humans
            </p>
            <h2 className="text-4xl font-bold">We could work together</h2>
            <div className="h-6"></div>
            <p className="font-serif text-xl text-gray-400 md:pr-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                autem, a recusandae vero praesentium qui impedit doloremque
                molestias.
            </p>
            <div className="h-8"></div>
            <div className="grid gap-6 pt-8 border-t border-gray-800 lg:grid-cols-3">
                <div>
                    <p className="font-semibold text-gray-400">Made with love</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Delectus labor.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-400">It's easy to build</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                        amet consectetur.
                    </p>
                </div>
                <div>
                    <p className="font-semibold text-gray-400">It's easy to build</p>
                    <div className="h-4"></div>
                    <p className="font-serif text-gray-400">
                        Ipsum dolor sit, amet consectetur adipisicing elit. Delectus
                        amet consectetur.
                    </p>
                </div>
            </div>
        </div>
        <div>
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-900 to-black h-96"></div>
        </div>
    </div>
</section>
*/