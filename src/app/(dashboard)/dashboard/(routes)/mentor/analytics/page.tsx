import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/app/_actions/course/get-analytics"; 

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getBuyers } from "@/app/_actions/report/get-buyers";
import { formatDate } from "@/lib/utils";
import { CoursesRadarChart } from "./_components/courses-radar-chart";

import { CalendarIcon } from "@radix-ui/react-icons";
import { HistorySelect } from "./_components/history-select";

interface AnalyticsPageProps {
    searchParams: {
        history?: string;
    }
};


import type { Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Analytics | TUKDO",
    description: "",
}

const AnalyticsPage = async ({
	searchParams
}: AnalyticsPageProps) => {
	//const searchParams = useSearchParams();


    const { userId } = auth();

    if (!userId) {
        return redirect("/");     
    }

	//const frame = searchParams?.get("history") ?? "last24Hours"

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(userId, searchParams.history);

	const buyers = await getBuyers(userId, searchParams.history);


    return ( 
        <div className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
				<div className="flex flex-col lg:flex-row items-center space-x-2">
					<HistorySelect />
					<Button>
						Download
					</Button>
				</div>
			</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <DataCard
                    label="Revenue"
                    value={totalRevenue}
                    shouldFormat
                    bg="#00538a12"
                />
                <DataCard
                    label="Sales"
                    value={totalSales}
                    bg="#F2602D12"
                />
            </div>

			<div className="grid grid-cols-1 md:grid-cols-2">
				<CoursesRadarChart/>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="mb-4">View Students</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
						<DialogTitle>Students</DialogTitle>
						<DialogDescription>
							Here, you can view a list of students who have purchased your course. 
						</DialogDescription>
						</DialogHeader>
						{buyers && (
							<ScrollArea className="h-72 w-full rounded-md border">
								<div className="p-4">
									{buyers.map((buyer) => (
										<>
											<div key={formatDate(buyer.createdAt)}>
												<div className="text-sm font-semibold truncate">
													{buyer.user.name}
												</div>
												<div className="text-sm truncate">
													{buyer.course.title}
												</div>
												<div className="text-sm truncate flex items-center">
													<CalendarIcon className="mr-1"/> {formatDate(buyer.createdAt)}
												</div>
											</div>
											
											<Separator className="my-2" />
										</>
									))}
								</div>
							</ScrollArea>
						)}
						
					</DialogContent>
				</Dialog>
			</div>
			
            <Chart
                data={data}
            />
        </div>
    );
}
 
export default AnalyticsPage;