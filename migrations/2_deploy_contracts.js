const BubbleToken = artifacts.require("./bubbleToken.sol");
// artifact allows us to create contract absraction 
// which allows smartcontract to run in any js environment
module.exports = function (deployer) {
  deployer.deploy(BubbleToken, 1000000);
};



