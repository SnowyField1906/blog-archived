import { content } from '@/lib/utils/toc'

const TableOfContents = ({ toc }) => {
  return (
    <div className="overflow-y small-scroll fixed flex h-[95%] translate-y-10 flex-col items-center space-x-2 overflow-y-hidden hover:overflow-y-scroll xl:sticky xl:top-0">
      <div className="grid">
        {toc.map((heading) => {
          return content(heading)
        })}
      </div>
    </div>
  )
}

export default TableOfContents
