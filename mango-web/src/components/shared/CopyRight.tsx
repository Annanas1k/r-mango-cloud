import { useTranslation } from "react-i18next"
import { FiGithub } from "react-icons/fi";



export const CopyRight = () => {
    const {t} = useTranslation('footer')
      const year = new Date().getFullYear();

    return (
        <div className="flex flex-col  items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} rMangoCloud. {t("footer.rights")}
          </p>
          <a href="https://github.com/Annanas1k" className="flex items-center gap-1 justify-center">{t("footer.madeWith")}<FiGithub /></a>
        </div>
    )
}