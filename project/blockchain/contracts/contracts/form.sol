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
        string forensicAgent;                   // Name of the forensic agent

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
        //             _forensicAgent]
        data.caseName = _strings[0];
        data.reasonObtained = _strings[1];
        data.evidenceTypeManufacturer = _strings[2];
        data.owner = _strings[3];
        data.contentDescription = _strings[4];
        data.forensicAgent = _strings[5];

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

    /**
    *   @dev Function to push a log at the bottom of the chain of custody.
    *
    *   @param _log Log that needs to be pushed
    */
    function pushLog(Log memory _log) public {
        data.chainOfCustody.push(_log);
    }

    /**
    *   @dev Function the last log of the chain of custody.
    *
    *   @return Log last log
    */
    function lastLog() public view returns (Log memory) {
        return data.chainOfCustody[data.chainOfCustody.length - 1];
    }

    /**
    *   @dev Function that returns a boolean to know if a form is available or not.
    *
    *   @return bool 1 if available, 0 otherwise
    */
    function isAvailable() public view returns(bool) {
        return available;
    }

    /**
    *   @dev Function that marks a form as available.
    *
    *   @param _sender address of the sender, that must be the last receiver in the chain of custody (current owner)
    */
    function setAvailable(address _sender) public {
        require(_sender == lastLog().receivedBy);
        available = true;
    }

    /**
    *   @dev Function that marks a form as taken.
    *
    *   @param _sender address of the sender, that must be the last receiver in the chain of custody (current owner)
    */
    function setTaken(address _sender) public {
        require(_sender == lastLog().receivedBy);
        available = false;
    }

    event giverTakerSet(address giver, address taker);
    /**
    *   @dev Function that marks in a form the giver and the taker.
    *
    *   @param _giver address of the sender, that must be the last receiver in the chain of custody (current owner)
    *
    *   @param _taker address of the eventual taker
    *
    *   @return bool
    */
    function setGiverTaker(address _giver, address _taker) public returns(bool) {
        require(_giver == lastLog().receivedBy);
        giver = _giver;
        taker = _taker;
        emit giverTakerSet(giver, taker);
        return true;
    }

    event resetDone(address giver, address taker);
    /**
    *   @dev Function that resets the giver and the taker in a form.
    *
    *   @param _sender address of the sender
    */
    function resetGiverTaker(address _sender) public {
        require(giver == _sender || taker == _sender);
        // reset giver and taker
        giver = address(0);
        taker = address(0);
        emit resetDone(giver, taker);
    }

    /**
    *   @dev Function that returns the current taker.
    *
    *   @return address of the taker
    */
    function getTaker() view public returns(address){
        return taker;
    }

    /**
    *   @dev Function that returns the current giver.
    *
    *   @return address of the giver
    */
    function getGiver() view public returns(address){
        return giver;
    }
}