"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function getHistory() {
  const session = await auth()
  if (!session?.user?.id) return []

  const history = await prisma.history.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })
  
  return history
}

export async function saveHistory(data: {
  sourceLanguageCode?: string
  targetLanguageCode?: string
  originalText: string
  translatedText?: string
  summaryContent?: string
  type: string
  label?: string
  durationSeconds?: number
  voiceId?: string
}) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.history.create({
    data: {
      ...data,
      userId: session.user.id
    }
  })
}

export async function deleteHistory(id: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.history.delete({
    where: {
      id,
      userId: session.user.id
    }
  })
}

export async function updateHistorySummary(id: string, summaryHtml: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.history.update({
    where: {
      id,
      userId: session.user.id
    },
    data: {
      summaryContent: summaryHtml
    }
  })
}

export async function deleteAllHistory() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  return await prisma.history.deleteMany({
    where: { userId: session.user.id }
  })
}
