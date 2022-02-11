import { atBase, faucetContract } from "../app";

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const checkUnclaimed = async () => {
  const allAddress: string[] = [];

  atBase(process.env.AIRTABLE_TABLE as string)
    .select({
      filterByFormula: "NOT({Faucet} = '')"
    })
    .eachPage(
      async (records, fetchNextPage) => {
        if (!records) throw new Error("no records");
        const addresses = records.map(r => r.get("ETH_Address"));
        // @ts-ignore
        allAddress.push(...addresses);
        fetchNextPage();
      },
      async () => {
        let count = 0;
        console.log(`checking ${allAddress.length} addresses`);
        
        for (let address of allAddress) {
          const res = await faucetContract.hits(address);

          if (res.isZero()) {
            count++;
            console.log(address);
          }
          await wait(1000);
        }
        console.log(`${count} unclaimed addresses`);
      }
    );
};
checkUnclaimed();
