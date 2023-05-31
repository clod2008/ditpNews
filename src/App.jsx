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
import { AutoPartsPage } from './pages/AutoPartsPage';
import { FoodPage } from './pages/FoodPage';
import { ConstructionPage } from './pages/ConstructionPage';
import { HeroVideoPage } from './pages/HeroVideoPage';




function App() {

  
  
  return (
    <Container fluid>
      <NavBar navData={navBarData} brand={ditpIsoLogo} />
      <Routes>
        <Route path={paths.home} element={<Home />}/>
        <Route path={paths.bussinesWeel} element={<BussinesWeel />} />
        <Route path={paths.credentials} element={<Credenciales />} />
        <Route path={paths.autoPartsPage} element={<AutoPartsPage />} />
        <Route path={paths.foodPage} element={<FoodPage />} />
        <Route path={paths.constructionPage} element={<ConstructionPage />} />
        <Route path={paths.heroVideoPage} element={<HeroVideoPage />} />
      </Routes>
      <FooterPage/>
    </Container>
  );
}

export default App;
