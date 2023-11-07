import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import PostsLayout from '@/layouts/PostsLayout'
import { POSTS_PER_PAGE } from '../../posts'
import { getAllTags } from '@/lib/tags'

export async function getStaticPaths() {
  const totalPosts = await getAllFilesFrontMatter('posts')
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
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
  const posts = await getAllFilesFrontMatter('posts')
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const [tags] = await getAllTags('posts')

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      pageNumber,
      tags,
    },
  }
}

export default function PostPage({ posts, initialDisplayPosts, pagination, pageNumber, tags }) {
  return (
    <>
      <PageSEO
        title={`Posts page ${pageNumber} - ${siteMetadata.author}`}
        description={siteMetadata.description.posts}
      />
      <PostsLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title={`Page ${pageNumber}`}
        tags={tags}
      />
    </>
  )
}
