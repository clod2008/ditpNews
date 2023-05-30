import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home } from './pages/Home';
import { BussinesWeel } from './pages/BussinesWeel';
import { NavBar } from './components/NavBar/NavBar';
import { navBarData, paths } from './data/cont';
import { ditpIsoLogo } from './assets';
import { Container, Row } from 'react-bootstrap';
import { FooterPage } from './components/Footer/Footer';
import { Credenciales } from './pages/Credenciales';




function App() {

  
  
  return (
    <Container fluid>
      <NavBar navData={navBarData} brand={ditpIsoLogo} />
      <Routes>
        <Route path={paths.home} element={<Home />}/>
        <Route path={paths.bussinesWeel} element={<BussinesWeel />} />
        <Route path={paths.credentials} element={<Credenciales />} />
      </Routes>
      <FooterPage/>
    </Container>
  );
}

export default App;
