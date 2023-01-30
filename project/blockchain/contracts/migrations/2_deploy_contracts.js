
//const Form = artifacts.require("./form.sol");
const FormFactory = artifacts.require("./formFactory.sol");

module.exports = function (deployer) {
  deployer.deploy(FormFactory)
    .then(function () {
      // Write the contract address to a file
      var fs = require('fs');
      const path = require('path');
      var data = {
        address: FormFactory.address,
        abi: FormFactory.abi
      };
      var json = JSON.stringify(data);
      // Path: BlueWoodchuck/project/blockchain/contracts/build/contracts/FormDataDeploy.json (MacOS or Linux)
      // Path: BlueWoodchuck\project\blockchain\contracts\build\contracts\FormDataDeploy.json (Windows)
      // TODO: Check change the path based on your computer operating system
      fs.writeFileSync(path.resolve(__dirname, '..', '..', '..', 'blueWoodchuckReact', 'src', 'abi', 'FormDataDeploy.json'), json);
    })
};
