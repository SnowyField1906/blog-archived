// import Link from '@/components/Link'
import Analytics from 'components/metrics/Analytics'
import GithubPersonal from '@/components/metrics/GithubPersonal'
import GitHub from '@/components/metrics/Github'
import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import TopTracks from '@/components/TopTracks'
import NowPlaying from '@/components/NowPlaying'
import { useState } from 'react'

export default function Stats() {
  const [range, isRange] = useState('short_term')
  const [multiply, isMultiply] = useState(1)

  return (
    <>
      <PageSEO
        title={`Stats - ${siteMetadata.author}`}
        description="Statistics about my blog, Github, Twitter and more"
      />
      <div className="mx-auto max-w-2xl overflow-hidden">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5 ">
          <h1 className="text-3xl text-4xl font-extrabold leading-14 tracking-tight text-gray-900 dark:text-gray-100">
            Stats
          </h1>
          <p className="text-md leading-7 text-gray-600 dark:text-gray-400">
            I use this dashboard to track various metrics across platforms like Spotify, GitHub, and
            more.
          </p>
        </div>
        <div className="pt-2">
          <div className="flex w-full flex-col pb-2">
            <Analytics />
          </div>
          <div className="flex w-full flex-col">
            <GithubPersonal />
            <GitHub />
          </div>
        </div>
        <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
          My <span className="text-green-500">Spotify</span> Top Songs
        </h2>
        <p className="text-md mb-4 text-gray-600 dark:text-gray-400">
          Curious what I'm currently jamming to? Here's my top tracks on Spotify updated daily.
        </p>
        <div>
          <NowPlaying />
        </div>
        <div className="flex flex-row justify-evenly">
          <button
            onClick={() => {
              isRange('short_term')
              isMultiply(1)
            }}
            className={`text-md rounded-full border px-8 py-2 text-center font-normal transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white dark:text-gray-200 ${
              range === 'short_term' ? 'border-green-600 bg-green-600 text-white' : ''
            }`}
          >
            Last 4 Weeks
          </button>
          <button
            onClick={() => {
              isRange('medium_term')
              isMultiply(1)
            }}
            className={`text-md rounded-full border px-8 py-2 text-center font-normal transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white dark:text-gray-200 ${
              range === 'medium_term' ? 'border-green-600 bg-green-600 text-white' : ''
            }`}
          >
            Last 6 Months
          </button>
          <button
            onClick={() => {
              isRange('long_term')
              isMultiply(1)
            }}
            className={`text-md rounded-full border px-8 py-2 text-center font-normal transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white dark:text-gray-200 ${
              range === 'long_term' ? 'border-green-600 bg-green-600 text-white' : ''
            }`}
          >
            All Time
          </button>
        </div>
        <TopTracks range={range} multiply={multiply} />
        {multiply < 5 && (
          <div className="my-4 flex flex-row justify-center">
            <button
              onClick={() => isMultiply(multiply + 1)}
              className="text-md self-center rounded-full border px-8 py-2 text-center font-normal transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white dark:text-gray-200"
            >
              Load more +10 tracks
            </button>
          </div>
        )}
        <div className="flex flex-col pl-4 pt-5">
          <p className="text-md text-gray-600 dark:text-gray-400">
            Do you know a good song I should listen to?
          </p>
          <a
            className="text-md mt-4 rounded-full border px-8 py-2 text-center font-normal text-gray-800 transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white dark:text-gray-200"
            href="https://twitter.com/messages/1130146745088745472-1644439499018219520?&text=Hey%20SnowyField,%20you%20should%20listen%20to:"
            data-screen-name="@SnowyField1906"
            target="_blank"
            rel="noreferrer noopener"
          >
            SnowyField you should listen to...
          </a>
        </div>
      </div>
    </>
  )
}
