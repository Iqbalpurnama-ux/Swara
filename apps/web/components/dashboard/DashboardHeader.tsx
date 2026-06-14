"use client"

import { useTranslation } from "@/lib/i18n"

export function DashboardHeader({ name }: { name: string }) {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-2 pt-4 pb-2">
      <h1 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
        {t("dashboard.welcome")}
        <br className="md:hidden" />
        <span className="text-blue-600 dark:text-blue-400"> {name}</span>
      </h1>
      <p className="text-slate-500 dark:text-slate-400 font-medium text-[16px] md:text-[18px]">
        {t("dashboard.subtitle")}
      </p>
    </div>
  )
}
