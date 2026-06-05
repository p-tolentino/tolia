"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import {
  signInWithGoogle,
  signInWithAgentCode,
  requestPasswordSetup,
} from "@/app/actions/auth"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { loginSchema, firstTimeSchema, type LoginFormValues, type FirstTimeFormValues } from "@/lib/schemas/auth"

function LoginForm() {
  const [showFirstTime, setShowFirstTime] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const toastShownRef = useRef(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { agentCode: "", password: "" },
  })

  const firstTimeForm = useForm<FirstTimeFormValues>({
    resolver: zodResolver(firstTimeSchema),
    defaultValues: { agentCode: "" },
  })

  const errorParam = searchParams.get("error")
  const errorMessage =
    errorParam === "no_agent_found"
      ? "No agent data found for this Google account. If you believe this is a mistake, please contact the branch manager for assistance."
      : null

  useEffect(() => {
    if (errorParam === "no_agent_found" && !toastShownRef.current) {
      toast.error(errorMessage)
      toastShownRef.current = true
    }
    if (errorParam !== "no_agent_found") {
      toastShownRef.current = false
    }
  }, [errorParam, errorMessage])

  function loginErrorMessage(code: string): string {
    if (code === "no_account") {
      return "No account found for this agent code. Please set up your password using the link below."
    }
    if (code === "wrong_password") {
      return "Incorrect password. If you forgot it, reset your password using the link below."
    }
    return code
  }

  async function onLogin(values: LoginFormValues) {
    const result = await signInWithAgentCode(values.agentCode, values.password)
    if (result?.error) {
      const msg = loginErrorMessage(result.error)
      loginForm.setError("root", { message: msg })
    }
    if (result?.success) {
      toast.success("Signed in successfully")
      router.push("/")
      router.refresh()
    }
  }

  async function onFirstTime(values: FirstTimeFormValues) {
    const result = await requestPasswordSetup(values.agentCode)
    if (result?.error) {
      firstTimeForm.setError("root", { message: result.error })
      toast.error(result.error)
    }
    if (result?.success) {
      firstTimeForm.setError("root", { message: "" })
      toast.success(result.success)
    }
  }

  const loginPending = loginForm.formState.isSubmitting
  const firstTimePending = firstTimeForm.formState.isSubmitting

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <Image
            src="/tolia-full.png"
            alt="TOLIA login page"
            className="mx-auto h-10 w-auto"
            height={1000}
            width={1000}
          />
          <h1 className="mt-4 text-lg font-semibold sm:text-xl">Sign in</h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            {showFirstTime
              ? "Enter your agent code to receive a password setup or reset link."
              : "Sign in with your Google account or agent credentials."}
          </p>
        </div>

        {!showFirstTime && (
          <>
            <Button
              variant="outline"
              className="w-full"
              disabled={loginPending}
              onClick={() => {
                signInWithGoogle(`${window.location.origin}/auth/callback`).then((result) => {
                  if (result.url) window.location.href = result.url
                })
              }}
            >
              {loginPending && <Spinner className="mr-2 size-4" />}
              {!loginPending && <svg className="mr-2 size-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>}
              Sign in with Google
            </Button>

            <div className="relative">
              <Separator />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                or
              </span>
            </div>
          </>
        )}

        {showFirstTime ? (
          <Form {...firstTimeForm}>
            <form onSubmit={firstTimeForm.handleSubmit(onFirstTime)} className="space-y-4">
              <FormField
                control={firstTimeForm.control}
                name="agentCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 71234567" autoCapitalize="none" autoCorrect="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {firstTimeForm.formState.errors.root?.message && (
                <p className="text-sm text-destructive">{firstTimeForm.formState.errors.root.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={firstTimePending}>
                {firstTimePending && <Spinner className="mr-2 size-4" />}
                Send Setup Link
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="agentCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 71234567" autoCapitalize="none" autoCorrect="off" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginForm.formState.errors.root?.message && (
                <p className="text-sm text-destructive">{loginForm.formState.errors.root.message}</p>
              )}

              <Button type="submit" className="w-full" disabled={loginPending}>
                {loginPending && <Spinner className="mr-2 size-4" />}
                Sign in
              </Button>
            </form>
          </Form>
        )}

        <p className="text-center text-sm text-muted-foreground">
          {showFirstTime ? (
            <>
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => {
                  setShowFirstTime(false)
                  loginForm.setError("root", { message: "" })
                  loginForm.reset()
                }}
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setShowFirstTime(true)
                  firstTimeForm.setError("root", { message: "" })
                  firstTimeForm.reset()
                }}
                className="text-muted-foreground underline-offset-4"
              >
                Trouble signing in?{" "}
                <span className="font-medium text-primary hover:cursor-pointer hover:underline">
                  Set up or reset your password
                </span>
              </button>
            </>
          )}
        </p>

        <p className="text-center text-xs text-muted-foreground">
          Still having trouble? Contact the branch manager for assistance.
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
