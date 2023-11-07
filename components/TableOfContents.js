import { content } from '@/lib/utils/toc'

const TableOfContents = ({ toc }) => {
  return (
    <div className="overflow-y fixed flex h-[90vh] translate-y-[5vh] flex-col items-center space-x-2 overflow-y-hidden hover:overflow-y-scroll xl:sticky xl:top-0">
      <div className="grid">
        {toc.map((heading) => {
          return content(heading)
        })}
      </div>
    </div>
  )
}

export default TableOfContents
