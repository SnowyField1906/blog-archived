import prisma from 'lib/prisma'
import Checkin from '@/components/Checkin'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function CheckinPage({ fallbackData }) {
  return (
    <>
      <PageSEO
        title={`Check-in - ${siteMetadata.author}`}
        description={siteMetadata.description.checkin}
      />
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        <div className="space-y-2 pt-6 pb-6 md:space-y-5">
          <p className="text-md leading-7 text-gray-600 dark:text-gray-400">
            {siteMetadata.description.checkin}
          </p>
        </div>
        <Checkin fallbackData={fallbackData} />
      </div>
    </>
  )
}
export async function getStaticProps() {
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
