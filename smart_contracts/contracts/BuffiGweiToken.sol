//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @dev requires privileged access
error NotPermitted();

contract BuffiGweiToken is ERC20 {

    address public minter; 

    modifier onlyMinter {
        if(msg.sender != minter) revert NotPermitted();
        _;
    }

    constructor(address _minter, uint amount) ERC20("BuffiGwei22 Token", "BGT") {
        minter = _minter; 
        _mint(minter, amount);
    }

    function mint(address dest, uint amount) external onlyMinter returns (uint){
        _mint(dest, amount);
        return amount;
    }

    function updateMinter(address newMinter) external onlyMinter returns (address){
        minter = newMinter; 
        return newMinter;
    }
}
