import { useState, useEffect, useCallback } from 'react'
import type { ElementDto } from '../../types/Element'
import type { ChemicalConnectionDto } from '../../types/ChemicalConnection'
import ElementsTable from '../ElementsTable/ElementsTable'



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

        const fetchElements = async () => {
            const res = await fetch("https://localhost:7211/api/elements");
            const data: ElementDto[] = await res.json();
            const elements: ElementDto[] = data.map((el: Omit<ElementDto, "isActive">) => ({
                ...el,
                isActive: false,
            }));
            setElements(elements);
        };

        fetchElements();
    }, []);

    useEffect(() => {
        if (ActiveElements.length > 2) {
            toggleActive(ActiveElements[0]);
            setActiveElements([...(ActiveElements.slice(1, 3))]);
        }

        const fetchConnection = async (first: number, second: number) => {
            const url = `https://localhost:7211/api/connection/${first}/${second}`
            const res = await fetch(url);
            if (res.ok) {
                const data: ChemicalConnectionDto = await res.json();
                setCurrentConnection(data);
                console.log(data);
            } else {
                const error = "error: "+await res.text();
                setCurrentConnection(error);
            }

        }
        if (ActiveElements && ActiveElements.length >= 2) {
            fetchConnection(ActiveElements.at(-1), ActiveElements.at(-2));
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

    }, [elements,ActiveElements,setActiveElements,toggleActive]);



    return (
        <div className="bg-zinc-700 text-white inline-block">
            {elements ? <ElementsTable ElementOnClick={elementOnClickAction} Elements={elements} Label={
                CurrentConnection
            } /> : "nodata"}
        </div>
    )
}

export default ChemicalCalculator;