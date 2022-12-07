
# Note progetto: Blue Woodchuck

## Descrizione


## Tecnologie utilizzate

Di seguito le tecnologie utilizzate per lo sviluppo del progetto:

  * [Truffle](https://www.trufflesuite.com/) - Framework per lo sviluppo di DApp su Ethereum
  * [Ganache](https://www.trufflesuite.com/ganache) - Blockchain locale per lo sviluppo
  * [Solidity](https://solidity.readthedocs.io/en/v0.6.10/) - Linguaggio di programmazione per lo sviluppo di Smart Contract
  * [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/) - Libreria JavaScript per lo sviluppo di DApp
  * [Node.js](https://nodejs.org/it/) - Runtime environment per lo sviluppo di applicazioni JavaScript
  * [Metamask](https://metamask.io/) - Portafoglio digitale per Ethereum
  * [React](https://it.reactjs.org/) - Framework JavaScript per lo sviluppo di UI

[Truffle](https://trufflesuite.com/docs/truffle/) è un framework per lo sviluppo di DApp su Ethereum. È composto da un insieme di strumenti che permettono di semplificare lo sviluppo di Smart Contract e di DApp. In particolare, Truffle permette di compilare e testare i Smart Contract scritti in Solidity, di gestire la blockchain locale per lo sviluppo e di pubblicare i Smart Contract su Ethereum. Truffle è basato su Node.js e utilizza Web3.js per la comunicazione con la blockchain.
 
 - Installazione di Truffle e di Ganache
Requirements¶

Node.js v14 - v18
Windows, Linux, or macOS

code 
npm install -g truffle

truffle version

Truffle v5.6.2 (core: 5.6.2)
Ganache v7.4.4 
Solidity v0.5.16 (solc-js)
Node v18.9.1
Web3.js v1.7.4

Truffle requires a running Ethereum client which supports the standard JSON-RPC API

[Ganahe](https://trufflesuite.com/docs/ganache/quickstart/) è un client Ethereum che permette di creare una blockchain locale per lo sviluppo. È possibile installare Ganache come un’applicazione desktop o come un’applicazione web. In questo progetto è stata utilizzata la versione desktop di Ganache.

[MetaMask](https://metamask.io/) è un portafoglio digitale per Ethereum. È possibile installare MetaMask come un’estensione per il browser Google Chrome o come un’applicazione desktop. In questo progetto è stata utilizzata la versione desktop di MetaMask.

# Setup del progetto

<!-- Immagine progetto -->
![Drag Racing](./img/Scimmia_001.jpg)


https://asifwaquar.com/connect-metamask-to-localhost/

❯ mkdir blockchain
❯ cd blockchain
❯ mkdir contracts
❯ cd contracts
❯ truffle init

Inside contracts folder, we are going to write our smart contracts.
Within the migrations folder, we are going to migrate our newly created smart contracts.
Inside test folder, we usually write tests to test our smart contract however, it is beyond the scope of this blog post therefore, we are not going to get into that. I would highly recommend writing tests for your smart contracts before deploying them to public blockchain nodes.


❯ npx create-react-app blueWoodchuckReact
Need to install the following packages:
  create-react-app@5.0.1
Ok to proceed? (y) y
npm WARN deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

Creating a new React app in /Users/lorenzocrespan/Documents/Workspace/University/90748 - Blockchain and Cryptocurrencies/BlueWoodchuck/project/blueWoodchuckReact.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...


added 1394 packages in 60s

212 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 72 packages in 9s

225 packages are looking for funding
  run `npm fund` for details
Removing template package using npm...


removed 1 package, and audited 1466 packages in 4s

225 packages are looking for funding
  run `npm fund` for details

6 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Created git commit.

Success! Created blueWoodchuckReact at /Users/lorenzocrespan/Documents/Workspace/University/90748 - Blockchain and Cryptocurrencies/BlueWoodchuck/project/blueWoodchuckReact
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd project/blueWoodchuckReact
  npm start

Happy hacking!