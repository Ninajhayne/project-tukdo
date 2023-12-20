import * as React from "react"

export default async function Skate() {
   
	return (
		<section className="min-h-screen">
			<div className='relative z-0 mx-auto max-w-3xl pb-24 pt-12 text-center'>
				<div className='absolute -top-4 -z-10 flex w-full justify-center'>
					<div className='h-[310px] w-[310px] max-w-full animate-pulse-slow rounded-full bg-[#8678F9] opacity-20 blur-[100px]' />
				</div>
				<div>
					{/*
					<h1 className='mb-8 bg-gradient-to-t from-[#6d6d6d] to-[#f4f4f4] bg-clip-text text-4xl text-transparent md:text-5xl'>
						Experiments
					</h1>
					*/}
					
					<h1 className='mb-8 text-4x md:text-5xl'>
						Experiments
					</h1>
				</div>
			</div>
		</section>
	)
}