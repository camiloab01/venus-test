import { db } from '../../config/db'
import { RowDataPacket } from 'mysql2'

export async function sumTotalSupply(chainId?: '1' | '56'): Promise<number> {
  let sql = 'SELECT SUM(total_supply_cents) AS tvl FROM market'
  const params: (string | number)[] = []

  if (chainId) {
    sql += ' WHERE chain_id = ?'
    params.push(chainId)
  }

  const [rows] = await db().execute<RowDataPacket[]>(sql, params)
  return Number((rows as any)[0].tvl) || 0
}
