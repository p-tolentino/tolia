"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { updateUserPassword } from "@/app/actions/auth"
import { toast } from "sonner"
import { passwordSchema, type PasswordFormValues } from "@/lib/schemas/auth"

export default function UpdatePasswordPage() {
  const router = useRouter()

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: "", confirm: "" },
  })

  async function onSubmit(values: PasswordFormValues) {
    const result = await updateUserPassword(values.password)
    if (result.error) {
      form.setError("root", { message: result.error })
      return
    }
    toast.success("Password set successfully")
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Image
            src="/tolia-full.png"
            alt="TOLIA set password"
            className="mx-auto h-10 w-auto"
            height={1000}
            width={1000}
          />
          <h1 className="mt-4 text-lg font-semibold sm:text-xl">Set your password</h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Choose a strong password for your account.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="At least 6 characters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root?.message && (
              <p className="text-sm text-destructive">{form.formState.errors.root.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Spinner className="mr-2 size-4" />}
              Set Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
