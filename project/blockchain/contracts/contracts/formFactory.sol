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
    event formFound(address caseAddress, FormData data);


    // Mapping to store the forms for the evidence of the cases.
    mapping(address => Form) private addressToForm;
    // Mapping to store the addresses of the forms currently in charge of every user.
    mapping(address => address[]) private userToFormAddresses;
    // Array to store the addresses of the forms for the evidence of the cases.
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
        // Creation of the new Form directly in the mapping object
        addressToForm[entityAddress] = new Form(_numbers, _strings, _hashValue);
        addressToForm[entityAddress].pushLog(Log(0, block.timestamp, msg.sender, msg.sender, "Form created"));
        userToFormAddresses[msg.sender].push(entityAddress);
        searchCaseNumber(uint(10));
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
        return addressToForm[_caseAddress];
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
        return address(uint160(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender)))));
    }

    /**
    *   @dev Function that returns the forms in charge of an user.
    *
    *   @return address array with addresses of forms in charge of an user
    */
    function getUserFormAddresses(address _userAddress) public view returns (address[] memory) {
        return userToFormAddresses[_userAddress];
    }

    function getForm(address _formAddress, string memory _reason) public {
        address previousUser = findForm(_formAddress).lastLog().receivedBy;
        findForm(_formAddress).pushLog(Log(
                findForm(_formAddress).lastLog().trackingNumber + 1,
                block.timestamp,
                previousUser,
                msg.sender,
                _reason)
        );
        userToFormAddresses[msg.sender].push(_formAddress);
        removeAddressInAUserList(previousUser, _formAddress);
    }

    /**
    *   @dev Function that search for a form with a certain case number.
    *
    *   @param _caseNumber number of the case
    *
    *   @return Form requested
    */
    function searchCaseNumber(uint _caseNumber) public returns (Form) {
        require(listFormAddress.length > 0);
        for (uint i = 0; i < listFormAddress.length; i++) {
            if (readFormAddress(listFormAddress[i]).caseNumber == _caseNumber) {
                emit formFound(listFormAddress[i], readFormAddress(listFormAddress[i]));
                return addressToForm[listFormAddress[i]];
            }
        }
        revert("Non existent");
    }

    /**
    *   @dev Function that removes a certain address of a certain user.
    *
    *   @param _userAddress address of the user we want to take the evidence from
    *
    *   @param _formAddress address of the form we want to remove from _userAddress
    */
    function removeAddressInAUserList(address _userAddress, address _formAddress) private {
        require(userToFormAddresses[_userAddress].length > 0);

        uint userAddressesLength = userToFormAddresses[_userAddress].length;

        for (uint i = 0; i < userAddressesLength; i++) {// look into the addresses linked to _userAddress
            if (userToFormAddresses[_userAddress][i] == _formAddress) {
                // copy the last element in the index we want to remove
                userToFormAddresses[_userAddress][i] = userToFormAddresses[_userAddress][userAddressesLength - 1];
                userToFormAddresses[_userAddress].pop();  // remove the last element
            }
        }
    }
}