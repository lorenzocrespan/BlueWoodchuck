import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "../Components/LoginView";
import HomepageView from "../Components/HomepageView";

export default function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginView />} />
                <Route path="/Homepage" element={<HomepageView />} />
            </Routes>
        </Router>
    )
}