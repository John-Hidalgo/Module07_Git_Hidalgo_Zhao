import logo from './logo.svg'
import './App.css'
import { Accueil } from './pages/Accueil'
import { Admin } from './pages/Admin'
import { Ajouter } from './pages/Ajouter'
import PageRepertoireClients from './pages/pageRepertoireClients.js'
import Container from 'react-bootstrap/Container'
import { BarreNavigation } from './composants/BarreNavigations.js'

//Router
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

function App () {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pieces" element={<PageRepertoireClients />} />
          <Route path="/ajouter" element={<Ajouter />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App
const Page404 = () => {
  return (
    <>
      <h2>404</h2>
      <h4>Page n'est pas trouvee!</h4>
    </>
  )
}