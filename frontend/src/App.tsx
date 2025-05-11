import './App.css'

function App() {
  return (
    <div className="h-[265px] w-[976px] bg-[#282931] rounded-[24px] bg-[url('/src/assets/illustration.png')] bg-[length:715px_624px] bg-no-repeat bg-cover bg-right-top">
      <div className="flex flex-col items-start h-full p-8 gap-4">
        <div className="flex flex-col gap-2 items-start">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Treasury balance
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            1,111.111111111111111111 XVS
          </p>
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p className="text-lg leading-[27px] text-white font-semibold">
            Market size
          </p>
          <p className="text-[#9597A1] text-[16px] leading-[24px] font-normal">
            $1111.11
          </p>
        </div>
        <button
          type="button"
          className="text-white bg-[#3A78FF] hover:bg-blue-600 font-semibold rounded-lg text-md px-5 py-2.5 focus:outline-none"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}

export default App
