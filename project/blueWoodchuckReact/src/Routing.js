import {BrowserRouter as Router, Route, Routes} from "react-router-dom"; 
import Init from "./Components/Init";
import Appd from "./Components/App";

export default function Routing(){
    return (
        <Router>
            <Routes>
                <Route path="/Init" element={<Init/>}/>
                <Route path="/App" element={<Appd/>}/>
            </Routes>
        </Router>
    )
}