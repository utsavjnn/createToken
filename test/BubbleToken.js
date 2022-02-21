const _deploy_contracts = require("../migrations/2_deploy_contracts");

var BubbleToken = artifacts.require("./bubbleToken.sol");

contract('BubbleToken', function(accounts){
    var tokenInstance;

    it('initiates the contract with the correct values', function(){
        return BubbleToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, "Bubble Token",'has correct name');
        })
    })
    it('allocates the initial supply on deployment', function(){
        return BubbleToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply, 1000000,'sets the total supplu to 1000000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance, 1000000, 'it allocates the initial supply to admin acc')
        })
    })

    it('transfers ownership of tokens', function(){
        return BubbleToken.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance;
        }).then(function(tokenInstance){
            // Test require statement first by transferring 
            //something larger then what sender have
            return tokenInstance.transfer.call(accounts[1], 99999999);
            //.call doesnt actually do any transactions
            // without .call create a txn
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0, 'error message must contain revert');
            return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
        }).then(function(receipt){
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 250000, 'adds the amt to receiving account');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balance){
            assert.equal(balance.toNumber(), 750000, 'deducts amt from sending accnt');
        })
    })
})