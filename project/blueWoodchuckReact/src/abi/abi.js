// Relative path: ../../../blockchain/contracts/build/contracts/FormDataDeploy.json (MacOS or Linux)
// Relative path: ..\..\..\blockchain\contracts\build\contracts\FormDataDeploy.json (Windows)

/**
 * Get the data of the deployed contract
 * 
 */
function getDataForm() {
  // Get the file
  // const path = require('path');
  return require("./FormDataDeploy.json");
}

/**
 * Get the data of getSpecificABI
 * 
 */
function getDataSpecificForm() {
  // Get the file
  // const path = require('path');
  return require("./Specific.json");
}

/**
 * Get the address of the deployed contract
 * 
 * @returns {string} The address of the deployed contract
 */
export function getFormAddress() {
  // Read and parse the file
  return getDataForm().address;
}

/**
 * Get the ABI of the deployed contract
 * 
 * @returns {string} The ABI of the deployed contract
 */
export function getFormABI() {
  // Read and parse the file
  return getDataForm().abi;
}

export function getSpecificABI() {
  // Read and parse the file
  return getDataSpecificForm().abi;
}