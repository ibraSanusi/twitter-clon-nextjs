import SideBar from '@/app/ui/SideBar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid grid-cols-layout max-w-[1300px] m-auto">
      <SideBar className="px-6 py-4 h-screen w-80" />
      <section className="flex flex-col px-6 py-4">{children}</section>
      {/* <SideBar className="px-6 py-4 h-screen w-80" /> */}
    </main>
  )
}
