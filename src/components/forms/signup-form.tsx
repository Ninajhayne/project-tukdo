"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

//import { catchClerkError } from "@/lib/utils"
import { authSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"

type Inputs = z.infer<typeof authSchema>

export function SignUpForm() {
    const router = useRouter()
    const { isLoaded, signUp } = useSignUp()
    const [isPending, startTransition] = React.useTransition()

    // react-hook-form
    const form = useForm<Inputs>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: Inputs) {
        if (!isLoaded) return

        startTransition(async () => {
        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
            })

            // Send email verification code
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            })

            router.push("/sign-up/verify-email")
            toast.message("Check your email", {
                description: "We sent you a 6-digit verification code.",
            })
        } catch (err: any) {
            //catchClerkError(err)
            toast.error(err.errors[0]?.longMessage)
        }
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email Address <span className="text-[#ff0000]">*</span></FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Password <span className="text-[#ff0000]">*</span></FormLabel>
                        <FormControl>
                            <PasswordInput {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Continue
                    <span className="sr-only">Continue to email verification page</span>
                </Button>
            </form>
        </Form>
    )
}
