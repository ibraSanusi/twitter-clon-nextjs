import { GlobeEuropeAfricaIcon } from '@heroicons/react/16/solid'
import Image from 'next/image'
import DotIcon from '@/app/ui/DotIcon'

interface Props {
  username: string
  fullname: string
  createdAt: string
  avatarUrl: string
}

export default function TweetCardHeader({
  username,
  fullname,
  createdAt,
  avatarUrl,
}: Props) {
  const getPublishDateFormatted = (timestampISO8601: string) => {
    // Supongamos que tienes el timestamp en formato ISO 8601

    // Convertir el timestamp a un objeto Date
    const publicationDate: Date = new Date(timestampISO8601)

    // Obtener la fecha y hora actual
    const now: Date = new Date()

    // Calcular la diferencia en milisegundos
    const timeDifferenceMs: number = now.getTime() - publicationDate.getTime()

    // Convertir la diferencia de milisegundos a segundos, minutos, horas, días, meses y años
    const seconds: number = Math.floor(timeDifferenceMs / 1000)
    const minutes: number = Math.floor(seconds / 60)
    const hours: number = Math.floor(minutes / 60)
    const days: number = Math.floor(hours / 24)
    const months: number = Math.floor(days / 30)
    const years: number = Math.floor(months / 12)

    // Crear un mensaje para mostrar la diferencia de tiempo
    // TODO: ADAPTAR EL MENSAJE PARA PONERLO EN EL TWEET
    if (years > 0) {
      return `${years} año${years > 1 ? 's' : ''} `
    } else if (months > 0) {
      return `${months} mes${months > 1 ? 'es' : ''} `
    } else if (days > 0) {
      return `${days} día${days > 1 ? 's' : ''} `
    } else if (hours > 0) {
      return `${hours} hora${hours > 1 ? 's' : ''} `
    } else if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? 's' : ''} `
    } else if (seconds > 0) {
      return `${seconds} segundo${seconds > 1 ? 's' : ''}`
    }
  }

  return (
    <section className="flex flex-row items-center justify-between gap-2 p-4">
      <div className="flex flex-row items-center gap-2">
        <Image
          className="scale-100 overflow-hidden rounded-full border-2 border-white"
          alt={`Foto de perfil de ${username}`}
          src={`/${avatarUrl}`}
          height={64}
          width={64}
        />

        <div className="flex flex-col">
          <h2 className="font-bold">{username}</h2>
          <span className="text-xs">{fullname}</span>
          <span className="flex flex-row items-center gap-1 text-xs text-slate-600">
            {getPublishDateFormatted(createdAt)}
            <DotIcon />
            <div className="size-4">
              <GlobeEuropeAfricaIcon />
            </div>
          </span>
        </div>
      </div>
    </section>
  )
}
