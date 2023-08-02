import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import PostsLayout from '@/layouts/PostsLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const tags = await getAllTags('posts')

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
  const posts = await getAllFilesFrontMatter('posts')
  const tags = await getAllTags('posts')

  const filteredPosts = posts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `posts/tag/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'posts', 'tag', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: params.tag, tags: tags } }
}

export default function Tag({ posts, tag, tags }) {
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

  return (
    <>
      <TagSEO
        title={`${title} - ${siteMetadata.author}`}
        description={`${tag} tag - ${siteMetadata.author}`}
      />
      <PostsLayout posts={posts} title={title} tags={tags} />
    </>
  )
}
