import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import NotesLayout from '@/layouts/NotesLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const [, formattedTags] = await getAllTags('notes')

  return {
    paths: formattedTags.map((tag) => ({
      params: {
        tag: tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const notes = await getAllFilesFrontMatter('notes')
  const [tags, formattedTags] = await getAllTags('notes')
  const tag = Object.keys(tags)[formattedTags.indexOf(params.tag)]

  const filteredNotes = notes.filter((note) => note.draft !== true && note.tags.includes(tag))

  // rss
  if (filteredNotes.length > 0) {
    const rss = generateRss(filteredNotes, `notes/tag/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'notes', 'tag', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { notes: filteredNotes, tag: tag, tags: tags } }
}

export default function Tag({ notes, tag, tags }) {
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tag - ${siteMetadata.description.notes}`}
      />
      <NotesLayout notes={notes} title={tag} tags={tags} />
    </>
  )
}
