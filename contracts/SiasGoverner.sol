// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";

contract SiasGoverner is Governor, GovernorCompatibilityBravo, GovernorVotes, GovernorVotesQuorumFraction, GovernorTimelockControl {
    constructor(IVotes _token, TimelockController _timelock) 
    Governor("MyGoverner")
    GovernorVotes(_token)
    GovernorVotesQuorumFraction(4)
    GovernorTimelockControl(_timelock)
     {}

     function votingDelay() public pure override returns (uint) {
        return 6575; // 1day
     }

     function votingPeriod() public pure override returns (uint) {
        return 46027; // 1week
     }

     function proposalThreshold() public pure override returns (uint) {
        return 0;
     }

     function quorum(uint blocknumber) public view override(IGovernor, GovernorVotesQuorumFraction) returns (uint) {
        return super.quorum(blocknumber);        
     }

     function getVotes(address account, uint blocknumber) public view override(IGovernor, Governor) returns (uint) {
        return super.getVotes(account, blocknumber);
     }

     function state(uint proposalId) public view override(Governor, IGovernor, GovernorTimelockControl)
      returns (ProposalState) {
        return super.state(proposalId);
     }

     function propose(address[] memory targets, uint[] memory values, bytes[] memory calldatas, string memory description)
     public override(Governor, GovernorCompatibilityBravo, IGovernor) 
     returns (uint)
      {
        return super.propose(targets, values, calldatas, description);
     }

     function _execute(uint proposalId, address[] memory targets, uint[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
     internal override(Governor, GovernorTimelockControl)
      {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
     }

     function _cancel(address[] memory targets, uint[] memory values, bytes[] memory calldatas, bytes32 descriptionHash)
     internal 
     override(Governor, GovernorTimelockControl)
     returns (uint)
      {
        return super._cancel(targets, values, calldatas, descriptionHash);
     }

     function _executor() 
     internal
      view
       override(Governor, GovernorTimelockControl) 
       returns (address)
       {
      return super._executor();        
     }

     function supportsInterface(bytes4 interfaceId) public view override(Governor, IERC165, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
     }

}