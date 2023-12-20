import type { Category, Option } from "@/types"

import { BackpackIcon } from "lucide-react"

import { Icons } from "@/components/icons"

export const sortOptions = [
    { label: "Date: Old to new", value: "createdAt.asc" },
    {
        label: "Date: New to old",
        value: "createdAt.desc",
    },
    { label: "Price: Low to high", value: "price.asc" },
    { label: "Price: High to low", value: "price.desc" },
    {
        label: "Alphabetical: A to Z",
        value: "name.asc",
    },
    {
        label: "Alphabetical: Z to A",
        value: "name.desc",
    },
]

export const courseCategories = [
    {
        id: "74c287bb-0524-4fb6-8c88-9833fe99d7e5",
        title: "Academics",
        image: "/images/categories/Academics.webp",
        icon: Icons.academicsCategory,
    },
    {
        id: "0c620e68-8ccf-4917-9cf2-d10526e822ab",
        title: "Business",
        image: "/images/categories/Business.webp",
        icon: Icons.businessCategory,
    },
    {
        id: "bdc0f251-b326-48a6-a11e-954e2d07b7a6",
        title: "Computer Science",
        image: "/images/categories/ComputerScience.webp",
        icon: Icons.computerScienceCategory,
    },
    {
        id: "64098a40-4e11-4585-8eb5-cfe03f10ee55",
        title: "Design",
        image: "/images/categories/Design.webp",
        icon: Icons.designCategory,
    },
    {
        id: "096b081c-0d2e-49e0-99e1-773b9d256182",
        title: "Filming",
        image: "/images/categories/Filming.webp",
        icon: Icons.filmingCategory,
        },
    {
        id: "f327a47d-e375-4966-82a1-a8681dfcd3fb",
        title: "Language",
        image: "/images/categories/Language.webp",
        icon: Icons.languageCategory,
    },
    {
        id: "85162c5f-7566-4bf7-927b-910a2b72b5a3",
        title: "Music",
        image: "/images/categories/Music.webp",
        icon: Icons.musicCategory,
    },
    {
        id: "2cffdc60-2c1d-4b7f-87bb-feb50c9323f3",
        title: "Photography",
        image: "/images/categories/Photography.webp",
        icon: Icons.photographyCategory,
    },
] satisfies Category[]

export const productTags = [
    "new",
    "sale",
    "bestseller",
    "featured",
    "popular",
    "trending",
    "limited",
    "exclusive",
]