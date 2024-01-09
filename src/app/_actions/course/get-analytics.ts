import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse = Purchase & {
    course: Course;
};

const groupByCourse = (purchases: PurchaseWithCourse[]) => {
    const grouped: { [courseTitle: string]: number } = {};
    
    purchases.forEach((purchase) => {
        const courseTitle = purchase.course.title;
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price!;
    });

    return grouped;
};

export const getAnalytics = async (userId: string, timeframe?: string) => {
    try {
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

        const purchases = await db.purchase.findMany({
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
            }
        });

        const groupedEarnings = groupByCourse(purchases);
        const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,
        }));

        const revenue = data.reduce((acc, curr) => acc + curr.total, 0);
        const sales = purchases.length;

        return {
            data,
            revenue,
            sales,
        };
    } catch (error) {
        console.log("[GET_ANALYTICS]", error);
        return {
            data: [],
            revenue: 0,
            sales: 0,
        };
    };
};