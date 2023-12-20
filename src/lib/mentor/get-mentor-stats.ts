import { db } from "@/lib/db";
import { MentorWithListing } from "@/types";


interface getMentorStatsProps {
    mentor: MentorWithListing;
}

export const getMentorStats = async ({
    mentor,
}: getMentorStatsProps) => {
	try {
		const mentorRating = await db.listing.findUnique({
			where: {
				mentorId: mentor.userId
			},
		});

		const numberOfCourses = await db.course.count({
			where: { 
				userId: mentor.userId, 
			},
		});
		
		return {
			numberOfCourses,
			mentorRating,
		};
		
	} catch (error) {
		console.log("Error fetching mentor stats:", error);
	}
}
