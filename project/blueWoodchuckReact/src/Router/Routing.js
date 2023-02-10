import { BrowserRouter as Router, Route, Routes, Outlet, Link } from "react-router-dom";
import LoginView from "../Components/LoginView";
import HomepageView from "../Components/FunctionView/HomepageView";
import Header from "../Components/BaseComponent/Header";
import Footer from "../Components/BaseComponent/Footer";
import NewForm from "../Components/FunctionView/NewForm";
import ShowContractInfo from "../Components/FunctionView/ShowContractInfo";
import View404 from "../Components/404View";
import ListContractPageView from "../Components/FunctionView/ListContractpageView";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  )
};

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