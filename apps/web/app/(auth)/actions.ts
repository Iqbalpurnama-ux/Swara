"use server"

import { signIn } from "@/lib/auth"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
})

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email")
  const result = loginSchema.safeParse({ email })

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors, email: email?.toString() }
  }

  await signIn("resend", { email: result.data.email, redirectTo: "/dashboard" })
  return { success: true }
}

const registerSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().min(1, "Email harus diisi").email("Format email tidak valid"),
})

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name")
  const email = formData.get("email")
  
  const result = registerSchema.safeParse({ name, email })

  if (!result.success) {
    return { 
      errors: result.error.flatten().fieldErrors, 
      name: name?.toString(),
      email: email?.toString() 
    }
  }

  // NextAuth Resend provider just needs email.
  await signIn("resend", { email: result.data.email, redirectTo: "/dashboard" })
  return { success: true }
}

export async function googleLoginAction() {
  await signIn("google", { redirectTo: "/dashboard" })
}
