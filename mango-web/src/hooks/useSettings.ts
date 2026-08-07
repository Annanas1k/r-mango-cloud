import { useAppDispatch } from "@/redux/hooks"
import { toggleDetailsView, toggleViewMode } from "@/redux/settings/settingsSlice";



export const useSettings = () => {
    const dispatch = useAppDispatch();

    function handleToggleViewMode() {
        dispatch(toggleViewMode())
    }

    function handleToggleDetailsView() {
        dispatch(toggleDetailsView())
    }


    return {
        handleToggleViewMode,
        handleToggleDetailsView
    }
}