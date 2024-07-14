// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IGnosisSafe {
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        uint8 operation
    ) external returns (bool success);
}

contract BlocksyContract is Ownable {
    struct Proposal {
        address to;
        uint256 value;
        bytes data;
        uint8 operation;
        uint256 voteCount;
        bool executed;
        mapping(address => bool) voted;
    }

    address public safeAddress;
    IGnosisSafe public safe;
    uint256 public proposalCount;

    mapping(uint256 => Proposal) public proposals;
    mapping(address => bool) public members;
    address[] public memberList;

    event ProposalCreated(uint256 indexed proposalId, address to, uint256 value);
    event ProposalExecuted(uint256 indexed proposalId, address to, uint256 value);
    event MemberAdded(address member);
    event MemberRemoved(address member);

    modifier onlyMember() {
        require(members[msg.sender], "Only members can perform this action");
        _;
    }

    constructor(address _safeAddress) Ownable(msg.sender) {
        safeAddress = _safeAddress;
        safe = IGnosisSafe(_safeAddress);
    }

    function addMember(address _member) external onlyOwner {
        require(!members[_member], "Member already added");
        members[_member] = true;
        memberList.push(_member);
        emit MemberAdded(_member);
    }

    function removeMember(address _member) external onlyOwner {
        require(members[_member], "Member not found");
        members[_member] = false;

        // Remove member from memberList
        for (uint256 i = 0; i < memberList.length; i++) {
            if (memberList[i] == _member) {
                memberList[i] = memberList[memberList.length - 1];
                memberList.pop();
                break;
            }
        }

        emit MemberRemoved(_member);
    }

    function getVoteThreshold() public view returns (uint256) {
        uint256 totalMembers = memberList.length;
        return (totalMembers / 2) + 1; // Majority threshold
    }

    function createProposal(address _to, uint256 _value, bytes calldata _data, uint8 _operation) external onlyMember returns (uint256) {
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.to = _to;
        proposal.value = _value;
        proposal.data = _data;
        proposal.operation = _operation;
        proposal.executed = false;

        emit ProposalCreated(proposalCount, _to, _value);
        return proposalCount;
    }

    function vote(uint256 proposalId) external onlyMember {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.voted[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal already executed");

        proposal.voted[msg.sender] = true;
        proposal.voteCount++;

        if (proposal.voteCount >= getVoteThreshold()) {
            executeProposal(proposalId);
        }
    }

    function executeProposal(uint256 proposalId) internal {
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal already executed");

        bool success = safe.execTransactionFromModule(proposal.to, proposal.value, proposal.data, proposal.operation);
        require(success, "Transaction failed");
        proposal.executed = true;

        emit ProposalExecuted(proposalId, proposal.to, proposal.value);
    }

    function getProposal(uint256 proposalId) external view returns (
        address to,
        uint256 value,
        bytes memory data,
        uint8 operation,
        uint256 voteCount,
        bool executed
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (proposal.to, proposal.value, proposal.data, proposal.operation, proposal.voteCount, proposal.executed);
    }
}
