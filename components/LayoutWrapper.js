import { useSession, signIn, signOut } from 'next-auth/react'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import { navigation } from '@/data/nav'
import CommandPalette from './CommandPalette'
import ThemeSwitch from './ThemeSwitch'
import Typewriter from 'typewriter-effect'
import { useRouter } from 'next/router'
import { EnterIcon } from '@radix-ui/react-icons'
import DropMenu from './DropMenu.js'
// import Logo from '@/data/logo.svg'
// import MobileNav from './MobileNav'

const LayoutWrapper = ({ children }) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              {/* <div className="flex items-center justify-between">
                <div className="mr-1">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div> */}
              <div className="text-primary-color dark:text-primary-color-dark flex items-center justify-between text-xl font-semibold">
                {`~${router.asPath}`}{' '}
                <Typewriter
                  options={{
                    strings: [],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 text-base leading-5">
            <div className="hidden 2xl:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="link-underline rounded py-1 px-2 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3"
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <CommandPalette navigation={navigation} />
            <ThemeSwitch />
            <DropMenu />

            <div className="link-underline ml-2 cursor-pointer rounded py-1 px-2">
              <Link>
                <div className="mx-2 flex flex-row">
                  {session ? (
                    <>
                      <div className="mr-2 flex flex-row items-center">
                        {session.user?.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            className="h-6 w-6 cursor-pointer rounded-full"
                            src={session.user.image}
                            alt="User Profile Icon"
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="" onClick={() => signOut()}>
                        Sign Out
                      </div>
                    </>
                  ) : (
                    <>
                      <EnterIcon />
                      <div className="ml-4" onClick={() => signIn()}>
                        Sign In
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </div>

            {/* <MobileNav /> */}
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
