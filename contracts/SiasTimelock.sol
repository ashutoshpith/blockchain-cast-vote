// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/governance/TimelockController.sol";

contract SiasTimelock is TimelockController {
    constructor(
          uint _minDelay,
        address[] memory _proposers,
        address[] memory _executors
    )TimelockController(_minDelay, _proposers, _executors) {} 
}