// Import - React 
import { useState, useEffect } from "react";
import { Canvg } from 'canvg';

function DownloadPopup(props) {

    const [downloadPopup, setDownloadPopup] = useState(false);

    const closeHandler = () => {
        setDownloadPopup(false);
        props.onClose(false);
    };

    useEffect(() => {
        setDownloadPopup(props.downloadPopup);
    }, [props.downloadPopup]);

    const downloadQRCode = () => {
        const svg = document.getElementById("QRCodeForm");
        // Canvg library
        const oldCanvas = document.createElement("canvas");
        const ctx = oldCanvas.getContext("2d");
        const v = Canvg.fromString(ctx, svg.outerHTML);
        v.start();

        const newCanvas = document.createElement('canvas');
        const context = newCanvas.getContext('2d');

        newCanvas.width = 320;
        newCanvas.height = 320;

        // create white background and center the text
        context.font = '14px Roboto';
        context.fillStyle = 'white';
        context.textBaseline = 'middle';
        context.textAlign = 'center';
        context.fillRect(0, 0, 320, 320);

        // create style for text inside canvas
        context.fillStyle = '#4A4A4A';
        context.fillText('Scan Here to Order', newCanvas.width / 2, 20);
        // copy oldCanvas to newCanvas
        context.drawImage(oldCanvas, 35, 35, 250, 250);
        context.fillText('Thank You, Have a nice day ', newCanvas.width / 2, 305);

        const image = newCanvas.toDataURL('image/png');
        const anchor = document.createElement('a');
        anchor.href = image;
        anchor.download = `qr-code.png`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    };

    return (
        <div>
            {downloadPopup ? (
                <div>
                    <div className="opacity-90 fixed inset-0 z-10 bg-black" />
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-gray-300 text-blue-900 ">
                            <h2 className="flex items-center gap-2 text-xl font-extrabold leading-tight tracking-wide">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6 fill-current shrink-0 dark:text-amber-600">
                                    <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
                                </svg>
                                Download
                            </h2>
                            <p className=" font-medium dark:text-blue-800">
                                Quale formato preferisci?
                            </p>
                            <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={downloadQRCode}>Scarica il QR Code</button>
                            <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" >Scarica il documento in PDF</button>
                            <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button className="h-12 px-4 font-semibold rounded-md self-center text-white bg-blue-900 hover:bg-amber-600 ease-out duration-500" onClick={closeHandler}>Chiudi</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default DownloadPopup;