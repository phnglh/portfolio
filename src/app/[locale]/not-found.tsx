import MainLayout from "@/components/layout/main-layout"
import { useTranslations } from "next-intl"

const Page = () => {
  const t = useTranslations()
  return <MainLayout>
    <h1 className="text-3xl">{t("not-found")}</h1>
  </MainLayout>
}

export default Page
