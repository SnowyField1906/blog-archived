import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import NotesLayout from '@/layouts/NotesLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('notes')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Notes({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO
        title={`Notes - ${siteMetadata.author}`}
        description="Reuseable code notes collected by SnowyField"
      />
      <NotesLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Notes"
      />
    </>
  )
}
