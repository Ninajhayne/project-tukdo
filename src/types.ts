import { Server as NetServer, Socket } from "net";

import { type z } from "zod"
import { NextServer } from "next/dist/server/next";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io"

import { Plaza, Member, Profile, Course, Listing } from "@prisma/client";
import type Stripe from "stripe"

import { type userPrivateMetadataSchema } from "@/lib/validations/auth"

import { type Icons } from "@/components/icons"

import type {
    //cartItemSchema,
    //cartLineItemSchema,
    checkoutItemSchema,
} from "@/lib/validations/cart"

//import { type FileWithPath } from "react-dropzone"
//import { type z } from "zod"

//import { type userPrivateMetadataSchema } from "@/lib/validations/auth"

/*
import { type userPrivateMetadataSchema } from "@/lib/validations/auth";
import { type z } from "zod";
*/

export type PlazaWithMembersWithProfiles = Plaza & {
    members: ( Member & { profile: Profile } )[];
};

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NextServer & {
            io: SocketIOServer;
        };
    };
};

export type UserRole = z.infer<typeof userPrivateMetadataSchema.shape.role>

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
    description?: string
}
  
export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}
  
export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[]
}
  
export interface FooterItem {
    title: string
    items: {
      title: string
      href: string
      external?: boolean
    }[]
}
  
export type MainNavItem = NavItemWithOptionalChildren
  
export type SidebarNavItem = NavItemWithChildren

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}


export interface StoredFile {
    id: string
    name: string
    url: string
}

export interface Category {
    id: string
    title: Course["categoryId"]
    image: string
    icon: React.ComponentType<{ className?: string }>
}


export interface Step {
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
}

export interface Users {
    title: string
    buttonTitle: string
    href: string
    image: string
}

export interface Members {
    name: string
    role: string
    image: string
    email: string
}

export interface ValuePropositionType {
    title: string
    description: string
    image: string
}

/*
export type CartItem = z.infer<typeof cartItemSchema>;

export type CheckoutItem = z.infer<typeof checkoutItemSchema>;

export interface CartLineItem
  extends Pick<
    Course,
    | "id"
    | "title"
    | "imageUrl"
    | "price"
    | "userId"
    | "description"
    | "isPublished"
    | "categoryId"
    | "createdAt"
    | "updatedAt"
  > {
  quantity?: number;
  storeName: string | null;
}
*/

export interface SubscriptionPlan {
    id: "basic" | "standard" | "pro"
    name: string
    description: string
    features: string[]
    stripePriceId: string
    price: number
}

export type CheckoutItem = z.infer<typeof checkoutItemSchema>

export type StripePaymentStatus = Stripe.PaymentIntent.Status

export interface UserSubscriptionPlan extends SubscriptionPlan {
    stripeSubscriptionId?: string | null
    stripeCurrentPeriodEnd?: string | null
    stripeCustomerId?: string | null
    isSubscribed: boolean
    isCanceled: boolean
    isActive: boolean
}

export type MentorWithListing = Profile & {
    listing: Listing;
} 


