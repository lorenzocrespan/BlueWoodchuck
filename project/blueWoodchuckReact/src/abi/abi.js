export const FORM_ADDRESS = '0xCA1521Ef72463C33C4451680F5a475553c571a3C';

export const FORM_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "caseNumber",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "caseAddress",
          "type": "address"
        }
      ],
      "name": "newForm",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listFormAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "listFormMap",
      "outputs": [
        {
          "internalType": "string",
          "name": "caseName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "caseNumber",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_caseName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_caseNumber",
          "type": "uint256"
        }
      ],
      "name": "createForm",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "readForm",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "caseName",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "caseNumber",
              "type": "uint256"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "trackingNumber",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "releasedBy",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "receivedBy",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "reasonForChange",
                  "type": "string"
                }
              ],
              "internalType": "struct Form.Log[]",
              "name": "chainOfCustody",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct Form.formData",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]