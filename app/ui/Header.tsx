import HeaderNav from './HeaderNav'
import MainLogo from './logos/MainLogo'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'

export default function Header() {
  return (
    <header className="fixed top-0 z-50 flex w-full justify-center bg-white">
      <nav className="m-auto flex w-full flex-row justify-between py-2 xl:max-w-[1128px]">
        <div className="flex flex-row items-center gap-2">
          <MainLogo size={40} />
          <div className="flex w-fit flex-row gap-2 rounded-md bg-gray-200 px-2 py-1">
            <MagnifyingGlassIcon className="w-4" />
            <input
              className="bg-transparent placeholder:text-sm placeholder:text-gray-400 focus:outline-none"
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
      </nav>
    </header>
  )
}
