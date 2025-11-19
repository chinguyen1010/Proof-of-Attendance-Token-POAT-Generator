# Proof-of-Attendance-Token-POAT-Generator

A simple smart contract that mints a non-fungible token (NFT, but a very simplified version) or a standard ERC-20 token with a supply of "1" to an address that provides a specific "secret code" provided at the event.

Blockchain-based attendance verification using a secret event code and one-per-wallet on-chain claims.


Problem Statement: Event organizers need a simple, immutable way to verify and reward attendance at a specific physical or virtual event.

● Proposed Solution: A simple smart contract that mints a non-fungible token (NFT, but a very simplified version) or a standard ERC-20 token with a supply of "1" to an address that provides a specific "secret code" provided at the event.

● Core Smart Contract Logic:

○ A state variable for a secret code/password.

○ A function claimAttendance(string memory secret) that verifies the
code.

○ If correct, call a minimal_mint function (or just record the address in a mapping). Focus on the logic, not complex NFT standards.


##1. Overview

Event organizers need a reliable way to confirm real attendance at physical or virtual events. Traditional Web2 methods—sign-in sheets, QR codes, screenshots—are easily faked or duplicated.

The POAT Generator is a minimal blockchain smart contract that:

Accepts a secret code revealed only during the event

Validates it on-chain

Records attendance immutably

Ensures only one claim per wallet

Allows anyone to verify attendance publicly

This creates a simple, tamper-proof Proof-of-Attendance system without needing a full NFT standard.
