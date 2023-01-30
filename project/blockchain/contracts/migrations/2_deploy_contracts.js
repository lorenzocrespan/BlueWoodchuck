
//const Form = artifacts.require("./form.sol");
const FormFactory = artifacts.require("./formFactory.sol");

module.exports = function(deployer) {
//  deployer.deploy(Form);
  deployer.deploy(FormFactory);
};