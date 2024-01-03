import Image from 'next/image'

export default function Header() {
  return (
    <header className="p-1">
      <nav className="flex items-center">
      <Image
              src="/LOGOblue.svg"
              width={40}
              height={40}
              alt="Logo"
            />
            <span className='text-lg font-bold text-primary'>Usercache</span>
            <div className=' w-full flex justify-end'>
        <button className=" justify-end btn btn-sm btn-primary ">
          Log In
        </button>
        </div>
      </nav>
    </header>
  )
}
