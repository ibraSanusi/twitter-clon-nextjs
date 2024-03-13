import { FolderOpenIcon, PhotoIcon } from '@heroicons/react/16/solid'
import { ComponentType } from 'react'

interface Multimedia {
  name: string
  icon: ComponentType
}

export default function Multimedia() {
  const multimediaList: Multimedia[] = [
    {
      name: 'File',
      icon: FolderOpenIcon,
    },
    {
      name: 'Image',
      icon: PhotoIcon,
    },
  ]
  return multimediaList.map((multimedia) => {
    const MultimediaIcon: ComponentType = multimedia.icon
    return (
      <div className="flex flex-row" key={multimedia.name}>
        <i className="size-6">
          <MultimediaIcon />
        </i>
        <span className="font-bold">{multimedia.name}</span>
      </div>
    )
  })
}
