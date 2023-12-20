"use client"

import * as React from "react"
import axios from "axios"
import type { z } from "zod"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { catchClerkError, getFirstNameFromEmail } from "@/lib/utils"
import { verfifyEmailSchema } from "@/lib/validations/auth"
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

type Inputs = z.infer<typeof verfifyEmailSchema>

export function VerifyEmailForm() {
    const router = useRouter()
    const { isLoaded, signUp, setActive } = useSignUp()
    const [isPending, startTransition] = React.useTransition()

    // react-hook-form
    const form = useForm<Inputs>({
        resolver: zodResolver(verfifyEmailSchema),
        defaultValues: {
            code: "",
        },
    })

    function onSubmit(data: Inputs) {
        if (!isLoaded) return

        startTransition(async () => {
            try {
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: data.code,
                })

                if (completeSignUp.status !== "complete") {
                    /*  investigate the response, to see if there was an error
                        or if the user needs to complete more steps.*/
                    console.log(JSON.stringify(completeSignUp, null, 2))
                }
                if (completeSignUp.status === "complete") {

                    console.log("The Data:", completeSignUp);
                    const firstName = completeSignUp.firstName || getFirstNameFromEmail(completeSignUp.emailAddress!);

                    const response = await axios.post("/api/clerkUser", 
                    {
                        emailAddress: completeSignUp.emailAddress,
                        createdUserId: completeSignUp.createdUserId,
                        firstName,
                    });

                    await setActive({ session: completeSignUp.createdSessionId })
                    router.push(`${window.location.origin}/`)
                }
            } catch (err) {
                catchClerkError(err)
                console.log(err);
            }
        })
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
                autoComplete="off"
            >
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Verification Code</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.trim()
                                        field.onChange(e)
                                    }}
                                />
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
                    Create account
                    <span className="sr-only">Create account</span>
                </Button>
            </form>
        </Form>
    )
}
