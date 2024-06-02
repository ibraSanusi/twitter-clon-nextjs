import MessageSectionHeader from '@/app/ui/MessageSectionHeader'
import MessagingSection from '@/app/ui/MessagingSection'
import Chat from '@/app/ui/message/Chat'

export default function Page() {
  return (
    <section className="m-auto flex h-screen w-full flex-row gap-8 pt-[80px] xl:max-w-[1128px]">
      <main className="grid h-full w-full place-content-center gap-4">
        {/* <section className="h-full rounded-tl-md rounded-tr-md bg-white shadow-md xl:max-w-[782px]">
          <MessageSectionHeader />
          <MessagingSection />
        </section> */}
        <Chat />
      </main>
    </section>
  )
}
