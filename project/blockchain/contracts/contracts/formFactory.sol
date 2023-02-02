// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;
import "./form.sol";

// This is a special contract that generates Form contracts, that have their own methods to generate and update their
// attributes, while keeping track of all the forms in the blockchain.

contract FormFactory {
    // Events are a way for contract to communicate that something happened on the blockchain to your app front-end,
    // which can be 'listening' for certain events and take action when they happen.

    // newForm: Event to be emitted when a new form is created.
    // NOTE: If more fields are needed, change the emit in createForm.
    event newForm(uint caseNumber, address caseAddress, FormData data);


    // Mapping to store the forms for the evidence of the cases.
    mapping(address => Form) private listFormMap;
    // Array to store the address of the forms for the evidence of the cases.
    address[] private listFormAddress; // TODO: private?

    /**
    *   @dev Function to create a new form for the evidence of the case.
    *
    *   @param _numbers All numerical information in the form
    *   @param _strings All textual information in the form
    *   @param _hashValue Hash value of the evidence
    */
    function createForm(uint[] memory _numbers, string[] memory _strings, bytes32 _hashValue) public returns (address) {
        // Generation of new address for the form.
        address entityAddress = createAddress();
        // creation of the new Form directly in the mapping object
        listFormMap[entityAddress] = new Form(_numbers, _strings, _hashValue);
        listFormMap[entityAddress].pushLog(Log(0, block.timestamp, msg.sender, msg.sender, "Form created"));
        listFormAddress.push(entityAddress);
        // Emit the event newForm.
        emit newForm(_numbers[0], entityAddress, readFormAddress(entityAddress));
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

    /**
    *   @dev Function that compute a random address.
    *
    *   @return address randomly generated
    */
    function createAddress() private view returns (address) {
        if(listFormAddress.length == 0){
            return address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))));
        }

        address toCheck = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))));
        uint i = 0;
        while(readFormAddress(toCheck).caseNumber != 0){
            i = i + 1;
            toCheck = address(uint160(uint(keccak256(abi.encodePacked(block.timestamp + i, block.difficulty, msg.sender)))));
        }
        return toCheck;
    }
}