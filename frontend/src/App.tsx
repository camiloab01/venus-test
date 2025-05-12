import { useReadContract } from 'wagmi'
import { erc20Abi, formatUnits } from 'viem'
import './App.css'
import {
  API_URL,
  TREASURY_ACCOUNT_ADDRESS,
  XVS_CONTRACT_ADDRESS,
} from './config'
import { useQuery } from '@tanstack/react-query'

function App() {
  // **************** ON-CHAIN DATA ****************
  // Fetch the treasury balance of XVS token
  // using the read contract hook from wagmi
  const { data: XVSBalance, refetch: refetchBalance } = useReadContract({
    abi: erc20Abi,
    address: XVS_CONTRACT_ADDRESS,
    functionName: 'balanceOf',
    args: [TREASURY_ACCOUNT_ADDRESS],
  })

  // **************** OFF-CHAIN DATA ****************
  // Fetch the market TVL from the API
  // using the react-query library
  const { data: marketTvl, refetch: refetchTvl } = useQuery({
    queryKey: ['tvl'],
    queryFn: async () => {
      const res = await fetch(API_URL)
      if (!res.ok) console.log('API error', res)
      const { marketTvl } = await res.json()
      return marketTvl as number
    },
    staleTime: 60_000,
  })

  const handleRefresh = () => {
    refetchBalance()
    refetchTvl()
  }

  return (
    <div className="h-[454px] md:h-[265px] lg:h-[265px] w-[359px] sm:w-[591px] md:w-[792px] lg:w-[976px] md:bg-[#282931] bg-white/[4%] rounded-[24px]">
      <div className="block md:hidden h-[236px] bg-[url('/src/assets/illustration.png')] bg-[length:410px_358px] bg-no-repeat bg-[position:center_top_10px]"></div>
      <div className="h-[218px] md:h-full flex flex-col md:items-start justify-between md:p-8 p-4 gap-2 md:bg-[url('/src/assets/illustration.png')] md:bg-[length:715px_624px] md:bg-no-repeat md:bg-[position:left_320px_top_-60px] lg:bg-[position:left_345px_top_-60px] bg-white/[4%] rounded-b-[24px] md:rounded-[24px]">
        <div className="flex flex-col gap-1 md:items-start items-center">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Treasury balance
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            {XVSBalance
              ? `${Number(formatUnits(XVSBalance, 18)).toFixed(4)} XVS`
              : '—'}
          </p>
        </div>
        <div className="flex flex-col gap-1 md:items-start items-center">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Market size
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            {marketTvl
              ? marketTvl.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 2,
                })
              : '—'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="min-h-[48px] text-white bg-[#3A78FF] hover:bg-blue-600 font-semibold rounded-lg text-md focus:outline-none w-full md:w-[108px] cursor-pointer"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default App
