"use server"

import { auth } from "@/lib/auth"
import { PrismaClient } from "@prisma/client"
import { redirect } from "next/navigation"

const prisma = new PrismaClient()

export async function completeOnboardingAction(language: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { 
        onboardingCompleted: true,
        defaultLanguage: language 
      }
    })
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || String(error) }
  }
}
