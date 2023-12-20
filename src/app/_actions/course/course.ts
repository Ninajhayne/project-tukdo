"use server"

//import { revalidatePath } from "next/cache"
//import { db } from "@/db"
import { db } from "@/lib/db"
//import { products, type Product } from "@/db/schema"
import { Course, Category, Prisma } from "@prisma/client"
import escapeStringRegexp from "escape-string-regexp";

//import type { StoredFile } from "@/types"
import { type z } from "zod"

import type {
    //getCourseSchema,
    getCoursesSchema,
    //courseSchema,
} from "@/lib/validations/course"

export async function filterCoursesAction(query: string) {
    if (query.length === 0) return null;

    try {
        const filteredCourses = await db.course.findMany({
            where: {
                title: {
                    contains: escapeStringRegexp(query),
                    mode: "insensitive",
                },
            },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 10,
        });
        
        const coursesByCategory: { [key: string]: any[] } = {};

        for (const course of filteredCourses) {
            const category = course.category?.name ?? 'Uncategorized';

            if (!coursesByCategory[category]) {
                coursesByCategory[category] = [];
            }

            coursesByCategory[category].push({ id: course.id, title: course.title });
        }

        const data = Object.keys(coursesByCategory).map((category) => ({
            category: [{ name: category }],
            courses: coursesByCategory[category],
        }));

        return data;
    } catch (error) {
        console.error("Error filtering courses:", error);
        throw error;
    }
}

export async function getProductsAction(
    input: z.infer<typeof getCoursesSchema>
) {
    const { sort, price_range, categories, limit, offset } = input;
    const [column, order] = (sort?.split(".") as [keyof Course | undefined, "asc" | "desc" | undefined]) ?? [];
    const [minPrice, maxPrice] = price_range?.split("-") ?? [];
    const categoriesArray = (categories?.split(".") as Category["name"][]) ?? [];

    try {
        const items = await db.course.findMany({
            where: {
                AND: [
                    categoriesArray.length ? { categoryId: { in: categoriesArray } } : {},
                    minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
                    maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
                ],
            },
            orderBy: [
                column && column in db.course
                ? order === "asc"
                    ? { [column]: "asc" }
                    : { [column]: "desc" }
                : { createdAt: "desc" },
            ],
            take: limit,
            skip: offset,
        });

        const count = await db.course.count({
            where: {
                AND: [
                    categoriesArray.length ? { categoryId: { in: categoriesArray } } : {},
                    minPrice ? { price: { gte: parseFloat(minPrice) } } : {},
                    maxPrice ? { price: { lte: parseFloat(maxPrice) } } : {},
                ],
            },
        });

        return {
            items,
            count,
        };
    } catch (error) {
        console.error("Error getting courses:", error);
        throw error;
    }
}

/*
export async function checkCourseAction(input: { name: string; id?: number }) {
    const courseWithSameName = await db.query.products.findFirst({
        where: input.id
        ? and(not(eq(products.id, input.id)), eq(products.name, input.name))
        : eq(products.name, input.name),
    })

    if (productWithSameName) {
        throw new Error("Product name already taken.")
    }
}

export async function addProductAction(
    input: z.infer<typeof productSchema> & {
        storeId: number
        images: StoredFile[] | null
    }
) {
    const productWithSameName = await db.query.products.findFirst({
        columns: {
        id: true,
        },
        where: eq(products.name, input.name),
    })

    if (productWithSameName) {
        throw new Error("Product name already taken.")
    }

    await db.insert(products).values({
        ...input,
        storeId: input.storeId,
        images: input.images,
    })

    revalidatePath(`/dashboard/stores/${input.storeId}/products.`)
}

export async function updateProductAction(
    input: z.infer<typeof productSchema> & {
        storeId: number
        id: number
        images: StoredFile[] | null
    }
) {
    const product = await db.query.products.findFirst({
        where: and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
    })

    if (!product) {
        throw new Error("Product not found.")
    }

    await db.update(products).set(input).where(eq(products.id, input.id))

    revalidatePath(`/dashboard/stores/${input.storeId}/products/${input.id}`)
}

export async function deleteProductAction(
    input: z.infer<typeof getProductSchema>
) {
    const product = await db.query.products.findFirst({
        columns: {
        id: true,
        },
        where: and(eq(products.id, input.id), eq(products.storeId, input.storeId)),
    })

    if (!product) {
        throw new Error("Product not found.")
    }

    await db.delete(products).where(eq(products.id, input.id))

    revalidatePath(`/dashboard/stores/${input.storeId}/products`)
}

export async function getNextProductIdAction(
    input: z.infer<typeof getProductSchema>
) {
    const product = await db.query.products.findFirst({
        columns: {
        id: true,
        },
        where: and(eq(products.storeId, input.storeId), gt(products.id, input.id)),
        orderBy: asc(products.id),
    })

    if (!product) {
        throw new Error("Product not found.")
    }

    return product.id
}

export async function getPreviousProductIdAction(
    input: z.infer<typeof getProductSchema>
) {
    const product = await db.query.products.findFirst({
        columns: {
        id: true,
        },
        where: and(eq(products.storeId, input.storeId), lt(products.id, input.id)),
        orderBy: desc(products.id),
    })

    if (!product) {
        throw new Error("Product not found.")
    }

    return product.id
}
*/
