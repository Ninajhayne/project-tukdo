import type { FooterItem, MainNavItem } from "@/types"

export type SiteConfig = typeof siteConfig

const links = {
  twitter: "https://twitter.com",
  github: "https://github.com",
  githubAccount: "https://github.com",
  discord: "https://discord.com",
}

export const siteConfig = {
  name: "Tukdo",
  description:
    "An E-Learning Community Platform",
  url: "https://tukdo.vercel.app",
  ogImage: "https://tukdo.vercel.app/opengraph-image.png",
  mainNav: [
    {
      title: "Menu",
      items: [
        {
          title: "Courses",
          href: "/courses",
          description: "All the courses we have to offer.",
          items: [],
        },
        {
          title: "Find Tutors",
          href: "/listings",
          description: "Find tutors near you",
          items: [],
        },
        {
          title: "Become Tutor",
          href: "/dashboard/mentor/profile",
          description: "",
          items: [],
        },
        {
          title: "About",
          href: "/about-page",
          description: "",
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  links,
  
  footerNav: [
    /*
    {
      title: "Tech Stack",
      items: [
        {
          title: "Next.js",
          href: "https://nextjs.org/",
          external: true,
        },
        {
          title: "Tailwind CSS",
          href: "https://tailwindcss.com/",
          external: true,
        },
        {
          title: "uploadthing",
          href: "https://uploadthing.com/",
          external: true,
        },
        {
          title: "React",
          href: "https://react.dev/",
          external: true,
        },
        {
          title: "Typescript",
          href: "https://www.typescriptlang.org/",
          external: true,
        },
      ],
    },
    */
    {
      title: "Links",
      items: [
        {
          title: "About",
          href: "/",
          external: false,
        },
        {
          title: "Careers",
          href: "/",
          external: false,
        },
        {
          title: "Contact",
          href: "/",
          external: false,
        },
        {
          title: "Terms",
          href: "/",
          external: false,
        },
        {
          title: "Privacy",
          href: "/",
          external: false,
        },
      ],
    },
    {
      title: "Social",
      items: [
        {
          title: "Twitter",
          href: links.twitter,
          external: true,
        },
        {
          title: "GitHub",
          href: links.githubAccount,
          external: true,
        },
        {
          title: "Discord",
          href: links.discord,
          external: true,
        },
      ],
    },
    /*
    {
      title: "Team",
      items: [
        {
          title: "Nikki Dominique Abogadie",
          href: "/experiments/about",
          external: false,
        },
        {
          title: "Barbhea Acosta",
          href: "/experiments/about",
          external: false,
        },
        {
          title: "Claude Allen Belgado",
          href: "/experiments/about",
          external: false,
        },
        {
          title: "Niña Jhayne Boral",
          href: "/experiments/about",
          external: false,
        },
      ],
    },
    */
  ] satisfies FooterItem[],
  
}
