import type { ElementDto } from '../../types/Element'
import { memo } from 'react'

type ElementCompProps = {
    element: ElementDto
    onClickEvent: (AtomicN: number) => void
}

const FElementComp = memo(function FElementComp({
    element,
    onClickEvent
}: ElementCompProps) {

    return (
        element.isActive ?
            <div className="relative size-17 m-1 bg-zinc-500 hover:bg-zinc-600 outline-4 outline-offset-2 outline-zinc-500" onClick={() => onClickEvent(element.atomicNumber)}>
                <h4 className="text-left text-2xl text-gray-200">{element.formula}</h4>
                <span className="absolute top-2 right-3 text-sm text-gray-200">{element.atomicNumber}</span>
                <span className="mt-2 text-gray-200 text-xs break-all ">{element.name}</span>
            </div> :

            <div className="relative size-17 m-1 bg-amber-500 hover:bg-amber-800" onClick={() => onClickEvent(element.atomicNumber)}>
                <h4 className="text-left text-2xl text-gray-200">{element.formula}</h4>
                <span className="absolute top-2 right-3 text-sm text-gray-200">{element.atomicNumber}</span>
                <span className="mt-2 text-gray-200 text-xs break-all ">{element.name}</span>
            </div>
    );
});

export default FElementComp;