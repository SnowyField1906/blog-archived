import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import formatDate from '@/lib/utils/formatDate'
import ViewCounter from '@/components/ViewCounter'
import Tag from '@/components/Tag'
import Image from 'next/image'

const PostPreview = ({ slug, date, title, summary, tags, thumbnail }) => {
  return (
    <Link
      href={`/posts/${slug}`}
      passHref
      key={slug}
      className="group flex h-[14rem] bg-transparent bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <li
        key={slug}
        className="flex items-center bg-transparent bg-opacity-20 py-6 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
      >
        <div className="relative mx-8 hidden h-[14rem] w-[28rem] object-cover lg:block">
          <Image src={thumbnail} alt="Picture of the author" layout="fill" objectFit="cover" />
        </div>
        <article className="space-y-2 p-2 lg:grid lg:items-baseline lg:space-y-3">
          <dl>
            <dd className="text-sm font-normal leading-6 text-gray-600 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
              {' ✨'}
              <ViewCounter className="mx-1" slug={slug} />
              views
            </dd>
          </dl>
          <div className="space-y-1">
            <div>
              <h2 className="font-cambria text-2xl font-medium leading-8 tracking-tight text-gray-900 transition duration-200 ease-in-out hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400">
                <Link href={`/posts/${slug}`} className="">
                  {title}
                </Link>
              </h2>
            </div>

            <div className="flex flex-wrap">
              {tags.map((tag) => (
                <Tag key={tag} page="posts" text={tag} />
              ))}
            </div>
            <div className="prose pt-5 text-justify font-cambria text-lg text-gray-600 dark:text-gray-400">
              {summary}
            </div>
          </div>
        </article>
      </li>
    </Link>
  )
}

export default PostPreview
