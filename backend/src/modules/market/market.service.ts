import { sumTotalSupply } from './market.model';

export async function getMarketTvl(chainId?: '1' | '56') {
  return sumTotalSupply(chainId);
}
