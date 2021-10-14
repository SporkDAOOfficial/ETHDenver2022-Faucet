import { useState } from "react";
import { Confirmed } from "./Confirmed";
import { Unconfirmed } from "./Unconfirmed";

interface FuncProps {
  disconnect: () => void;
}

export const Welcome: React.FC<FuncProps> = (props: FuncProps) => {
  const [confirmed, setConfirmed] = useState<boolean | null>(null);
  async function confirmEligibility() {
    setConfirmed(false);
  }

  return confirmed == null ? (
    <>
      <header className="text-center mb-4">
        <h2 className="header2 mb-4">Welcome!</h2>
        <h3 className="header3 italic mb-6 px-4 sm:px-10">
          See if you’re eligible for a special gift from Opolis
        </h3>
      </header>
      <div>
        <button
          className="btn-primary mx-auto block mb-6"
          onClick={confirmEligibility}
        >
          Confirm eligibility
        </button>
        <p className="section-description text-center px-4 md:px-24">
          We’re checking to see if you have both Opolis NFTs from NFT.NYC
        </p>
      </div>
    </>
  ) : confirmed ? (
    <Confirmed />
  ) : (
    <Unconfirmed disconnect={props.disconnect} />
  );
};
