import HeaderNav from './HeaderNav'
import MainLogo from './logos/MainLogo'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full justify-center bg-white px-4 xl:px-0">
      <nav className="m-auto flex w-full flex-row gap-2 py-2 xl:max-w-[1128px] xl:justify-between">
        <div className="flex flex-row items-center gap-2">
          <MainLogo size={40} />
          <div className="flex w-fit flex-row gap-2 rounded-md px-2 py-1 xl:bg-gray-200">
            <MagnifyingGlassIcon className="w-6 text-gray-500 xl:w-4 xl:text-inherit" />
            <input
              className="hidden bg-transparent placeholder:text-sm placeholder:text-gray-400 focus:outline-none xl:inline-block"
              placeholder="Buscar"
              role="combobox"
              aria-autocomplete="list"
              aria-label="Buscar"
              aria-activedescendant=""
              aria-expanded="false"
              type="text"
              aria-controls=""
            />
          </div>
        </div>

        <HeaderNav />

        <span className="w-full text-center text-lg text-red-500 md:text-3xl xl:hidden">
          Radio Patio
        </span>
      </nav>
    </header>
  )
}
