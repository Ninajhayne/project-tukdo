
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { InitialProfile } from "@/lib/initial-profile";

import { Button } from "@/components/ui/button";

export default async function Plaza() {
	const profile = await InitialProfile();

	const server = await db.plaza.findFirst({
		where: {
			members: {
				some: {
					profileId: profile.id
				}
			}
		}
	});
	
	if (server) {
		return redirect(`/plaza/servers/${server.id}`);
	} else {
		return (
			<section className="relative overflow-hidden pt-12 pb-12">
				<div className="flex flex-wrap justify-center mt-10">
					<div className="p-4 max-w-sm">
						<div className="flex rounded-lg p-8 flex-col">
							<div className="flex items-center mb-3">
								<h1 
									className="bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100 bg-clip-text text-transparent text-xl font-bold tracking-tight"
								>
									Create a server
								</h1>
							</div>
							<div className="flex flex-col justify-between flex-grow">
								<Link
									href="/dashboard/mentor/profile"
								>
									<Button>
										Become a mentor
									</Button>
								</Link>
								
							</div>
						</div>
					</div>

					<div className="p-4 max-w-sm">
						<div className="flex rounded-lg p-8 flex-col">
							<div className="flex items-center mb-3">
								<h1 
									className="bg-gradient-to-r from-gray-900 to-gray-600 dark:bg-gradient-to-r dark:from-rose-100 dark:to-teal-100 bg-clip-text text-transparent text-xl font-bold tracking-tight"
								>
									Join a server
								</h1>
							</div>
							<div className="flex flex-col justify-between flex-grow">
								<Link
									href="/listings"
								>
									<Button>
										Find mentors
									</Button>
								</Link>
							</div>
						</div>
					</div>

				</div>
			</section>
		)
	}
}
