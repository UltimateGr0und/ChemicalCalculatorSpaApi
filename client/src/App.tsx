import { useState,useEffect } from 'react'
import type { Element } from './types/Element'
import ElementsTable from './components/ElementsTable/ElementsTable'

function App() {

    const [elements, setElements] = useState<Element[] | null>(null);
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
    },[]);


  return (
    <div className="bg-zinc-800 text-white p-10">
      <h1>Chemical elements</h1>
          {elements ? <ElementsTable Elements={elements} /> : "nodata"}
    </div>
  )
}

export default App
