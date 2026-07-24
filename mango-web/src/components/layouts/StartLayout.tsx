import { Outlet } from "react-router"
import {StartHeader} from "../shared/StartHeader"
import { StartFooter } from "../shared/StartFooter"

export const StartLayout = () => {
    return (
        <div>
            {/* header */}
            <StartHeader />
            <main>
                <Outlet />
            </main>
            <StartFooter />
        </div>
    )
}