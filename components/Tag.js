import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ page, text, num }) => {
  return (
    <Link href={`/${page}/tag/${kebabCase(text)}`}>
      <a className="group mt-2 mr-3 rounded-3xl border-2 border-primary-600 py-1 px-4 text-lg font-medium capitalize text-primary-600 transition duration-300 ease-in-out hover:bg-primary-600 hover:text-gray-100 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-gray-900">
        {text.split(' ').join('-')}
        {num && (
          <span className="ml-3 h-max border-l border-primary-600 pl-3 font-normal group-hover:border-gray-100 dark:border-primary-400 group-hover:dark:border-gray-900">
            {num}
          </span>
        )}
      </a>
    </Link>
  )
}

export default Tag
