import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home } from "./pages/Home";
import { BussinesWeel } from "./pages/BussinesWeel";
import { NavBar } from "./components/NavBar/NavBar";
import { navBarData, paths } from "./data/cont";
import { ditpIsoLogo } from "./assets";
import { Container } from "react-bootstrap";
import { FooterPage } from "./components/Footer/Footer";
import { Credenciales } from "./pages/Credenciales";
import { AutoPartsPage } from "./pages/AutoPartsPage";
import { FoodPage } from "./pages/FoodPage";
import { ConstructionPage } from "./pages/ConstructionPage";
import { HeroVideoPage } from "./pages/HeroVideoPage";
import { Campaigns } from "./pages/Campaigns";
import TagManager from "react-gtm-module";
import { PdfContainer } from "./components/PdfContainer/PdfContainer";
import { BusinessM2024 } from "./pages/BusinessM2024";

const tagManagerArgs = {
  gtmId: `${process.env.REACT_APP_TAG_ID}`,
};

TagManager.initialize(tagManagerArgs);
TagManager.dataLayer({
  dataLayer: {
    event: "pageview",
    title: "DITP",
  },
});

function App() {
  return (
    <Container fluid>
      <NavBar navData={navBarData} brand={ditpIsoLogo} expand={"md"} />
      <Routes>
        <Route path={paths.autoPartsPage} element={<AutoPartsPage />} />
        <Route path={paths.bussinesWeel} element={<BussinesWeel />} />
        <Route path={paths.campaigns} element={<Campaigns />} />
        <Route path={paths.constructionPage} element={<ConstructionPage />} />
        <Route path={paths.credentials} element={<Credenciales />} />
        <Route path={paths.foodPage} element={<FoodPage />} />
        <Route path={paths.heroVideoPage} element={<HeroVideoPage />} />
        <Route path={paths.home} element={<Home />} />
        <Route path={paths.business2024} element={<BusinessM2024 />} />
        <Route path='/report' element={<PdfContainer />} />

        <Route path='/*' element={<Navigate to={paths.home} replace />} />
      </Routes>
      <FooterPage />
    </Container>
  );
}

export default App;
