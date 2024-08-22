// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Vote {
    address public owner;

    event VoteAdded(uint voterId);
    
    constructor() {
        owner = msg.sender;
    }
    
    // Mapping to store vote count for each candidate
    mapping(uint => uint) public idCount;
    
    // Mapping to check if an address has voted
    mapping(address => bool) public voterVoted;
    
    // Struct to store voter's information
    struct Voter {
        uint votedTo;
        address voterAddress;
    }
    
    // Array to store all voters
    Voter[] public voters;
    
    // Function to count votes
    function countingVote(uint voterId) public {
        require(!voterVoted[msg.sender], "You have already voted.");
        idCount[voterId]++;
        voterVoted[msg.sender] = true;
        voters.push(Voter(voterId, msg.sender));
        emit VoteAdded(voterId);
    }
    
    // Function to get the vote count for a candidate
    function getVoteCount(uint voterId) public view returns (uint) {
        return idCount[voterId];
    }
}
