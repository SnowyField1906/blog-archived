import timelineData from '@/data/timelineData'
import { Disclosure, Transition } from '@headlessui/react'
import TimeTag from './TimeTag'

export default function Timeline() {
  return (
    <div>
      <ol className="relative border-l border-zinc-400 dark:border-gray-800 ">
        {timelineData.map((data, index) => (
          <TimeTag key={index} {...data} />
        ))}
      </ol>
    </div>
  )
}
