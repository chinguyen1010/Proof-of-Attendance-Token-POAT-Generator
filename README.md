# Proof-of-Attendance-Token-POAT-Generator

A simple smart contract that mints a non-fungible token (NFT, but a very simplified version) or a standard ERC-20 token with a supply of "1" to an address that provides a specific "secret code" provided at the event.

A simple blockchain POAT system that verifies an event code and records unique on-chain attendance per wallet.

Problem Statement: Event organizers need a simple, immutable way to verify and reward attendance at a specific physical or virtual event.

● Proposed Solution: A simple smart contract that mints a non-fungible token (NFT, but a very simplified version) or a standard ERC-20 token with a supply of "1" to an address that provides a specific "secret code" provided at the event.

● Core Smart Contract Logic:

○ A state variable for a secret code/password.

○ A function claimAttendance(string memory secret) that verifies the
code.

○ If correct, call a minimal_mint function (or just record the address in a mapping). Focus on the logic, not complex NFT standards.

