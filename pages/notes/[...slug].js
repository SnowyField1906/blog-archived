import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

export async function getStaticPaths() {
  const notes = getFiles('notes')
  return {
    paths: notes.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const allNotes = await getAllFilesFrontMatter('notes')
  const notes = await getFileBySlug('notes', params.slug.join('/'))
  const authorDetails = await getFileBySlug('authors', ['default']).then(
    (author) => author.frontMatter
  )

  return { props: { notes, authorDetails } }
}

export default function Note({ notes, authorDetails }) {
  const { mdxSource, toc, frontMatter } = notes

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={'NoteView'}
          toc={toc}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </PageTitle>
        </div>
      )}
    </>
  )
}
