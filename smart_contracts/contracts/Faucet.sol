//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @notice custom errors for revert statements

/// @dev requires privileged access
error NotPermitted();

/// @dev already called faucet max times
error AlreadyHit();

contract FaucetTest is ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public token; //ERC20 to be distributed
    address public admin; //Owner for admin function
    uint8 public allowedHits; //Max times an address can call faucet function
    uint[] public lvls; //Different categories

    mapping (uint => uint) public myFood; //Tracking number of tokens per 
    mapping (address => uint) public hits; //Tracking number of calls

    modifier onlyAdmin {
        if(msg.sender != admin) revert NotPermitted();
        _;
    }

    constructor(
        address _admin,
        address _token,
        uint8 _allowedHits,
        uint[] memory _lvls,
        uint[] memory _tokensPerLvl
    ) {
        require(_lvls.length == _tokensPerLvl.length, "!match");
        admin = _admin;
        token = _token;
        allowedHits = _allowedHits;
        
        for (uint i=0; i< _lvls.length; i++){
            myFood[_lvls[i]] = _tokensPerLvl[i];
            lvls.push(_lvls[i]);
        }
    }

    /// @notice main faucet function to send an amount of tokens to a wallet

    function hitMe(uint lvl) external nonReentrant returns (address) {
        if(hits[msg.sender] >= allowedHits) revert AlreadyHit();
        if(myFood[lvl] < 1) revert NotPermitted();
        
        uint myTokens = myFood[lvl];
        IERC20(token).safeTransfer(msg.sender, myTokens);

        hits[msg.sender] += 1; 
        
        return msg.sender;
    }

    /// @notice Admin function to update number of times user can reup on tokens
    /// @param _newHits New times someone can hit the contract

    function setAllowedHits(uint8 _newHits) external onlyAdmin returns (uint) {
        console.log("Changing allowed hits from '%s' to '%s'", allowedHits, _newHits);
        allowedHits = _newHits;
        return allowedHits;
    }

    /// @notice Admin function to reset the amount of food tokens distributed
    /// @param _lvls New Lvlv
    /// @param _lvlTokens New ERC20 distribution amount for Lvls

    function addNewLevels(uint[] memory _lvls, uint[] memory _lvlTokens) external onlyAdmin {
        require(_lvls.length == _lvlTokens.length, "!match");
            
        for (uint i=0; i< _lvls.length; i++){
            myFood[_lvls[i]] = _lvlTokens[i];
            lvls.push(_lvls[i]);
        }
    }
}
