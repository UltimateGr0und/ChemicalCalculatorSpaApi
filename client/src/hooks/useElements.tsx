import { useContext } from "react";
import { ElementsContext } from "../context/ElementsContext";

export const useElements = () => {
    const elementsContext = useContext(ElementsContext);

    if (!elementsContext) {
        throw new Error('useElements must be used within a ElementsProvider');
    }
    
    return elementsContext;
}