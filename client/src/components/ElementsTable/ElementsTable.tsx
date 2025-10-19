import { useElements } from '../../hooks/useElements'
import ElementComp from '../Element/ElementComp'
import FElementComp from '../Element/FElementComp'
import { memo } from 'react'

//type ElementsTableProps = { }

const ElementsTable = memo(function ElementsTable() {
    console.log('table render')
    const { elements, currentConnection } = useElements();

    if (elements.length == 0) {
        return "loading";
    }
    return (
        <div className="m-10 inline-block w-270">
            <div className="grid grid-flow-row-dense grid-cols-10 grid-rows-10 size-fit">

                <ElementComp element={elements[0]} />
                {/*Label*/}
                <div className="col-span-6 p-5 h-25">
                    {typeof currentConnection === "string" ?
                        currentConnection.startsWith("error") ?
                            <span className="text-red-500 text-xl">
                                {currentConnection}
                            </span> :
                            <span className="text-5xl">
                                {currentConnection}
                            </span> :
                        <div className="inline-flex space-x-4">
                            <span className="text-5xl">
                                {currentConnection.formula}
                            </span>
                            <div className="inline-block italic text-xl">
                                <p>
                                    mass: {currentConnection.mass}
                                </p>
                                <p>
                                    ({currentConnection.name})
                                </p>
                            </div>
                        </div>
                    }
                </div>

                <ElementComp element={elements[1]} />
                {/*Legenda*/}
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
                {elements.slice(2, 36).map(el => <ElementComp element={el} />)}
                <div className="col-span-2"></div>
                {elements.slice(36, 54).map(el => <ElementComp element={el} />)}
                <div className="col-span-2"></div>
                {elements.slice(54, 56).map(el => <ElementComp element={el} />)}
                {elements.slice(70, 86).map(el => <ElementComp element={el} />)}
                <div className="col-span-2"></div>
                {elements.slice(86, 88).map(el => <ElementComp element={el} />)}
                {elements.slice(102, 118).map(el => <ElementComp element={el} />)}
                <div className="col-span-2"></div>
            </div>

            <div className="grid grid-flow-row-dense grid-cols-14 grid-rows-2 size-fit">
                {elements.slice(56, 70).map(el => <FElementComp element={el} />)}
                {elements.slice(88, 102).map(el => <FElementComp element={el} />)}
            </div>
        </div>
    );
});

export default ElementsTable;