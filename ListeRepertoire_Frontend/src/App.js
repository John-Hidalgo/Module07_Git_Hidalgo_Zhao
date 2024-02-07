import logo from './logo.svg'
import './App.css'
import { Accueil } from './pages/Accueil'
import { Admin } from './pages/Admin'
import { Ajouter } from './pages/Ajouter'
import PageRepertoireClients from './pages/pageRepertoireClients.js'
import Container from 'react-bootstrap/Container'
import { BarreNavigation } from './composants/BarreNavigations.js'
import { Client_Repo } from './pages/Client_Repo.js'
import PagePiecesAdmin from './pages/admin/pagePiecesAdmin.js';
import PageAjouterPieceAdmin from './pages/admin/pageAjouterPiece.js'
import PageCommandesAdmin from './pages/admin/pageCommandesAdmin.js';
import TopCinquePiece from './pages/admin/TopCinqePiece.js';
import PageCommandesActifAdmin from './pages/admin/pageCommandesActifAdmin.js';
import PageModifierPieceAdmin from './pages/admin/pageModiferUnePiece.js';

//Router
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Client_Creer_Liste } from './pages/Client_Creer_Liste.js'

function App () {
  return (
    <BrowserRouter>
      <Container>
        <BarreNavigation />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/articles" element={<PageRepertoireClients />} />
          <Route path="/ajouter" element={<Ajouter />} />
          <Route path="/client-repo" element={<Client_Repo />} />
            <Route path="/client-liste" element={<Client_Creer_Liste />} />
            <Route path="/pieces" element={<PagePiecesAdmin />} />
                  <Route path="/piecesAjouter" element={<PageAjouterPieceAdmin />} />
            <Route path="/commandes" element={<PageCommandesAdmin />} />
            <Route path="/commandesInactif" element={<PageCommandesActifAdmin />} />
            <Route path="/modifier-piece/:id" element={<PageModifierPieceAdmin />} />
            <Route path="/topCinque" element={<TopCinquePiece />} />
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