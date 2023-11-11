import Link from '@/components/Link'

export default function Pagination({ totalPages, currentPage }) {
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)

  return (
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="grid grid-cols-3 text-center">
        {!prevPage && (
          <div className="cursor-default font-medium opacity-30 hover:no-underline">Previous</div>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/posts/` : `/posts/page/${currentPage - 1}`}
            className="font-medium text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-100"
          >
            Previous
          </Link>
        )}
        <span className="text-lg font-medium">
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <div className="cursor-default font-medium opacity-30 hover:no-underline">Next</div>
        )}
        {nextPage && (
          <Link
            href={`/posts/page/${currentPage + 1}`}
            className="font-medium text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-100"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
