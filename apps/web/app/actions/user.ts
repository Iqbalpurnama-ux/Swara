"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { unstable_noStore as noStore } from "next/cache"

export async function upgradeUserToPremium() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  // Update user role to premium
  await prisma.user.update({
    where: { id: session.user.id },
    data: { role: "premium" }
  })

  // Create a fake subscription record for demo purposes
  await prisma.subscription.upsert({
    where: { userId: session.user.id },
    update: {
      planType: "Premium Bulanan",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      status: "active",
      midtransOrderId: "demo-" + Math.random().toString(36).substring(7)
    },
    create: {
      userId: session.user.id,
      planType: "Premium Bulanan",
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "active",
      midtransOrderId: "demo-" + Math.random().toString(36).substring(7)
    }
  })

  return { success: true }
}

export async function getUserRole() {
  noStore()
  const session = await auth()
  if (!session?.user?.id) return "regular"
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true }
  })
  return dbUser?.role || "regular"
}
