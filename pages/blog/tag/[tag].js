import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import { fil } from 'date-fns/locale'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('blog')

  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag: tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const posts = await getAllFilesFrontMatter('blog')
  const tags = await getAllTags('blog')

  const filteredPosts = posts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `blog/tag/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'blog', 'tag', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: params.tag, tags: tags } }
}

export default function Tag({ posts, tag, tags }) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return (
    <>
      <TagSEO
        title={`${title} - ${siteMetadata.author}`}
        description={`${tag} tag - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} tags={tags} />
    </>
  )
}
