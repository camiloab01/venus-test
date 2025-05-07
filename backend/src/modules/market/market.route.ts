import { Router } from 'express';
import { marketTvlHandler } from './market.controller';

const router = Router();

router.get('/tvl', marketTvlHandler);

export default router;
