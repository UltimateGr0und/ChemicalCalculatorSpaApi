import { useState, createContext, useCallback, useEffect, useMemo } from 'react'
import type { ChemicalConnectionDto } from '../types/ChemicalConnection'
import type { ElementDto } from '../types/Element'
import { fetchElements, fetchConnection } from '../api/Elements';

/* eslint-disable react-refresh/only-export-components */

type ElementsContextType = {
    elements: ElementDto[];
};

type ElementsActionsType = {
    currentConnection: ChemicalConnectionDto | string;
    elementOnClickAction: (atomicNumber: number) => void;
};

export const ElementsContext = createContext<ElementsContextType | null>(null);
export const ElementsActionsContext = createContext<ElementsActionsType | null>(null);

export const ElementsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [elements, setElements] = useState<ElementDto[]>([]);
    const [activeElements, setActiveElements] = useState<number[]>([]);
    const [currentConnection, setCurrentConnection] = useState<ChemicalConnectionDto | string>("no data");

    const toggleActive = useCallback((atomicNumber: number) => {
        if (elements) {
            setElements(prev =>
                prev?.map(el =>
                    el.atomicNumber === atomicNumber ? { ...el, isActive: !el.isActive } : el
                )
            );
        }
    }, [elements])

    const elementOnClickAction = useCallback((atomicNumber: number) => {
        const el: ElementDto | undefined = elements?.find(el => el.atomicNumber == atomicNumber);
        if (el === undefined) {
            console.log("error");
            return
        }
        toggleActive(atomicNumber)
        if (activeElements.includes(atomicNumber)) {
            setActiveElements(prev => prev.filter(el => el != atomicNumber));
            setCurrentConnection("Choose two elements");
        } else {
            setActiveElements([...activeElements, atomicNumber]);
        }
    }, [elements, activeElements, toggleActive]);

    useEffect(() => {
        const tryFetch = async () => {
            try {
                const data = await fetchElements();
                setElements(data);
            } catch (e) {
                console.log(e);
            }
        }
        tryFetch();
    }, []);

    useEffect(() => {
        if (activeElements.length > 2) {
            toggleActive(activeElements[0]);
            setActiveElements([...(activeElements.slice(1, 3))]);
        }

        const tryFetch = async (first: number, second: number) => {
            try {
                const data = await fetchConnection(first, second);
                setCurrentConnection(data);
            } catch (e) {
                console.log(e);
            }
        }

        if (activeElements && activeElements.length >= 2) {
            tryFetch(activeElements.at(-1), activeElements.at(-2));
        }
    }, [activeElements, setActiveElements, toggleActive, setCurrentConnection]);

    const values = useMemo(
        () => ({ elements }),
        [elements]
    );

    const actions = useMemo(
        () => ({ currentConnection, elementOnClickAction }),
        [currentConnection, elementOnClickAction] 
    );

    return (
        <ElementsContext.Provider value={values}>
            <ElementsActionsContext.Provider value={actions}>
                {children}
            </ElementsActionsContext.Provider>
        </ElementsContext.Provider>
    );
};

