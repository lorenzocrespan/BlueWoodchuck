// SPDX-License-Identifier: MIT

// Pragma indicates the version of Solidity compiler to be used for compilation.
// In truffle, the version of Solidity compiler is specified in truffle-config.js,
// if not specified, the default version is 0.5.16.

pragma solidity ^0.8.17;

// Contract is a collection of functions and data (its state) that resides at a specific address on the Ethereum blockchain.
// The following contract is used to create a form for the evidence.

// Struct to store the information of the chain of custody.
    struct Log {
        uint trackingNumber;        // Tracking number of the form
        uint timestamp;             // Epoch time of the change
        address releasedBy;         // Address of the entity that released the form
        address receivedBy;         // Address of the entity that received the form
        string reasonForChange;     // Reason for the change
    }

// Struct to store the information of the form.
    struct FormData {
        string caseName;                        // Name of the case
        uint caseNumber;                        // Number of the case
        string reasonObtained;                  // Reason for obtaining the evidence
        uint itemNumber;                        // Number of the item
        string evidenceTypeManufacturer;        // Type of the evidence and manufacturer
        string owner;                           // Name of the owner of the evidence

        string contentDescription;              // Description of the evidence
        uint contentOwnerContactInformation;    // Contact information of the owner of the evidence
        string forensicAgent;                     // Name of the forensic agent
        string creationMethod;                    // Method of creation of the evidence

        bytes32 hashValue;                      // Hash value of the evidence
        uint date;                              // Date of the evidence
        uint forensicAgentContactInformation;   // Contact information of the forensic agent

        Log[] chainOfCustody;                   // Chain of custody of the evidence
    }

contract Form {
    address private taker;
    address private giver;
    FormData private data;
    bool private available;

    constructor (uint[] memory _numbers, string[] memory _strings, bytes32 _hashValue) {
        // _numbers = [_caseNumber, _itemNumber, _contentOwnerContactInformation, _date,
        //             _forensicAgentContactInformation]
        // _strings = [_caseName, _reasonObtained, _evidenceTypeManufacturer, _owner, _contentDescription,
        //             _forensicAgent, _creationMethod]
        data.caseName = _strings[0];
        data.reasonObtained = _strings[1];
        data.evidenceTypeManufacturer = _strings[2];
        data.owner = _strings[3];
        data.contentDescription = _strings[4];
        data.forensicAgent = _strings[5];
        data.creationMethod = _strings[6];

        data.caseNumber = _numbers[0];
        data.itemNumber = _numbers[1];
        data.contentOwnerContactInformation = _numbers[2];
        data.date = _numbers[3];
        data.forensicAgentContactInformation = _numbers[4];

        data.hashValue = _hashValue;
    }

    /**
    *   @dev Function to read the form data.
    *
    *   @return FormData Struct containing the information of the form
    */
    function readForm() public view returns (FormData memory) {
        return data;
    }

    function pushLog(Log memory _log) public {
        data.chainOfCustody.push(_log);
    }

    function lastLog() public view returns (Log memory) {
        return data.chainOfCustody[data.chainOfCustody.length - 1];
    }

    function isAvailable() public view returns(bool) {
        return available;
    }

    function setAvailable() public {
        require(lastLog().receivedBy == msg.sender);
        available = true;
    }

    function setTaken() public {
        require(lastLog().receivedBy == msg.sender);
        available = false;
    }

    function setGiverTaker(address _taker) public {
        require(msg.sender == lastLog().receivedBy);
        giver = msg.sender;
        taker = _taker;
    }

    function resetGiverTaker() public{
        require(giver == msg.sender || taker == msg.sender);
        giver = address(0);
        taker = address(0);
    }

    function getTaker() view public returns(address){
        return taker;
    }

    function getGiver() view public returns(address){
        return giver;
    }
}