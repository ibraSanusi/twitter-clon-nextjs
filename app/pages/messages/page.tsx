import MessageSectionHeader from '@/app/ui/MessageSectionHeader'
import MessagingSection from '@/app/ui/MessagingSection'

export default function Page() {
  return (
    <section className="m-auto flex h-screen w-full flex-row gap-8 overflow-hidden pt-[80px] xl:max-w-[1128px]">
      <main className="flex w-full flex-col gap-4">
        <section className="h-full rounded-tl-md rounded-tr-md bg-white shadow-md xl:max-w-[782px]">
          <MessageSectionHeader />
          <MessagingSection />
        </section>
      </main>
    </section>
  )
}
