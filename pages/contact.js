import siteMetadata from '@/data/siteMetadata'
import ContactLink from '@/components/ContactLink'
import { PageSEO } from '@/components/SEO'

const Contact = () => {
  return (
    <>
      <PageSEO
        title={`Contact - ${siteMetadata.author}`}
        description={siteMetadata.description.contact}
      />
      <div className="mx-auto max-w-3xl overflow-hidden">
        <div className="pt-10 pb-8">
          <ul className="font-semi-bold flex flex-col space-y-4">
            <ContactLink
              href="mailto:snowyfield1906@gmail.com"
              title="gmail"
              icon="snowyfield1906"
            />
            <ContactLink
              href="https://github.com/SnowyField1906"
              title="github"
              icon="SnowyField1906"
            />
            <ContactLink
              href="https://twitter.com/SnowyField1906"
              title="twitter"
              icon="SnowyField1906"
            />
            <ContactLink href="https://www.linkedin.com/NHThuan/" title="linkedin" icon="NHThuan" />
          </ul>
        </div>
      </div>
    </>
  )
}

export default Contact
