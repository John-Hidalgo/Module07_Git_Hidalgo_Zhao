import logo from './logo.svg'
import './App.css'
import { Accueil } from './pages/Accueil'
import { Admin } from './pages/Admin'
import PageRepertoireClients from './pages/pageRepertoireClients.js'


function App () {
  return (
    <div className="App">
      <Accueil />
      <Admin />
      {/* <PageRepertoireClients /> */}
    </div>
  )
}

export default App
