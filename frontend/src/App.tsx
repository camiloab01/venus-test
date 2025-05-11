import './App.css'

function App() {
  return (
    <div className="h-[490px] w-[359px] bg-white/[4%] rounded-[24px]">
      <div className="h-1/2 bg-[url('/src/assets/illustration.png')] bg-[length:410px_358px] bg-no-repeat bg-cover bg-right-top"></div>
      <div className="h-1/2 flex flex-col items-center p-8 gap-4 bg-[#282931] rounded-b-[24px]">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Treasury balance
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            1,111.111111111111111111 XVS
          </p>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Market size
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            $1111.11
          </p>
        </div>
        <button
          type="button"
          className="text-white bg-[#3A78FF] hover:bg-blue-600 font-semibold rounded-lg text-md px-5 py-2.5 focus:outline-none w-full"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default App
