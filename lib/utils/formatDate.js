import siteMetadata from '@/data/siteMetadata'
import { format } from 'timeago.js'

const formatDate = (date, ago = false) => {
  let now

  if (ago) {
    now = format(date, siteMetadata.locale)
  } else {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    now = new Date(date).toLocaleDateString(siteMetadata.locale, options)
  }

  return now
}

export default formatDate
