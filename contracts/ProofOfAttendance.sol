// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofOfAttendance {
    address public organizer;
    bytes32 private secretHash; // keccak256 hash of the secret code
    string public eventName;
    string public eventURI; // optional: link to event info / slides

    mapping(address => bool) public hasClaimed;
    uint256 public totalClaims;

    event AttendanceClaimed(address indexed attendee, uint256 indexed claimId);
    event SecretUpdated(bytes32 indexed newSecretHash);
    event EventMetadataUpdated(string eventName, string eventURI);

    modifier onlyOrganizer() {
        require(msg.sender == organizer, "Not organizer");
        _;
    }

    constructor(
        string memory _eventName,
        string memory _eventURI,
        string memory _secret
    ) {
        organizer = msg.sender;
        eventName = _eventName;
        eventURI = _eventURI;
        secretHash = keccak256(abi.encodePacked(_secret));
        emit EventMetadataUpdated(_eventName, _eventURI);
        emit SecretUpdated(secretHash);
    }

    function claimAttendance(string memory _secret) external {
        require(!hasClaimed[msg.sender], "Already claimed");

        bytes32 providedHash = keccak256(abi.encodePacked(_secret));
        require(providedHash == secretHash, "Invalid secret code");

        hasClaimed[msg.sender] = true;
        totalClaims += 1;

        emit AttendanceClaimed(msg.sender, totalClaims);
    }

    // Optional: organizer can rotate the secret for multi-session events
    function updateSecret(string memory _newSecret) external onlyOrganizer {
        secretHash = keccak256(abi.encodePacked(_newSecret));
        emit SecretUpdated(secretHash);
    }

    function updateEventMetadata(
        string memory _eventName,
        string memory _eventURI
    ) external onlyOrganizer {
        eventName = _eventName;
        eventURI = _eventURI;
        emit EventMetadataUpdated(_eventName, _eventURI);
    }
}
