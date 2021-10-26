export const Confirmed = (): JSX.Element => {
  return (
    <>
      <header className="text-center mb-4">
        <h2 className="header2 mb-4">Congrats!</h2>
        <h3 className="header3 italic mb-6 px-4 sm:px-4">
          You’ll get a free LLC / S-Corp + 1,000 $WORK <br />
          All you have to do is sign up for Opolis
        </h3>
      </header>
      <div>
        <button className="btn-primary mx-auto block mb-6">
          Schedule an Onboarding Call
        </button>
        <p className="section-description text-center px-4 md:px-24">
          Offer valid to new members who collect both Opolis NFTs at the NFT.NYC
          event and join Opolis between November 1, 2021 - January 1, 2022. See
          the details The Details:Opolis will cover the cost of creating a new
          LLC/S Corp (up to $300 value) only if new members utilize Opolis’
          in-house entity creation service. This offer is not redeemable for
          cash or additional discounts, nor is it valid for current members.
          Members who join Opolis and already have an LLC/S Corp created are
          only eligible to receive 1000 $WORK tokens.
        </p>
      </div>
    </>
  );
};
