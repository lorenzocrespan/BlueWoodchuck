import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../Components/LoginView";
import Init from "../Components/Init";
import Appd from "../Components/App";

export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/Init" element={<Init />} />
                <Route path="/App" element={<Appd />} />
            </Routes>
        </Router>
    )
}