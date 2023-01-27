
// SPDX-License-Identifier: MIT
// commento prova
// Pragma indicates the version of Solidity compiler to be used for compilation.
// In truffle, the version of Solidity compiler is specified in truffle-config.js, 
// if not specified, the default version is 0.5.16. 
pragma solidity ^0.8.17;

// Contract is a collection of functions and data (its state) that resides at a specific address on the Ethereum blockchain.
// The following contract is used to create a form for the evidence.
contract Form {

    // Events are a way for contract to communicate that something happened on the blockchain to your app front-end, 
    // which can be 'listening' for certain events and take action when they happen.

    // newForm: Event to be emitted when a new form is created.
    // NOTE: If more fields are needed, change the emit in createForm.
    event newForm(uint caseNumber, address caseAddress);

    // Struct to store the information of the chain of custody.
    struct Log {
        uint trackingNumber;        // Tracking number of the form
        uint timestamp;             // Epoch time of the change 
        address releasedBy;         // Address of the entity that released the form
        address receivedBy;         // Address of the entity that received the form
        string reasonForChange;     // Reason for the change
    }


    // Struct to store the information of the form.
    struct formData {
        string caseName;                        // Name of the case
        uint caseNumber;                        // Number of the case
        // string reasonObtained;                  // Reason for obtaining the evidence (?)
        // uint itemNumber;                        // Number of the item
        // string evidenceTypeManufacturer;        // Type of the evidence and manufacturer
        // uint Owner;                             // Name of the owner of the evidence
        // string contentDescription;              // Description of the evidence
        // uint contentOwnerContactInformation;    // Contact information of the owner of the evidence
        // string forensicAgent;                   // Name of the forensic agent
        // string creationMethod;                  // Method of creation of the evidence
        // bytes32 hashValue;                      // Hash value of the evidence
        // uint date;                              // Date of the evidence           
        // uint forensicAgentContactInformation;   // Contact information of the forensic agent
        Log[] chainOfCustody;                  // Chain of custody of the evidence
    }

    // Mapping to store the forms for the evidence of the cases.
    mapping (address => formData) public listFormMap;
    // Array to store the address of the forms for the evidence of the cases.
    address[] public listFormAddress;

    /**
    *   @dev Function to create a new form for the evidence of the case.
    *
    *   @param _caseName Name of the case
    *   @param _caseNumber Number of the case
    */
    function createForm(string memory _caseName, uint _caseNumber) public returns (address) {
        // Generation of new address for the form.
        address entityAddress = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))));
        listFormMap[entityAddress].caseName = _caseName;
        listFormMap[entityAddress].caseNumber = _caseNumber;
        listFormMap[entityAddress].chainOfCustody.push(Log(0, block.timestamp, msg.sender, msg.sender, "Form created"));
        listFormAddress.push(entityAddress);
        // Emit the event newForm.
        emit newForm(_caseNumber, entityAddress);
        return entityAddress;
    }

    /** 
    *   @dev Function to read the form for the evidence of the case.
    *
    *   @param _address Address of the form
    *
    *   @return formData Struct containing the information of the form
    */
    function readForm(address _address) public view returns (formData memory) {
        return (listFormMap[_address]);
    }

    /*
        function getLastAccess(uint _id) view returns (address) { // no need for a mapping if forms are public
            return forms[_id].chainOfCustody[chainOfCustody.length - 1].receivedBy;
        }
    */
}