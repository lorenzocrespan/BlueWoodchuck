pragma solidity >= 0.5.0 < 0.6.0;

contract Forms {
    event newForm(uint caseNumber, uint id); // if more needed, change emit in createForm

    struct Log {
        uint trackingNumber;
        uint dateTime;
        address releasedBy;
        address receivedBy;
        string reasonForChange;
    }

    struct Form {// add all fields (check on word file)
        string caseName;
        uint caseNumber;
        // string reasonObtained;
        uint itemNumber;
        // string evidenceType_Manufacturer;
        uint modelNumber;
        uint serialNumber;
        // string contentOwner;
        // string contentDescription;
        // uint contentOwnerContactInformation;
        // string forensicAgent;
        // string creationMethod;
        bytes32 hashValue;
        uint date;
        // uint forensicAgentContactInformation;
        Log[] chainOfCustody;
    }

    Form[] private forms;
    mapping (uint => address) public lastAccess; // from id of form to who is the last access (address)

    function createForm(string memory _caseName, uint _caseNumber, uint _itemNumber, uint _modelNumber, uint _serialnumber, bytes32 _hashValue, uint _date){
        uint idx = forms.push(
            Form(_caseName, _caseNumber, _itemNumber, _modelNumber, _serialnumber, _hashValue, _date)
        ) - 1; // push returns the new length of the array
        forms[idx].chainOfCustody.push(
            Log(1, now, msg.sender, msg.sender, "Creation")
        ); // released and received by factory contract
        lastAccess[idx] = msg.sender;
        emit newForm(_caseNumber, idx); // idk what is needed, in case add here
    }

    function readForm(uint _id, string memory _reasons) returns (Form) {
        // if there is need of less memory usage, put everything in a line, otherwise, pls don't
        uint trackingNumber = forms[_id].chainOfCustody.length;
        address lastAccess = forms[_id].chainOfCustody[trackingNumber - 1].receivedBy;
        forms[_id].chainOfCustody.push(
            Log(trackingNumber, now, lastAccess, msg.sender, _reasons)
        );
        lastAccess[_id] = msg.sender;
        return forms[_id];
    }

    /*
    function getLastAccess(uint _id) view returns (address) { // no need for a mapping if forms are public
        return forms[_id].chainOfCustody[chainOfCustody.length - 1].receivedBy;
    }
    */
}