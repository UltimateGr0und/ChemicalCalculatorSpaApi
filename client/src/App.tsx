import ChemicalCalculator from './components/ChemicalCalculator/ChemicalCalculator'
import { ElementsProvider } from './context/ElementsContext'


function App() {

    return (
        <div className="bg-zinc-800 text-white p-10">
            <ElementsProvider>
                <ChemicalCalculator />
            </ElementsProvider>
        </div>
    )
}

export default App
