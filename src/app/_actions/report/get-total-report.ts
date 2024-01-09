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

export const getTotalReports = async (userId: string) => {
    try {
        const purchases = await db.purchase.findMany({
            where: {
                course: {
                userId: userId
                }
            },
            include: {
                course: true,
            }
        });

        const groupedEarnings = groupByCourse(purchases);
        const totalData = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
            name: courseTitle,
            total: total,
        }));

        const totalRevenue = totalData.reduce((acc, curr) => acc + curr.total, 0);
        const totalSales = purchases.length;

        return {
            totalData,
            totalRevenue,
            totalSales,
        };
    } catch (error) {
        console.log("[GET_TOTAL_REPORTS]", error);
        return {
            totalData: [],
            totalRevenue: 0,
            totalSales: 0,
        };
    };
};