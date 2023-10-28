import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import PostsLayout from '@/layouts/PostsLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import { getAllTags } from '@/lib/tags'
import fs from 'fs'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const [, formattedTag] = await getAllTags('posts')

  return {
    paths: formattedTag.map((tag) => ({
      params: {
        tag: tag,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const posts = await getAllFilesFrontMatter('posts')
  const [tags, formattedTags] = await getAllTags('posts')
  const tag = Object.keys(tags)[formattedTags.indexOf(params.tag)]

  const filteredPosts = posts.filter((post) => post.draft !== true && post.tags.includes(tag))

  // rss
  if (filteredPosts.length > 0) {
    const rss = generateRss(filteredPosts, `posts/tag/${params.tag}/feed.xml`)
    const rssPath = path.join(root, 'public', 'posts', 'tag', params.tag)
    fs.mkdirSync(rssPath, { recursive: true })
    fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  }

  return { props: { posts: filteredPosts, tag: tag, tags: tags } }
}

export default function Tag({ posts, tag, tags }) {
  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tag - ${siteMetadata.description.posts}`}
      />
      <PostsLayout posts={posts} title={tag} tags={tags} />
    </>
  )
}
