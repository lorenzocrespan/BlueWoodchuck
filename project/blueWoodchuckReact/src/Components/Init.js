import React, { useEffect } from "react";

function Init() {

    useEffect(() => {
        onLoad();
    }, []);



    async function onLoad() {
        document.body.style = 'background: #161616;';
    }

    return (
        <div className="App">
            <h1>Init</h1>
        </div>
    );
}

export default Init;