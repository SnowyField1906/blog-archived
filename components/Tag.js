import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mt-2 mr-3 rounded-2xl border-2 border-primary-600 dark:border-primary-400 py-1 px-3 text-sm font-medium text-primary-600 dark:text-primary-400 transition duration-500 ease-in-out hover:bg-primary-600 dark:hover:bg-primary-400 hover:text-gray-100 dark:hover:text-gray-900">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
