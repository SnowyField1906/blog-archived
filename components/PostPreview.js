import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'
import formatDate from '@/lib/utils/formatDate'
import ViewCounter from '@/components/ViewCounter'
import Tag from '@/components/Tag'

const PostPreview = ({ slug, date, title, summary, tags }) => {
    return (
        <Link
            href={`/blog/${slug}`}
            key={slug}
            className="group flex bg-transparent bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
        >
            <li key={slug} className="py-6">
                <article className="space-y-2 bg-transparent bg-opacity-20 p-2 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-3">
                    <dl>
                        <dd className="text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date)}</time>
                            {' ✨'}
                            <ViewCounter className="mx-1" slug={slug} />
                            views
                        </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-4">
                        <div className="space-y-1">
                            <div>
                                <h2 className="text-2xl font-bold leading-8 tracking-tight font-lora text-gray-900 transition duration-200 ease-in-out hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400">
                                    <Link
                                        href={`/blog/${slug}`}
                                        className=""
                                    >
                                        {title}
                                    </Link>
                                </h2>
                            </div>
                            <div className="flex flex-wrap">
                                {tags.map((tag) => (
                                    <Tag key={tag} text={tag} />
                                ))}
                            </div>
                            <div className="prose max-w-none pt-5 text-gray-500 dark:text-gray-400  font-lora">
                                {summary}
                            </div>
                        </div>
                    </div>
                </article>
            </li>
        </Link>
    )
}

export default PostPreview
