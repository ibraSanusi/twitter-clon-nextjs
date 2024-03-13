import { ArrowPathIcon, HeartIcon } from '@heroicons/react/20/solid'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/20/solid'
import { ComponentType } from 'react'

interface InteractionButtons {
  count: number
  icon: ComponentType
}

export default function TweetIteractions() {
  const interactionButtons: InteractionButtons[] = [
    {
      count: 489,
      icon: ChatBubbleLeftRightIcon,
    },
    {
      count: 24,
      icon: HeartIcon,
    },
    {
      count: 16,
      icon: ArrowPathIcon,
    },
  ]
  return (
    <section className="flex flex-row gap-2">
      {interactionButtons.map((interaction) => {
        const ButtonIcon: ComponentType = interaction.icon

        return (
          <button
            key={interaction.count}
            className=" text-slate-600 flex flex-row items-center gap-1"
          >
            <div className="size-4">
              <ButtonIcon />
            </div>
            <span className="text-sm">{interaction.count}</span>
          </button>
        )
      })}
    </section>
  )
}
