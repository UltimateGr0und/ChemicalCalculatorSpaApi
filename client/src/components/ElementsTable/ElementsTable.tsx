import type { ReactNode } from 'react'
import type { Element } from '../../types/Element'
import ElementComp from '../Element/ElementComp'
import FElementComp from '../Element/FElementComp'

type ElementsTableProps = {
    Elements: Element[],
    ElementOnClick: (atomicN: number) => void,
    Label: ReactNode
}

function ElementsTable({
    Elements,
    ElementOnClick,
    Label
}:ElementsTableProps) {

    return (
      <div className="m-10">
          <div className="grid grid-flow-row-dense grid-cols-10 grid-rows-10 size-fit">
          
               <ElementComp onClickEvent={ ElementOnClick } element={Elements[0]} />
              <div className="col-span-6 p-5">
                    <h1 className="text-5xl">{ Label}</h1> 
              </div>
                <ElementComp onClickEvent={ElementOnClick} element={Elements[1]} />
              <div className="col-span-2 row-span-3 border">
              legenda
              </div>
                {Elements.slice(2, 36).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
              <div className="col-span-2"></div>
                {Elements.slice(36, 54).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
              <div className="col-span-2"></div>
                {Elements.slice(54, 56).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
                {Elements.slice(70, 86).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
              <div className="col-span-2"></div>
                {Elements.slice(86, 88).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
                {Elements.slice(102, 118).map(el => <ElementComp onClickEvent={ElementOnClick} element={el} />)}
              <div className="col-span-2"></div>                   
          </div>

          <div className="grid grid-flow-row-dense grid-cols-14 grid-rows-2 size-fit">
            {Elements.slice(56, 70).map(el => <FElementComp element={el} />)}
            {Elements.slice(88, 102).map(el => <FElementComp element={el} />)}
          </div>
      </div>
  );
}

export default ElementsTable;