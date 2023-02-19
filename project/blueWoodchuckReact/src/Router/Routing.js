// Import - Routing
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
// Import - Components
import CoreLogin from "../Components/corePage/coreLogin";
import CoreHomepage from "../Components/corePage/coreHomepage";
import NewForm from "../Components/corePage/coreFormGenerate";
import ShowContractInfo from "../Components/corePage/coreFormShow";
import ListContractPageView from "../Components/corePage/coreFormList";
// Import - Default Components (Header and Footer)
import Header from "../Components/defaultComponent/Header";
import Footer from "../Components/defaultComponent/Footer";
// Import - 404 View
import Core404 from "../Components/corePage/core404";

// Layout component, used to wrap Header and Footer around the content.
// The content is defined by the <Outlet /> component.
const DefaultLayout = () => {
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
                <Route path="/" element={<CoreLogin />} />
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/homepage" element={<CoreHomepage />} />
                    <Route path="/listForm" element={<ListContractPageView />} />
                    <Route path="/listForm/contractShow/:id" element={<ShowContractInfo />} />
                    <Route path="/newForm" element={<NewForm />} />
                </Route>
                <Route path="*" element={<Core404 />} />
            </Routes>
        </Router>
    )
}