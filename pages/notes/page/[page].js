import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import NotesLayout from '@/layouts/NotesLayout'
import { NOTES_PER_PAGE } from '../../notes'
import { getAllTags } from '@/lib/tags'

export async function getStaticPaths() {
  const totalNotes = await getAllFilesFrontMatter('notes')
  const totalPages = Math.ceil(totalNotes.length / NOTES_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context
  const notes = await getAllFilesFrontMatter('notes')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = notes.slice(
    NOTES_PER_PAGE * (pageNumber - 1),
    NOTES_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(notes.length / NOTES_PER_PAGE),
  }

  const [tags] = await getAllTags('notes')

  return {
    props: {
      notes,
      initialDisplayPosts,
      pagination,
      pageNumber,
      tags,
    },
  }
}

export default function NotePage({ notes, initialDisplayPosts, pagination, pageNumber, tags }) {
  return (
    <>
      <PageSEO title={`Notes page ${pageNumber}`} description={siteMetadata.description.notes} />
      <NotesLayout
        notes={notes}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={`Page ${pageNumber}`}
        tags={tags}
      />
    </>
  )
}
