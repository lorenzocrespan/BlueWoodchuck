import Routes from "./Routing";
import React, { useEffect } from "react";

function App() {

    useEffect(() => {
        onLoad();
    }, []);

    async function onLoad() {
        document.body.style = 'background: red;';
    }

    return (
        <div className="App">
            <h1>App</h1>
            <Routes />
        </div>
    );
}

export default App;