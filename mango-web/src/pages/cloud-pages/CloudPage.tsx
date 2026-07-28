import { ContextMenuBasic } from "@/components/shared/ContextMenuBasic"
import { useTranslation } from "react-i18next"

export const CloudPage = () => {
    const {t} = useTranslation('cloud-page')
    return (
        <main className="flex flex-col w-full gap-4 h-full">
            <h1 className="text-4xl w-full">{t('cloud-page.title')}</h1>
            <ContextMenuBasic>
                <div className="w-full h-full flex-1 bg-gray-50">
                    file explorere
                </div>
            </ContextMenuBasic>
        </main>
    )
}