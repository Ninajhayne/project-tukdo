import { db } from "@/lib/db";

export const getBuyers = async (userId: string, timeframe?: string) => {
    try {
        // Define a map to convert timeframe values to days
        /*
        const timeframeMap = {
            last24Hours: 1,
            yesterday: 1,
            thisWeek: 7,
            last7Days: 7,
            thisMonth: 30,
            last30Days: 30,
            last90Days: 90,
        } as Record<string, number>;
        */

        const currentDate = new Date();
        let startDate = new Date();
        //startDate.setDate(startDate.getDate() - timeframeMap[timeframe]);

        switch (timeframe) {
            case 'last24Hours':
                startDate.setHours(currentDate.getHours() - 24);
                break;
            case 'yesterday':
                startDate.setDate(currentDate.getDate() - 1);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'thisWeek':
                startDate.setDate(currentDate.getDate() - currentDate.getDay());
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'last7Days':
                startDate.setDate(currentDate.getDate() - 7);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'thisMonth':
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'last30Days':
                startDate.setDate(currentDate.getDate() - 30);
                startDate.setHours(0, 0, 0, 0);
                break;
            case 'last90Days':
                startDate.setDate(currentDate.getDate() - 90);
                startDate.setHours(0, 0, 0, 0);
                break;
            default:
                // If the timeframe is not recognized or is 'last24Hours', use the current date
                startDate = currentDate;
                break;
        }        

        // Fetch purchases with course information
        const buyers = await db.purchase.findMany({
            where: {
                course: {
                    userId: userId
                },
                createdAt: {
                    gte: startDate,
                },
            },
            include: {
                course: true,
                user: {
                    select: {
                        name: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return buyers;
    } catch (error) {
        console.log("[GET_BUYERS]", error);
        return null;
    }
};
