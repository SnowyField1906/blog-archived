import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import PostsLayout from '@/layouts/PostsLayout'
import { PageSEO } from '@/components/SEO'
import { getAllTags } from '@/lib/tags'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('posts')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  const [tags] = await getAllTags('posts')

  return { props: { initialDisplayPosts, posts, pagination, tags } }
}

export default function Post({ posts, initialDisplayPosts, pagination, tags }) {
  return (
    <>
      <PageSEO title={`Post - ${siteMetadata.author}`} description={siteMetadata.description} />
      <PostsLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
        tags={tags}
      />
    </>
  )
}
