import type { ChemicalConnectionDto } from '../../types/ChemicalConnection'
import type { ElementDto } from '../../types/Element'
import ElementComp from '../Element/ElementComp'
import FElementComp from '../Element/FElementComp'
import { memo } from 'react'

type ElementsTableProps = {
    Elements: ElementDto[],
    ElementOnClick: (atomicN: number) => void,
    Label: ChemicalConnectionDto | string
}

const ElementsTable = memo(function ElementsTable({
    Elements,
    ElementOnClick,
    Label
}: ElementsTableProps) {

    return (
        <div className="m-10 inline-block w-270">
            <div className="grid grid-flow-row-dense grid-cols-10 grid-rows-10 size-fit">

                <ElementComp onClickEvent={ElementOnClick} element={Elements[0]} />
                {/*Label*/}
                <div className="col-span-6 p-5 h-25">
                    {typeof Label === "string" ?
                        Label.startsWith("error") ?
                            <span className="text-red-500 text-xl">
                                {Label}
                            </span> :
                            <span className="text-5xl">
                                {Label}
                            </span> :
                        <div className="inline-flex space-x-4">
                            <span className="text-5xl">
                                {Label.formula}
                            </span>
                            <div className="inline-block italic text-xl">
                                <p>
                                    mass: {Label.mass}
                                </p>
                                <p>
                                    ({Label.name})
                                </p>
                            </div>
                        </div>
                    }
                </div>

                <ElementComp onClickEvent={ElementOnClick} element={Elements[1]} />
                <div className="col-span-2 row-span-3 p-5">
                    <h3 className="text-xl">legenda</h3>
                    <ul>
                        <li>
                            <div className="inline-block size-3 rounded-sm bg-red-500"></div>
                            <span> S elements</span>
                        </li>
                        <li>
                            <div className="inline-block size-3 rounded-sm bg-blue-500"></div>
                            <span> P elements</span>
                        </li>
                        <li>
                            <div className="inline-block size-3 rounded-sm bg-green-500"></div>
                            <span> D elements</span>
                        </li>
                        <li>
                            <div className="inline-block size-3 rounded-sm bg-amber-500"></div>
                            <span> F elements</span>
                        </li>
                        <li>
                            <div className="inline-block size-3 rounded-sm bg-violet-500"></div>
                            <span> Nobel gases and elements without electronegativity</span>
                        </li>
                    </ul>
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
                {Elements.slice(56, 70).map(el => <FElementComp onClickEvent={ElementOnClick} element={el} />)}
                {Elements.slice(88, 102).map(el => <FElementComp onClickEvent={ElementOnClick} element={el} />)}
            </div>
        </div>
    );
});

export default ElementsTable;