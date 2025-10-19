import { useContext } from "react";
import { ElementsActionsContext } from "../context/ElementsContext";

export const useElementsActions = () => {
    const elementsActionContext = useContext(ElementsActionsContext);

    if (!elementsActionContext) {
        throw new Error('useElementsActions must be used within a ElementsActionsProvider');
    }

    return elementsActionContext;
}