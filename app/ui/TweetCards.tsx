// import Image from 'next/image'
// import TweetIteractions from './TweetIteractions'
// import { EllipsisVerticalIcon } from '@heroicons/react/16/solid'
// import { useEffect, useState } from 'react'
// import { TweetResponse } from '@/lib/interfaces'

// export default function TweetCards() {
//   const [tweets, setTweets] = useState<TweetResponse[]>()

//   // RECUPERAR LOS TWEETS DE LA BASE DE DATOS
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('/api/get/followingTweets', {
//         method: 'GET',
//       })

//       if (response.status !== 200) {
//         return
//       }

//       const data: TweetResponse[] = await response.json()

//       setTweets(data)

//       // console.log(`El post fue publicado hace ${tweetCreatedAt}`)
//     }
//     fetchData()
//   }, [])

//   const getPublishDateFormatted = (timestampISO8601: string) => {
//     // Supongamos que tienes el timestamp en formato ISO 8601

//     // Convertir el timestamp a un objeto Date
//     const publicationDate: Date = new Date(timestampISO8601)

//     // Obtener la fecha y hora actual
//     const now: Date = new Date()

//     // Calcular la diferencia en milisegundos
//     const timeDifferenceMs: number = now.getTime() - publicationDate.getTime()

//     // Convertir la diferencia de milisegundos a segundos, minutos, horas, días, meses y años
//     const seconds: number = Math.floor(timeDifferenceMs / 1000)
//     const minutes: number = Math.floor(seconds / 60)
//     const hours: number = Math.floor(minutes / 60)
//     const days: number = Math.floor(hours / 24)
//     const months: number = Math.floor(days / 30)
//     const years: number = Math.floor(months / 12)

//     // Crear un mensaje para mostrar la diferencia de tiempo
//     // TODO: ADAPTAR EL MENSAJE PARA PONERLO EN EL TWEET
//     if (years > 0) {
//       return `${years} año${years > 1 ? 's' : ''}, `
//     } else if (months > 0) {
//       return `${months} mes${months > 1 ? 'es' : ''}, `
//     } else if (days > 0) {
//       return `${days} día${days > 1 ? 's' : ''}, `
//     } else if (hours > 0) {
//       return `${hours} hora${hours > 1 ? 's' : ''}, `
//     } else if (minutes > 0) {
//       return `${minutes} minuto${minutes > 1 ? 's' : ''}, `
//     } else if (seconds > 0) {
//       return `${seconds} segundo${seconds > 1 ? 's' : ''}`
//     }
//   }

//   return (
//     tweets &&
//     tweets.map(
//       ({
//         id,
//         author,
//         username,
//         avatarUrl,
//         commentCount,
//         content,
//         createdAt,
//         likeCount,
//         liked,
//         mediaUrl,
//         repostCount,
//         reposted,
//         comments,
//       }) => (
//         <article
//           className="flex flex-col gap-4 rounded-2xl bg-blue-200 p-8"
//           key={id}
//         >
//           <header className="flex flex-row items-center justify-between gap-4">
//             <Image
//               className="rounded-full"
//               // TODO: OBTENER URL DE LA RESPUESTA
//               src={`${avatarUrl}`}
//               alt="Avatar del usuario del post"
//               width={45}
//               height={45}
//             />
//             <div className="w-full">
//               <h2 className="text-md font-bold">@{username}</h2>
//               {
//                 <span className="text-sm">
//                   {getPublishDateFormatted(createdAt)}
//                 </span>
//               }
//             </div>

//             {/* TODO: Opciones de los tweets (eliminar, editar o lo que sea...) */}
//             <button className="box-border flex w-8 rounded-full border border-slate-500 p-2 text-black">
//               <EllipsisVerticalIcon />
//             </button>
//           </header>

//           <p>{content}</p>

//           {/* TODO: Aqui irían las imagenes en caso de que el post tuviese */}
//           {/* <section></section> */}

//           <TweetIteractions
//             tweetId={id}
//             liked={liked}
//             reposted={reposted}
//             likesCount={likeCount}
//             commentsCount={commentCount}
//             repostsCount={repostCount}
//           />
//         </article>
//       ),
//     )
//   )
// }
