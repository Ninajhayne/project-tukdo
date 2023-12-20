
import { type SubscriptionPlan } from "@/types"

export const storeSubscriptionPlans: SubscriptionPlan[] = [
    {
        id: "basic",
        name: "Basic",
        description: "Perfect for creators.",
        features: ["Create up to 5 courses", "Unlimited number of views"],
        stripePriceId: "",
        price: 0,
    },
    {
        id: "standard",
        name: "Standard",
        description: "Perfect for creators that want to scale.",
        features: ["Unlimited number of courses", "No Ads", "30-day moneyback guarantee"],
        stripePriceId: process.env.STRIPE_STD_MONTHLY_PRICE_ID!,
        price: 10,
    },
    {
        id: "pro",
        name: "Enterprise",
        description: "Perfect for big businesses.",
        features: ["Everything from the Standard Plan", "Better bulk pricing"],
        stripePriceId: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
        price: 20,
    },
]
