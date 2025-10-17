import { useState,useEffect,useCallback } from 'react'
import type { Element } from './types/Element'
import ElementsTable from './components/ElementsTable/ElementsTable'

type ChemicalConnection = {
    formula: string,
    name: string,
    mass:number
}

function App() {

    const [elements, setElements] = useState<Element[]>();
    const [ActiveElements, setActiveElements] = useState<Element[]>([]);
    const [CurrentConnection, setCurrentConnection] = useState<ChemicalConnection|null>(null);
    const toggleActive = useCallback((id: number) => {
        if (elements) {
            setElements(prev =>
                prev?.map(el =>
                    el.atomicNumber === id ? { ...el, isActive: !el.isActive } : el
                )
            );
        }
    }, [elements, setElements])
    useEffect(() => {

        const fetchElements = async () => {
            const res = await fetch("https://localhost:7211/api/elements");
            const data: Element[] = await res.json();
            const elements: Element[] = data.map((el: Omit<Element, "isActive">) => ({
                ...el,
                isActive: false,
            }));
            setElements(elements);
        };

        fetchElements();
    }, []);

    useEffect(() => {
        if (ActiveElements.length > 2) {
            toggleActive(ActiveElements[0].atomicNumber)
            setActiveElements([...(ActiveElements.slice(1, 3))])
        }
        const fetchConnection = async (first:number,second:number) => {
            const res = await fetch(`https://localhost:7211/api/connection/${first}/${second}`);
            const data: ChemicalConnection = await res.json();
            setCurrentConnection(data)
            console.log(data);
        } 
        if (ActiveElements && ActiveElements.length>=2) {
            fetchConnection(ActiveElements.at(-1).atomicNumber, ActiveElements.at(-2).atomicNumber);
        }
    }, [ActiveElements,setActiveElements,toggleActive,setCurrentConnection])

    const SetElementActive = (atomicN: number) => {
        //console.log("event handler");
        const el: Element | undefined = elements?.find(el => el.atomicNumber == atomicN);
        if (el===undefined) {
            console.log("error");
            return
        }

        toggleActive(atomicN)
        setActiveElements([...ActiveElements, el])
    }



  return (
    <div className="bg-zinc-800 text-white p-10">
      <h1>Chemical elements</h1>
          {elements ? <ElementsTable ElementOnClick={SetElementActive} Elements={elements} Label={CurrentConnection?.formula } /> : "nodata"}
    </div>
  )
}

export default App
