import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image";

import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { CheckIcon } from "lucide-react"

import { storeSubscriptionPlans } from "@/config/subscriptions"
import { cn, formatDate, formatPriceV2 } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
//import { ManageSubscriptionForm } from "@/components/forms/manage-subscription-form"
import {
    PageHeader,
    PageHeaderDescription,
    PageHeaderHeading,
} from "@/components/page-header"
import { Shell } from "@/components/shells/shell"
//import { getSubscriptionPlanAction } from "@/app/_actions/stripe"

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
    title: "Billing | TUKDO",
    description: "Manage your billing and subscription",
}

export default async function BillingPage() {
    const user = await currentUser()

    if (!user) {
        redirect("/signin")
    }

    //const subscriptionPlan = await getSubscriptionPlanAction(user.id)

    return (
        <Shell variant="sidebar" as="div">
        <PageHeader id="billing-header" aria-labelledby="billing-header-heading" className="rounded-lg shadow-sm bg-[#F2602D] flex items-center gap-x-2">
            <div className="p-6">
                <PageHeaderHeading size="sm" className="text-[#FFFFFF] mb-2">Billing</PageHeaderHeading>
                <PageHeaderDescription size="sm" className="text-[#FFFFFF]">
                    Manage your billing and subscription
                </PageHeaderDescription>
            </div>
            <div className="ml-auto flex-shrink- mr-6">
                <Image
                    src="/images/header/boy.png"
                    alt=""
                    width={100}
                    height={100}
                    className="w-32 h-28 object-cover"
                    loading="lazy"
                />
            </div>
        </PageHeader>
        <section
            id="billing-info"
            aria-labelledby="billing-info-heading"
            className="space-y-5"
        >
            <h2 className="text-xl font-semibold sm:text-2xl">Billing info</h2>
            <Card className="grid gap-4 p-6">
                <h3 className="text-lg font-semibold sm:text-xl">
                    Basic
                </h3>
                <p className="text-sm text-muted-foreground">
                    Upgrade to create more courses
                </p>
            </Card>
        </section>
        <section
            id="subscription-plans"
            aria-labelledby="subscription-plans-heading"
            className="space-y-5 pb-2.5"
        >
            <h2 className="text-xl font-semibold sm:text-2xl">
            Subscription plans
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {storeSubscriptionPlans.map((plan, i) => (
                <Card
                key={plan.name}
                className={cn(
                    "flex flex-col",
                    i === storeSubscriptionPlans.length - 1 &&
                    "lg:col-span-2 xl:col-span-1",
                    i === 1 && "border-primary shadow-md"
                )}
                >
                <CardHeader>
                    <CardTitle className="line-clamp-1">{plan.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                    {plan.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid flex-1 place-items-start gap-6">
                    <div className="text-3xl font-bold">
                    {formatPriceV2(plan.price, {
                        currency: "USD",
                    })}
                    <span className="text-sm font-normal text-muted-foreground">
                        /month
                    </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        <span>{feature}</span>
                        </div>
                    ))}
                    </div>
                </CardContent>
                <CardFooter className="pt-4">
                    {plan.id === "basic" ? (
                    <Link
                        href="/dashboard/mentor/profile"
                        className={cn(
                        buttonVariants({
                            className: "w-full",
                        })
                        )}
                    >
                        Get started
                        <span className="sr-only">Get started</span>
                    </Link>
                    ) : (
                    <Button className="w-full">
                        Subscribe
                    </Button>
                    )}
                </CardFooter>
                </Card>
            ))}
            </div>
        </section>
        </Shell>
    )
}
