import { BrowserRouter as Router, Route, Routes, Outlet, Link  } from "react-router-dom";
import LoginView from "../Components/LoginView";
import HomepageView from "../Components/FunctionView/HomepageView";
import Header from "../Components/BaseComponent/Header";
import Footer from "../Components/BaseComponent/Footer";
import Link1 from "../Components/FunctionView/Link1";


const Layout = () => {
    return (
      <>
        <Header />
  
        <Outlet />

        <Footer />
      </>
    )
  };

// <Route path="*" element={<NoPage />} />

export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/" element={<Layout />}>
                    <Route path="/Homepage" element={<HomepageView />} />
                    <Route path="/link" element={<Link1 />} />
                    
                </Route>

            </Routes>
        </Router>
    )
}