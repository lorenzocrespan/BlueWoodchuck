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
    address[] private listFormAddress;

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
        addressToForm[entityAddress].pushLog(
            Log(0, block.timestamp, msg.sender, msg.sender, "Form created")
        );
        userToFormAddresses[msg.sender].push(entityAddress);
        // Emit the event newForm.
        emit newForm(_numbers[0], entityAddress, readFormAddress(entityAddress));
        // Push entityAddress to the list of form addresses.
        listFormAddress.push(entityAddress);
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
        return address(uint160(uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,msg.sender)))));
    }

    /**
     *   @dev Function that returns the forms in charge of an user.
     *
     *   @return address array with addresses of forms in charge of an user
     */
    function getUserFormAddresses(address _userAddress) public view returns (address[] memory) {
        return userToFormAddresses[_userAddress];
    }

    /**
     *   @dev Function that makes msg.sender the new owner of a free form.
     *
     *   @param _formAddress address of the form
     *
     *   @param _reason reason for taking the form (necessary in the chain of custody)
     *
     */
    function getForm(address _formAddress, string memory _reason) public {
        require(findForm(_formAddress).isAvailable()); // the form must be available in order to be taken
        findForm(_formAddress).pushLog(
            Log( // push of a new log in the chain of custody
                findForm(_formAddress).lastLog().trackingNumber + 1,
                block.timestamp,
                findForm(_formAddress).lastLog().receivedBy,
                msg.sender,
                _reason
            )
        );
        userToFormAddresses[msg.sender].push(_formAddress); // the form is now added to msg.sender owned forms
        findForm(_formAddress).setTaken(msg.sender); // and is marked as not available, no one could take it now
    }

    /**
     *   @dev Function that makes a form available, if msg.sender is the current owner.
     *
     *   @param _formAddress address of the form to free
     *
     */
    function releaseForm(address _formAddress) public {
        require(findForm(_formAddress).lastLog().receivedBy == msg.sender); // run only if current owner is msg.sender
        findForm(_formAddress).setAvailable(msg.sender); // form is now marked as available
        removeAddressInAUserList(msg.sender, _formAddress); // and its address is removed from msg.sender list
    }

    /**
     *   @dev Function that makes a form available for a given user, if msg.sender is the current owner.
     *
     *   @param _formAddress address of the form to give to a user
     *
     *   @param _taker address of the future owner of the form
     */
    function giveForm(address _formAddress, address _taker) public{
        require(findForm(_formAddress).lastLog().receivedBy == msg.sender); // run only if current owner is msg.sender
        findForm(_formAddress).setGiverTaker(msg.sender, _taker);
    }

    /**
     *   @dev Function that accept a form that has been sent to them.
     *
     *   @param _formAddress address of the form to accept
     *
     *   @param _reason reason to accept the form
     */
    function acceptForm(address _formAddress, string memory _reason) public {
        require(findForm(_formAddress).getTaker() == msg.sender); // run only if current owner is msg.sender
        userToFormAddresses[msg.sender].push(_formAddress); // the form is now added to msg.sender owned forms
        findForm(_formAddress).pushLog(Log(findForm(_formAddress).lastLog().trackingNumber + 1, block.timestamp, findForm(_formAddress).lastLog().receivedBy, msg.sender, _reason));
        removeAddressInAUserList(findForm(_formAddress).getGiver(), _formAddress);
        findForm(_formAddress).resetGiverTaker(msg.sender);
    }

    /**
     *   @dev Function that rejects a form that has been sent to them.
     *
     *   @param _formAddress form to reject
     */
    function rejectForm(address _formAddress) public {
        require(
            findForm(_formAddress).getTaker() == msg.sender ||
                findForm(_formAddress).getGiver() == msg.sender
        );
        findForm(_formAddress).resetGiverTaker(msg.sender);
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
        for (uint i = 0; i < userAddressesLength; i++) {
            // look into the addresses linked to _userAddress
            if (userToFormAddresses[_userAddress][i] == _formAddress) {
                // copy the last element in the index we want to remove
                userToFormAddresses[_userAddress][i] = userToFormAddresses[_userAddress][userAddressesLength - 1];
                userToFormAddresses[_userAddress].pop(); // remove the last element
                return;
            }
        }
    }

    /**
     *   @dev Function to know if a form is available or not.
     *
     *   @param _formAddress address of the form
     *
     *   @return bool true if available, false otherwise
     */
    function isAFormAvailable(address _formAddress) public view returns (bool) {
        return findForm(_formAddress).isAvailable();
    }

    /**
     *   @dev Function to get how many forms meet the requirements for a user.
     *
     *   @param _address address of the user
     *
     *   @param _type 0 if looking for giver, 1 for taker
     *
     *   @return uint count of how many forms meet the requirements for a user
     */
    function countForms(address _address, uint _type) private view returns (uint) { // 0 = giver, 1 = taker
        // Count the number of forms that match the sender as taker
        uint count = 0;
        for (uint i = 0; i < listFormAddress.length; i++) {
            if(_type == 1) {
                if (findForm(listFormAddress[i]).getTaker() == _address) count++;
            }
            else {
                if (findForm(listFormAddress[i]).getGiver() == _address) count++;
            }
        }
        return count;
    }

    /**
     *   @dev Function to get in how many forms the user is marked as taker.
     *
     *   @param _taker address of the user
     *
     *   @return address[] addresses of forms where the user is marked as taker
     */
    function findContractTaker(address _taker) public view returns (address[] memory) {
        // Count the number of forms that match the sender as taker
        uint count = countForms(_taker, 1);
        if (count == 0) return new address[](0);
        // Array to store all the forms addresses that match the sender as taker
        address[] memory listFormAddressTaker = new address[](count);
        uint j = 0;
        // Search contract with sender registered as taker
        for (uint i = 0; i < listFormAddress.length; i++) {
            if (findForm(listFormAddress[i]).getTaker() == _taker) {
                listFormAddressTaker[j] = listFormAddress[i];
                j++;
            }
        }
        return listFormAddressTaker;
    }

    /**
     *   @dev Function to get in how many forms the user is marked as giver.
     *
     *   @param _giver address of the user
     *
     *   @return address[] addresses of forms where the user is marked as giver
     */
    function findContractGiver(address _giver) public view returns (address[] memory) {
        // Count the number of forms that match the sender as taker
        uint count = countForms(_giver, 0);
        if (count == 0) return new address[](0);
        // Array to store all the forms addresses that match the sender as taker
        address[] memory listFormAddressGiver = new address[](count);
        uint j = 0;
        // Search contract with sender registered as taker
        for (uint i = 0; i < listFormAddress.length; i++) {
            if (findForm(listFormAddress[i]).getGiver() == _giver) {
                listFormAddressGiver[j] = listFormAddress[i];
                j++;
            }
        }
        return listFormAddressGiver;
    }

    /**
     *   @dev Function to get in how many forms a user have been signed after a certain date.
     *
     *   @param _from date to count from
     *
     *   @return address[] addresses of forms where the user is marked as taker
     */
    function findContractByDate(uint _from) public view returns (address[] memory) {
        // Count the number of forms that match the sender as taker
        uint count = countFormsBasedOnDate(_from);
        // Array to store all the forms addresses that match the sender as taker
        address[] memory listFormAddressReturned = new address[](count);
        uint j;
        // Search contract with sender registered as taker
        for (uint i = 0; i < listFormAddress.length; i++) {
            if (findForm(listFormAddress[i]).readForm().date >= _from) {
                listFormAddressReturned[j] = listFormAddress[i];
                j++;
            }
        }
        return listFormAddressReturned;
    }

    /**
     *   @dev Function to get how many forms have been signed after a certain date.
     *
     *   @param _from date to count from
     *
     *   @return uint count of forms from a certain date
     */
    function countFormsBasedOnDate(uint _from) public view returns (uint) {
        uint count = 0;
        for (uint i = 0; i < listFormAddress.length; i++) {
            if (findForm(listFormAddress[i]).readForm().date >= _from)
                count++;
        }
        return count;
    }
}
