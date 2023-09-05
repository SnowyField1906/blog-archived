import prisma from 'lib/prisma'
import Checkin from '@/components/Checkin'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function CheckinPage({ fallbackData }) {
  return (
    <>
      <PageSEO
        title={`Check-in - ${siteMetadata.author}`}
        description="Checkin for my future visitors"
      />
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        {/* <h1 className="mb-4 text-3xl font-bold 
      tracking-tight text-black dark:text-white md:text-5xl">
        Checkin
      </h1>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Leave a comment below. It could be anything – appreciation, information, wisdom, or even
        humor. Surprise me!
      </p> */}
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <p className="text-md leading-7 text-gray-600 dark:text-gray-400">
            An artifact of the 90's webs. Leave a comment below for my future visitors. Feel free to
            write anything!
          </p>
        </div>
        <Checkin fallbackData={fallbackData} />
      </div>
    </>
  )
}
export async function getStaticProps() {
  let a = await prisma.checkin

  console.log('a', a)

  const entries = await prisma.checkin.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }))

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  }
}
