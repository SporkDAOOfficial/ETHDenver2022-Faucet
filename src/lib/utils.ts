export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return "";
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function formattedNFTBalance(_balance: number): number {
  return Number(_balance);
}
