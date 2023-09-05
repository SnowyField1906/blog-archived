import GA from './GoogleAnalytics'
import Umami from './Umami'
import siteMetadata from '@/data/siteMetadata'
import VA from '@vercel/analytics/react'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return (
    <>
      {isProduction && siteMetadata.analytics.umamiWebsiteId && <Umami />}
      {isProduction && siteMetadata.analytics.googleAnalyticsId && <GA />}
      {isProduction && <VA.Analytics />}
    </>
  )
}

export default Analytics
