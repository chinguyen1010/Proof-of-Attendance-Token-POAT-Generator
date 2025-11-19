const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ProofOfAttendance", function () {
  const EVENT_NAME = "My Web3 Meetup";
  const EVENT_URI = "https://example.com/my-event";
  const SECRET = "super-secret-code";

  async function deployFixture() {
    const [organizer, attendee1, attendee2] = await ethers.getSigners();
    const Poat = await ethers.getContractFactory("ProofOfAttendance");
    const poat = await Poat.deploy(EVENT_NAME, EVENT_URI, SECRET);
    await poat.waitForDeployment();
    return { poat, organizer, attendee1, attendee2 };
  }

  it("sets organizer and event metadata", async () => {
    const { poat, organizer } = await deployFixture();
    expect(await poat.organizer()).to.equal(organizer.address);
    expect(await poat.eventName()).to.equal(EVENT_NAME);
    expect(await poat.eventURI()).to.equal(EVENT_URI);
  });

  it("rejects wrong secret", async () => {
    const { poat, attendee1 } = await deployFixture();
    await expect(
      poat.connect(attendee1).claimAttendance("wrong-secret")
    ).to.be.revertedWith("Invalid secret code");
  });

  it("allows claim with correct secret", async () => {
    const { poat, attendee1 } = await deployFixture();
    await expect(poat.connect(attendee1).claimAttendance(SECRET))
      .to.emit(poat, "AttendanceClaimed")
      .withArgs(attendee1.address, 1);

    expect(await poat.hasClaimed(attendee1.address)).to.equal(true);
    expect(await poat.totalClaims()).to.equal(1);
  });

  it("prevents double-claim", async () => {
    const { poat, attendee1 } = await deployFixture();
    await poat.connect(attendee1).claimAttendance(SECRET);

    await expect(
      poat.connect(attendee1).claimAttendance(SECRET)
    ).to.be.revertedWith("Already claimed");

    expect(await poat.totalClaims()).to.equal(1);
  });

  it("tracks multiple attendees", async () => {
    const { poat, attendee1, attendee2 } = await deployFixture();

    await poat.connect(attendee1).claimAttendance(SECRET);
    await poat.connect(attendee2).claimAttendance(SECRET);

    expect(await poat.totalClaims()).to.equal(2);
    expect(await poat.hasClaimed(attendee1.address)).to.equal(true);
    expect(await poat.hasClaimed(attendee2.address)).to.equal(true);
  });

  it("allows organizer to rotate secret", async () => {
    const { poat, organizer, attendee1 } = await deployFixture();
    const NEW_SECRET = "new-secret";

    await poat.connect(organizer).updateSecret(NEW_SECRET);

    // Old secret no longer works
    await expect(
      poat.connect(attendee1).claimAttendance(SECRET)
    ).to.be.revertedWith("Invalid secret code");

    // New secret works
    await poat.connect(attendee1).claimAttendance(NEW_SECRET);
    expect(await poat.totalClaims()).to.equal(1);
  });
});
