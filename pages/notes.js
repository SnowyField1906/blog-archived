import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import NotesLayout from '@/layouts/NotesLayout'
import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'

export const NOTES_PER_PAGE = 5

export async function getStaticProps() {
  const notes = await getAllFilesFrontMatter('notes')
  const initialDisplayNotes = notes.slice(0, NOTES_PER_PAGE)
  const pagination = {
    currentNote: 1,
    totalNotes: Math.ceil(notes.length / NOTES_PER_PAGE),
  }

  const [tags] = await getAllTags('notes')

  return { props: { initialDisplayNotes, notes, pagination, tags } }
}

export default function Notes({ notes, initialDisplayNotes, pagination, tags }) {
  return (
    <>
      <PageSEO
        title={`Notes - ${siteMetadata.author}`}
        description="Notes and reuseable collected by SnowyField"
      />
      <NotesLayout
        notes={notes}
        initialDisplayNotes={initialDisplayNotes}
        pagination={pagination}
        title="All Notes"
        tags={tags}
      />
    </>
  )
}
