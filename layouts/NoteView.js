import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { PostSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { HiOutlinePencil, HiOutlineClock } from 'react-icons/hi'
import { BsCalendarDate } from 'react-icons/bs'
import TableOfContents from '@/components/TableOfContents'

export default function NoteView({ frontMatter, toc, children }) {
  const { slug, date, title, readingTime } = frontMatter

  return (
    <SectionContainer>
      <PostSEO url={`${siteMetadata.siteUrl}/posts/${slug}`} {...frontMatter} />
      <ScrollTopAndComment />
      <article>
        <div className="mx-auto max-w-5xl xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header>
            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
              <dl>
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
                    <time dateTime={date}>
                      <BsCalendarDate className="mr-1 -mt-1 inline h-4 w-4" /> {formatDate(date)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <div className="flex justify-center gap-5 py-4">
                <span className="flex items-center gap-1.5">
                  <HiOutlinePencil className="h-5 w-5" />
                  {readingTime.words} words
                </span>
                <span className="flex items-center gap-1.5">
                  <HiOutlineClock className="h-5 w-5" />
                  {readingTime.text}
                </span>
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-10 pb-8 font-cambria dark:prose-dark">
                {children}
              </div>
              <Comments frontMatter={frontMatter} />
            </div>
            {toc.length > 1 && <TableOfContents className="min-h-full" toc={toc} />}
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
