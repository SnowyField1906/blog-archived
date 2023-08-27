import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import PostPreview from '@/components/PostPreview'
import kebabCase from '@/lib/utils/kebabCase'

export default function PostsLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tags = {},
}) {
  const [searchValue, setSearchValue] = useState('')
  const filteredPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredPosts

  return (
    <>
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <p className="text-md leading-7 text-gray-600 dark:text-gray-400">
            I post about my knowledge and experience here, I hope you find something useful.
          </p>
          <div className="flex flex-wrap">
            {Object.keys(tags).length === 0 && 'No tags found.'}
            {sortedTags.map((t) => (
              <div key={t}>
                <Tag page="posts" text={t} num={tags[t]} isCurrent={t === title} />
                <Link
                  href={`posts/tag/${kebabCase(t)}`}
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300"
                ></Link>
              </div>
            ))}
          </div>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredPosts.length && 'No posts found.'}
          {displayPosts.map((frontMatter) => PostPreview(frontMatter))}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
