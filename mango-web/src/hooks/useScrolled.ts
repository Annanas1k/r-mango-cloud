import { useEffect, useState } from "react"


export const useScrolled = (threshold: number = 60) => {
    const [scrolled, setScrolled] = useState<boolean>(false)

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > threshold)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        handleScroll()

        return () => window.removeEventListener("scroll", handleScroll)
    }, [threshold])

    return scrolled
}