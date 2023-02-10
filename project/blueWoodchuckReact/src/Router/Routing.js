// Import - Routing
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
// Import - Components
import LoginView from "../Components/corePage/coreLogin";
import HomepageView from "../Components/corePage/coreHomepage";
import NewForm from "../Components/corePage/coreFormGenerate";
import ShowContractInfo from "../Components/corePage/coreFormShow";
import ListContractPageView from "../Components/corePage/coreFormList";
// Import - Default Components (Header and Footer)
import Header from "../Components/defaultComponent/Header";
import Footer from "../Components/defaultComponent/Footer";
// Import - 404 View
import View404 from "../Components/corePage/core404";

// Layout component, used to wrap Header and Footer around the content.
// The content is defined by the <Outlet /> component.
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
};

// Routing component, used to define the routes of the application.
export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/" element={<Layout />}>
          <Route path="/Homepage" element={<HomepageView />} />
          <Route path="/ListForm" element={<ListContractPageView />} />
          <Route path="/ListForm/ContractShow/:id" element={<ShowContractInfo />} />
          <Route path="/newForm" element={<NewForm />} />
        </Route>
        <Route path="*" element={<View404 />} />
      </Routes>
    </Router>
  )
}