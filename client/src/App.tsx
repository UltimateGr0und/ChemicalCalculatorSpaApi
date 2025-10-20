import ElementsTable from './components/ElementsTable/ElementsTable'
import { ElementsProvider } from './context/ElementsContext'


function App() {

    return (
        <div className="bg-zinc-800 text-white p-10">
            <ElementsProvider>
                <ElementsTable />
            </ElementsProvider>
        </div>
    )
}

export default App
