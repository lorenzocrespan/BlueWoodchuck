import { useEffect } from 'react';                // React hooks.

function Link1() {

    useEffect(() => {
        console.log("Link page");
    }, []);

    return (
        <div>
            <h1>Link 1</h1>
        </div>
    );
}

export default Link1;