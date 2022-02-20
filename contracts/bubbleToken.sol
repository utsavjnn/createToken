pragma solidity >=0.4.22 <0.9.0; // just mention solidity -v

contract BubbleToken {
    // Constructor-> runs everytime our smart contract is deployed
    // Set the total number of tokens
    // Read the total number of tokens

    uint256 public totalSupply;
    // with public visibility we get getter function by default
    // totalSupply is also reqd function for ERC20 token
    // reading data from eth chain is free but writing to it costs data

    constructor () public {
        totalSupply = 1000000;// state variable-> a variable accessible to entire contract
        // whenver a state variable is updated its going to write to entire blockchain
    }
}
