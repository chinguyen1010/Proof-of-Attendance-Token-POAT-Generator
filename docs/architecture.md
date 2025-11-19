System Components

Smart Contract (Solidity)

Stores event metadata.

Stores hash of the secret code.

Records unique attendance per wallet.

Emits events for transparency.

Organizer

Deploys the contract.

Sets event information + secret code.

Reveals the code during the event.

Attendee

Has a crypto wallet.

Calls claimAttendance(secret) on-chain.

Verifier

Anyone who wants to confirm that a specific wallet attended.

Data Stored On-Chain

secretHash – hashed version of the event code.

hasClaimed[address] – boolean recording claim status.

totalClaims – total number of unique attendance claims.

eventName, eventURI – minimal event metadata.

Core Flow

Organizer deploys contract with event name, URI, and secret code (hashed).

Organizer shows the secret code at the event (slides, chat, screen).

Attendee enters the secret into the contract’s claimAttendance(secret) function.

Contract:

Hashes the provided input.

Compares it to the stored secret hash.

Ensures address has not claimed before.

Marks attendance + increments counters.

Anyone can later verify attendance via:

hasClaimed(walletAddress)

totalClaims()
