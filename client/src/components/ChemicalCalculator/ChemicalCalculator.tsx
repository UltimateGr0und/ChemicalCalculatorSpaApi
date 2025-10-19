import { useState, useEffect, useCallback } from 'react'
import type { ElementDto } from '../../types/Element'
import type { ChemicalConnectionDto } from '../../types/ChemicalConnection'
import ElementsTable from '../ElementsTable/ElementsTable'
import { fetchElements, fetchConnection } from '../../api/Elements'



function ChemicalCalculator() {

    const [elements, setElements] = useState<ElementDto[]>();
    const [ActiveElements, setActiveElements] = useState<number[]>([]);
    const [CurrentConnection, setCurrentConnection] = useState<ChemicalConnectionDto | string>("");

    const toggleActive = useCallback((id: number) => {
        if (elements) {
            setElements(prev =>
                prev?.map(el =>
                    el.atomicNumber === id ? { ...el, isActive: !el.isActive } : el
                )
            );
        }
    }, [elements, setElements]);

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
        if (ActiveElements.length > 2) {
            toggleActive(ActiveElements[0]);
            setActiveElements([...(ActiveElements.slice(1, 3))]);
        }

        const tryFetch = async (first: number, second: number) => {
            try {
                const data = await fetchConnection(first,second);
                setCurrentConnection(data);
            } catch (e) {
                console.log(e);
            }
        }

        if (ActiveElements && ActiveElements.length >= 2) {
            tryFetch(ActiveElements.at(-1), ActiveElements.at(-2));
        }
    }, [ActiveElements, setActiveElements, toggleActive, setCurrentConnection]);

    const elementOnClickAction = useCallback((atomicN: number) => {
        const el: ElementDto | undefined = elements?.find(el => el.atomicNumber == atomicN);
        if (el === undefined) {
            console.log("error");
            return
        }
        toggleActive(atomicN)
        if (ActiveElements.includes(atomicN)) {
            setActiveElements(prev => prev.filter(el => el != atomicN));
            setCurrentConnection("Choose two elements");
        } else {
            setActiveElements([...ActiveElements, atomicN]);
        }

    }, [elements, ActiveElements, setActiveElements, toggleActive]);

    return (
        <div className="bg-zinc-700 text-white inline-block">
            {elements ? <ElementsTable ElementOnClick={elementOnClickAction} Elements={elements} Label={
                CurrentConnection
            } /> : "nodata"}
        </div>
    )
}

export default ChemicalCalculator;