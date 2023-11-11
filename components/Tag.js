import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ page, text, num, isCurrent }) => {
  const currentA = isCurrent
    ? 'bg-primary-600 text-gray-100 dark:border-primary-400 dark:text-primary-400 dark:bg-primary-400 dark:text-gray-900'
    : 'text-primary-600 hover:bg-primary-600 hover:text-gray-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900'

  const currentSpan = isCurrent
    ? 'border-gray-100 dark:border-gray-900'
    : 'border-primary-600 group-hover:border-gray-100 dark:border-primary-400 dark:group-hover:border-gray-900'

  return (
    <Link href={`/${page}/tag/${kebabCase(text)}`}>
      <a
        className={`${currentA +
          ' group my-1 mx-1 block w-max rounded-3xl border-2 border-primary-600 py-0.5 px-4 text-base font-medium transition duration-200 ease-in-out'
          }`}
      >
        {text}
        {num && (
          <span className={`${currentSpan + ' ml-3 h-max border-l pl-3 font-normal'}`}>{num}</span>
        )}
      </a>
    </Link>
  )
}

export default Tag
