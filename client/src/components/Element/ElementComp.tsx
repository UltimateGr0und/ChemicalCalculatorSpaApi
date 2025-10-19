import type { ElementDto } from '../../types/Element'
import { memo } from 'react'

type ElementCompProps = {
    element: ElementDto
    onClickEvent: (AtomicN:number)=>void
}

const ElementComp = memo(function ElementComp({ element, onClickEvent }: ElementCompProps) {
    const GroupColor: { [key: number]: string } = {
        0: "bg-red-500 hover:bg-red-800",
        1: "bg-blue-500 hover:bg-blue-800",
        2: "bg-green-500 hover:bg-green-800",
        4: "bg-violet-500 hover:bg-violet-800",
    };

    console.log(element.name);

    return (
        element.isActive ?
            <div className="relative size-25 bg-zinc-500 p-2 hover:bg-zinc-600 outline-4 outline-offset-2 outline-zinc-500" onClick={() => onClickEvent(element.atomicNumber)}>
          <h4 className="text-left text-3xl text-gray-200">{ element.formula}</h4>
          <span className="absolute top-2 right-3 text-2xl text-gray-200">{ element.atomicNumber}</span>
          <span className="mt-2 break-all text-gray-200 text-xs">{ element.name}</span>
      </div> :

            <div className={`relative size-25 p-2 m-1 ${GroupColor[element.elementType]}`} onClick={() => onClickEvent(element.atomicNumber)}>
          <h4 className="text-left text-3xl text-gray-200">{ element.formula}</h4>
          <span className="absolute top-2 right-3 text-2xl text-gray-200">{ element.atomicNumber}</span>
          <span className="mt-2 break-all text-gray-200">{ element.name}</span>
      </div>
  );
});

export default ElementComp;