// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
      // GovernorCompatibilityBravo,

contract SiasGovernor is 
      Governor,
      GovernorCountingSimple,
      GovernorVotes,
      GovernorVotesQuorumFraction,
      GovernorTimelockControl {
         uint public votingDelay_;
         uint public votingPeriod_;

    constructor(
      IVotes _token,
      TimelockController _timelock,
       uint _quorum,
       uint _votingDelay,
       uint _votingPeriod
       ) 
    Governor("Sias Governor")
    GovernorVotes(_token)
    GovernorVotesQuorumFraction(_quorum)
    GovernorTimelockControl(_timelock)
     {
      votingDelay_ = _votingDelay;
      votingPeriod_ = _votingPeriod;
     }

     function votingDelay() public view override returns (uint) {
        return votingDelay_; 
     }

     function votingPeriod() public view override returns (uint) {
        return votingPeriod_;
     }

     function proposalThreshold() public pure override returns (uint) {
        return 0;
     }

     function quorum(uint blocknumber)
         public
         view
         override(IGovernor, GovernorVotesQuorumFraction) 
         returns (uint) {
        return super.quorum(blocknumber);        
     }

     function getVotes(address account, uint blocknumber) public view override(IGovernor, Governor) returns (uint) {
        return super.getVotes(account, blocknumber);
     }

     function state(uint proposalId) 
         public 
         view 
         override(Governor, GovernorTimelockControl)
      returns (ProposalState) {
        return super.state(proposalId);
     }

     function propose(
      address[] memory targets,
      uint[] memory values, 
      bytes[] memory calldatas, 
      string memory description)
         public override(Governor, IGovernor) 
             returns (uint)
      {
        return super.propose(targets, values, calldatas, description);
     }

     function _execute(
         uint proposalId,
         address[] memory targets,
         uint[] memory values, 
         bytes[] memory calldatas, 
         bytes32 descriptionHash)
            internal override(Governor, GovernorTimelockControl)
      {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
     }

     function _cancel(
         address[] memory targets, 
         uint[] memory values, 
         bytes[] memory calldatas, 
         bytes32 descriptionHash)
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

     function supportsInterface(bytes4 interfaceId)
       public 
       view
       override(Governor, GovernorTimelockControl) 
         returns (bool) {
        return super.supportsInterface(interfaceId);
     }

}