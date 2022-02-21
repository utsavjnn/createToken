pragma solidity >=0.4.22 <0.9.0; // just mention solidity -v

contract BubbleToken {
    // Constructor-> runs everytime our smart contract is deployed
    // Set the total number of tokens
    // Read the total number of tokens

    //Name
    string public name = "Bubble Token";

    //Symbol
    string public symbol = "OinkOink";

    //Standard
    string public standard = "Bubble Token v1.0";

    uint256 public totalSupply;
    // with public visibility we get getter function by default
    // totalSupply is also reqd function for ERC20 token
    // reading data from eth chain is free but writing to it costs data


    mapping(address => uint256) public balanceOf;
    //gives us a by default reader funcn which return balance of
    //tokens on eth account

    constructor (uint256 _initialSupply) public {
        // msg is a global variable that has alot of things
        totalSupply = _initialSupply;// state variable-> a variable accessible to entire contract
        // whenver a state variable is updated its going to write to entire blockchain
        
        //allocate the initial supply
        balanceOf[msg.sender] = _initialSupply;
    }

    //Transfer fncn
    // returns a boolean
    // triggers transfer event
    function transfer(address _to, uint256 _value) public returns (bool success){
        // require gas will change logic
        // exception if accnt doesnt have enough money
        require(balanceOf[msg.sender]>=_value);
        //transfer the balance
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
    }
}
