import Image from 'next/image'
import NavLinks from './NavLinks'

export default function SideBar() {
  return (
    <section className="px-6 py-4 h-[100dvh] w-80">
      <header className="w-full my-8 flex flex-col gap-1 justify-center items-center">
        <Image
          src="/delba_oliveira.webp"
          alt="Imagen de perfil de delba TODO"
          width={80}
          height={80}
          className="rounded-full"
        />
        <strong>Delba Oliveira</strong>
        <span className="text-sm">@delba.dev</span>
      </header>

      <NavLinks />

      <footer></footer>
    </section>
  )
}
