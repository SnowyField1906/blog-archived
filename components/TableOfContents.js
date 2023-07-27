import { content } from '@/lib/utils/toc'

const TableOfContents = ({ toc }) => {
  return (
    <div className="fixed flex flex-col items-center space-x-2 pt-8 xl:sticky xl:top-0">
      <div className="grid">
        {toc.map((heading) => {
          return content(heading)
        })}
      </div>
    </div>
  )
}

export default TableOfContents
