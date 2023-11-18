import Link from 'next/link'
import formatDate from '@/lib/utils/formatDate'
import ViewCounter from '@/components/ViewCounter'
import Tag from '@/components/Tag'
import Image from 'next/image'

const PostPreview = ({ slug, date, title, summary, tags, thumbnail }) => {
  return (
    <li
      key={slug}
      className="bg-transparent bg-opacity-20 xl:px-4 lg:px-2 py-4"
    >
      <div className="p-2 lg:p-4 grid lg:grid-cols-5 lg:gap-4 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 ">
        <div className="self-center lg:col-span-2 relative hidden w-auto object-cover lg:block xl:h-[15rem] lg:h-[13rem]">
          <Image src={thumbnail} alt="Thumbnail image for the post" layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
        <div className="self-center lg:col-span-3">
          <article className="lg:grid lg:items-baseline space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-1 gap-3 lg:gap-0">
              <div className="min-h-42 md:col-span-2 relative lg:hidden">
                <Image src={thumbnail} alt="Thumbnail image for the post" layout="fill" objectFit="cover" className="rounded-lg" />
              </div>
              <div className="self-center col-span-2 md:col-span-3 lg:col-span-2 space-y-2">
                <dl>
                  <dd className="text-sm font-normal leading-6 text-gray-600 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, true)}</time>
                    {' ✨'}
                    <ViewCounter className="mx-1" slug={slug} />
                    views
                  </dd>
                </dl>
                <h2 className="text-2xl font-semibold text-gray-700 transition duration-200 ease-in-out hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
                  <Link href={`/posts/${slug}`} className="tracking-tighter">
                    {title}
                  </Link>
                </h2>

                <div className="flex overflow-x-auto">
                  {tags.map((tag) => (
                    <div key={tag} className="flex items-center w-min">
                      <Tag key={tag} page="posts" text={tag} />
                    </div>
                  ))}
                </div>
              </div>

              <p className="font-cambria tracking-tight col-span-1 md:col-span-5 lg:col-span-1 pt-2 text-justify text-lg text-gray-600 dark:text-gray-400 w-fit">
                {summary}
              </p>
            </div>
          </article>
        </div>
      </div>
    </li>
  )
}

export default PostPreview
