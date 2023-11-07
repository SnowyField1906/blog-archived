import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import Timeline from '@/components/Timeline'
import { motion } from 'framer-motion'

export default function Journey() {
  return (
    <>
      <PageSEO
        title={`Journey - ${siteMetadata.author}`}
        description={siteMetadata.description.journey}
      />
      <div className="mx-auto max-w-2xl">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <p className="text-md leading-7 text-gray-600 dark:text-gray-400">
            {siteMetadata.description.journey}
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3, duration: 0.9 }}
          variants={{
            hidden: {
              opacity: 0.5,
              y: 10,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
        >
          <Timeline />
        </motion.div>
      </div>
    </>
  )
}
