import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import NotesLayout from '@/layouts/NotesLayout'
import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const notes = await getAllFilesFrontMatter('notes')
  const initialDisplayPosts = notes.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(notes.length / POSTS_PER_PAGE),
  }

  const tags = await getAllTags('notes')

  return { props: { initialDisplayPosts, notes, pagination, tags } }
}

export default function Notes({ notes, initialDisplayPosts, pagination, tags }) {
  return (
    <>
      <PageSEO
        title={`Notes - ${siteMetadata.author}`}
        description="Reuseable code notes collected by SnowyField"
      />
      <NotesLayout
        notes={notes}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Notes"
        tags={tags}
      />
    </>
  )
}
