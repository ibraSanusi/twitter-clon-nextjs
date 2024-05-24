import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

export default function MessageSectionHeader() {
  return (
    <header className="flex flex-row items-center justify-between border-b-[0.3px] p-3">
      <div className="flex flex-row gap-4">
        <span className="">Mensajes</span>

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

      <button>
        <div className="w-6">
          <PencilSquareIcon />
        </div>
      </button>
    </header>
  )
}
