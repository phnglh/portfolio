'use client'
import MainLayout from "@/components/layout/main-layout";
import {useTranslations} from "@stackhub/i18n/client"
type PageProps = {
 error: Error & { digest?: string };
  reset: () => void;
}
const Page = (props: PageProps) => {
const {error, reset} = props
const t = useTranslations()
return (
  <MainLayout>
    <h1> {t("error.something-went-wrong")}</h1>
    <button onClick={reset}></button>
    <p className="break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
          {error.message}
    </p>
  </MainLayout>
)
}

export default Page
