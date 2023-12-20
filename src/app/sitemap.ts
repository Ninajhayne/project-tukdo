import { type MetadataRoute } from "next"
import { db } from "@/lib/db"

import { absoluteUrl } from "@/lib/utils"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	
	// Fetch all courses and listings from the database
	const courses = await db.course.findMany();
	const listings = await db.listing.findMany();
  
	// Include URLs for each course
	const courseRoutes = courses.map((course) => ({
		url: absoluteUrl(`/course/${course.id}`),
		lastModified: new Date().toISOString(),
	}));
  
	// Include URLs for each listing
	const listingRoutes = listings.map((listing) => ({
		url: absoluteUrl(`/listing/${listing.id}`),
		lastModified: new Date().toISOString(),
	}));

    const routes = [
        "",
        "/courses",
        "/listings",
        "/listings/map",
		"/become-a-mentor",
        "/dashboard/billing",
    ].map((route) => ({
        url: absoluteUrl(route),
        lastModified: new Date().toISOString(),
    }))

    return [
        ...routes,
		...courseRoutes,
		...listingRoutes,
    ]
}
