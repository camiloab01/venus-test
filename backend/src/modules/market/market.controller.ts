import { Request, Response, NextFunction } from 'express';
import { getMarketTvl } from './market.service';

export async function marketTvlHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const chainId = req.query.chainId as '1' | '56' | undefined;
    const marketTvl = await getMarketTvl(chainId);
    res.json({ marketTvl });
  } catch (err) {
    next(err);
  }
}
