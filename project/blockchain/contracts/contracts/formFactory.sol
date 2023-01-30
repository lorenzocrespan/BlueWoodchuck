// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./form.sol";

// Contract is a collection of functions and data (its state) that resides at a specific address on the Ethereum blockchain.
// The following contract is used to create a form for the evidence.

contract FormFactory {
    // Events are a way for contract to communicate that something happened on the blockchain to your app front-end,
    // which can be 'listening' for certain events and take action when they happen.

    // newForm: Event to be emitted when a new form is created.
    // NOTE: If more fields are needed, change the emit in createForm.
    event newForm(uint caseNumber, address caseAddress);


    // Mapping to store the forms for the evidence of the cases.
    mapping(address => Form) public listFormMap;
    // Array to store the address of the forms for the evidence of the cases.
    address[] public listFormAddress; // TODO: private?

    /**
    *   @dev Function to create a new form for the evidence of the case.
    *
    *   @param _caseName Name of the case
    *   @param _caseNumber Number of the case
    */
    function createForm(string memory _caseName, uint _caseNumber) public returns (address) {
        // Generation of new address for the form.
        address entityAddress = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))));
        // creation of the new Form directly in the mapping object
        listFormMap[entityAddress] = new Form(_caseName, _caseNumber);
        listFormMap[entityAddress].pushLog(Log(0, block.timestamp, msg.sender, msg.sender, "Form created"));
        listFormAddress.push(entityAddress);
        // Emit the event newForm.
        emit newForm(_caseNumber, entityAddress);
        return entityAddress;
    }

    /**
    *   @dev Function to get a form from its address.
    *
    *   @param _caseAddress address of the case
    *
    *   @return Form form required
    */
    function findForm(address _caseAddress) public view returns (Form) {
        return listFormMap[_caseAddress];
    }

    /**
    *   @dev Function to get form data from itself.
    *
    *   @param _form form which data is required
    *
    *   @return FormData Struct that contains the data of the form
    */
    function readForm(Form _form) public view returns (FormData memory) {
        return _form.readForm();
    }

    /**
    *   @dev Function to get form data from an address.
    *
    *   @param _caseAddress address of the case
    *
    *   @return FormData Struct that contains the data of the form required
    */

    function readFormAddress(address _caseAddress) public view returns (FormData memory) {
        return readForm(findForm(_caseAddress));
    }
}