import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAnalytics } from "@/app/_actions/course/get-analytics"; 

import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import type { Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Analytics | TUKDO",
    description: "",
}

const AnalyticsPage = async () => {
    const { userId } = auth();

    if (!userId) {
        return redirect("/");
    }

    const {
        data,
        totalRevenue,
        totalSales,
    } = await getAnalytics(userId);

    return ( 
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <DataCard
                    label="Total Revenue"
                    value={totalRevenue}
                    shouldFormat
                    bg="#00538a12"
                />
                <DataCard
                    label="Total Sales"
                    value={totalSales}
                    bg="#F2602D12"
                />
            </div>
            <Chart
                data={data}
            />
        </div>
    );
}
 
export default AnalyticsPage;