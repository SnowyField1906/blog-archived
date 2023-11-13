import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import { dayjs } from '@/components/DayJS'
import { useEffect, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { getCurrentlyReading } from '@/lib/goodreads'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import { FaCloudShowersHeavy } from 'react-icons/fa'
import {
  BsCloudDrizzleFill,
  BsCloudsFill,
  BsCloudLightningFill,
  BsCloudSnowFill,
  BsCloudFogFill,
  BsMoonFill,
  BsClock,
  BsSunFill,
  BsFillCloudSunFill,
  BsFillCloudMoonFill,
  BsFillCloudFill,
} from 'react-icons/bs'

export const getServerSideProps = async () => {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?lat=10.775659&lon=106.700424&appid=1b3c10c18e894eaf1fd63eedde53fa54&units=metric'
  )
  const data = await response.json()

  const currentlyReading = await getCurrentlyReading({ limit: 1 })

  return {
    props: { currentlyReading, data },
  }
}

export default function Now(currentlyReading) {
  const { data } = useSWR('/api/now-playing', fetcher)
  let weatherData = currentlyReading['data']
  const { temp: temperature } = weatherData.main
  const { icon: weatherIcon, description: weatherDescription } = weatherData.weather[0]

  const icons = {
    _01d: <BsSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _01n: <BsMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02d: <BsFillCloudSunFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _02n: <BsFillCloudMoonFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03d: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _03n: <BsFillCloudFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04d: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _04n: <BsCloudsFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09d: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _09n: <BsCloudDrizzleFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10d: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _10n: <FaCloudShowersHeavy className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11d: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _11n: <BsCloudLightningFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13d: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _13n: <BsCloudSnowFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50d: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
    _50n: <BsCloudFogFill className="mb-0.5 inline h-3 w-3 hover:animate-spin" />,
  }

  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var date = new Date().getDate()
  var hour = new Date().getHours()
  var minute = new Date().getMinutes()
  var second = new Date().getSeconds()
  const now = () => dayjs().tz()
  const format = 'hhA'
  const [TodayDate, setDate] = useState(now())

  useEffect(() => {
    const timer = setInterval(() => setDate(now()), 1000)
    return () => clearInterval(timer)
  }, [])

  var SnowyFieldBirthDate = '2003-12-18'
  var birthDate = new Date(SnowyFieldBirthDate)

  var SnowyFieldAge = year - birthDate.getFullYear()

  var SnowyFieldMonth = 0
  if (month >= birthDate.getMonth()) SnowyFieldMonth = month - birthDate.getMonth()
  else {
    SnowyFieldAge--
    SnowyFieldMonth = 12 + month - birthDate.getMonth()
  }

  var SnowyFieldDay = 0
  if (date >= birthDate.getDate()) SnowyFieldDay = date - birthDate.getDate()
  else {
    SnowyFieldMonth--
    SnowyFieldDay = 31 + date - birthDate.getDate()
    if (SnowyFieldMonth < 0) {
      SnowyFieldMonth = 11
      SnowyFieldAge--
    }
  }

  var age = {}
  age = {
    years: SnowyFieldAge,
    months: SnowyFieldMonth,
    days: SnowyFieldDay,
  }

  var ageString = ''
  if (age.years > 0 && age.months > 0 && age.days > 0)
    ageString = age.years + ' years, ' + age.months + ' months, and ' + age.days + ' days old'
  else if (age.years == 0 && age.months == 0 && age.days > 0)
    ageString = 'Only ' + age.days + ' days old'
  else if (age.years > 0 && age.months == 0 && age.days == 0)
    ageString = age.years + ' years old. Happy Birthday!!'
  else if (age.years > 0 && age.months > 0 && age.days == 0)
    ageString = age.years + ' years and ' + age.months + ' months old'
  else if (age.years == 0 && age.months > 0 && age.days > 0)
    ageString = age.months + ' months and ' + age.days + ' days old'
  else if (age.years > 0 && age.months == 0 && age.days > 0)
    ageString = age.years + ' years, and' + age.days + ' days old'
  else if (age.years == 0 && age.months > 0 && age.days == 0) ageString = age.months + ' months old'
  else ageString = "Welcome to Earth! <br> It's first day on Earth!"

  return (
    <>
      <PageSEO
        title={`Now - ${siteMetadata.author}`}
        description={siteMetadata.description.now}
        url={siteMetadata.url}
      />
      <div>
        <div className="mt-16 mb-5">
          <h3>{siteMetadata.description.now}</h3>
          <div className=" mt-4 mb-6 text-xs text-neutral-700 dark:text-neutral-400">
            This page was automatically updated @ {date}-{month}-{year} {hour}:{minute}:{second}
          </div>
        </div>
        {/* Misc */}
        <div>
          <div className="flex justify-between gap-5 ">
            <div className="mt-2 mb-10 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Location:</span>{' '}
              <span>District 1, Ho Chi Minh City</span>
              <br />
              <span className="ml-2 font-semibold">Weather:</span>{' '}
              <span>
                {icons[`_${weatherIcon}`]}{' '}
                <a
                  href="https://weather.com/en-GB/weather/today/l/f9e2c272160f48be1b08c33e76a295947d53ec250868eaf4bb401afea124fbfc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-1 hover:underline"
                >
                  Currently <b>{parseInt(temperature)}°C</b>
                  {' with '}
                  <span>{weatherDescription}</span>
                </a>
              </span>
            </div>
            <div className="mt-2 mb-10 w-1/2 rounded-md border border-gray-600 p-1 text-sm dark:border-gray-200">
              <span className="ml-2 font-semibold">Age:</span> <span>{ageString}</span>
              <br />
              <span className="ml-2 font-semibold">Listening:</span>{' '}
              <span>
                {data?.songUrl ? (
                  <a
                    href={data.songUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-1 hover:underline"
                  >
                    <span>{data.title}</span>
                  </a>
                ) : (
                  <span>Not Playing</span>
                )}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 justify-center text-center text-2xl font-medium text-gray-600 dark:text-gray-400">
          &#126;&#126; Present &#126;&#126;
        </div>
        <div className="py-4">
          <p>
            I have been trying to shift my field from Blockchain to Machine Learning as a backup
            plan. I'm following a lot of cool repositories on Github but I still don't have time to
            try them out.
          </p>
          <br />
          <p>
            I'm currently pursuing my favorite major at my dream university, but I've been enduring
            a lot of pain and frustration with it due to various reasons. I wish to leave it as soon
            as possible and my goal is to apply to a remote university abroad in the near future.
          </p>
          <br />
          <p>
            I want to dedicate as much time as possible to learning English, but after a while, I
            still find myself tangled up with many aspects and having to postpone it.
          </p>
        </div>
        <div className="mt-10 justify-center text-center text-2xl font-medium text-gray-600 dark:text-gray-400">
          &#126;&#126; Preferences &#126;&#126;
        </div>
        <div className="py-4">
          <p>
            I have a deep passion for knowledge and research, particularly in Mathematics, Science,
            and Spirituality also. I'm drawn to abstract and enigmatic concepts that challenge
            understanding. My choices consistently lean towards the atypical and out of the
            ordinary. Sometimes I hate this.
          </p>
          <br />
          <p>
            My preferred destinations are Japan, Taiwan, and especially Nordic countries. But there
            is no place I love more than Vietnam, my born-and-raised home.
          </p>
          <br />
          <p>
            I have a fondness for purple, all shades of purple. That's why this website has a
            predominant purple color scheme. Additionally, I also like blue, white, and black.
          </p>
          <br />
        </div>
        <div className="mt-10 justify-center text-center text-2xl font-medium text-gray-600 dark:text-gray-400">
          &#126;&#126; Music &#126;&#126;
        </div>
        <div className="py-4">
          <p>
            I have a special affection for Rap, Hip-hop, and R&B music. However, I exclusively
            listen to Vietnamese songs because my ears are not accustomed to foreign languages, and
            I enjoy getting immersed in the lyrics of a song passively rather than the melody.
          </p>
          <br />
          <p>
            My favourite rapper is <Link href={'https://www.youtube.com/@EvBRecords'}>B Ray</Link>,
            he has a profound personal significance to me. His music has accompanied me through
            various stages of my life, and his lyrics resonate deeply with my experiences.
          </p>
          <br />
          <p>
            Lately, I've been looping{' '}
            <Link href={'https://www.youtube.com/@HustlangRecord'}>Hustlang Robber</Link> songs
            quite a bit. However, if I could recommend some rappers to you, they would be{' '}
            <Link href={'https://www.youtube.com/@hoanglongmck'}>MCK</Link>,{' '}
            <Link href={'https://www.youtube.com/@wxrdie'}>Wxrdie</Link>, and{' '}
            <Link href={'https://www.youtube.com/@BinzDaPoet'}>Binz</Link>.
          </p>
          <br />
          <p>
            I'm a Spotify addict, you can check out my Spotify stats{' '}
            <Link href={'https://snowyfield.software/stats'}>here</Link>. By the way, this is the{' '}
            <Link
              href={'https://open.spotify.com/playlist/0J9wMOS5qXCWnTCk5hPgIY?si=9b36b1607c1e42f2'}
            >
              Spotify playlist
            </Link>{' '}
            including all of my treasured songs.
          </p>
        </div>
        <div className="mt-10 justify-center text-center text-2xl font-medium text-gray-600 dark:text-gray-400">
          &#126;&#126; Movie &#126;&#126;
        </div>
        <div className="py-4">
          <p>I have a special love on Anime, but I don't have much time to watch.</p>
          <br />
          <p>
            My go-to genres are Supernatural, Drama, and Romance. An Anime movie blending all three
            is a magnum opus to me. A romantic love, gripping with drama's touch, and spiced up with
            supernatural plot twists. Absolutely astounding, isn't it?
          </p>
          <br />
          <p>
            Besides Anime, I also enjoy indulging in J-dramas, Documentaries, and Science films.
            However, I specifically prefer movies over series due to my lack of patience.
          </p>
        </div>
        <div className="mt-10 justify-center text-center text-2xl font-medium text-gray-600 dark:text-gray-400">
          &#126;&#126; Personality &#126;&#126;
        </div>
        <div className="py-4">
          <p>
            While I'm not strictly a Jungian, I find that delving into it occasionally helps unearth
            some of my traits that I have never realized. Describing myself is challenging, so I
            borrow those ides to do aid in self-expression.
          </p>
          <br />
          <p>
            It's fortunate that mine is exactly INFJ type. Nevertheless, it's prone to lead me
            entering the negative{' '}
            <Link href={'https://introvertedgrowth.com/ni-ti-loop/'}>Ni-Ti Loop</Link>, which makes
            me incredibly draining.
          </p>
          <br />
          <p>Here's a bit more about me:</p>
          <br />
          <ul className="list-inside list-disc">
            <li>
              MBTI (Jung theory) &nbsp;—&nbsp; Code:{' '}
              <Link href={'https://personalityjunkie.com/the-infj/'}>INFJ</Link> &nbsp;
              <i>
                (Dominant: Ni &nbsp;•&nbsp; Auxiliary: Fe &nbsp;•&nbsp; Tertiary: Ti &nbsp;•&nbsp;
                Inferior: Se)
              </i>
            </li>
            <li>
              Enneagram &nbsp;—&nbsp; Code:{' '}
              <Link
                href={
                  'https://enneagramuniverse.com/enneagram/learn/enneagram-types/enneagram-type-4-the-individualist/'
                }
              >
                4
              </Link>{' '}
              &nbsp;<i>(Triad: Heart)</i> &nbsp;•&nbsp; Wing:{' '}
              <Link
                href={
                  'https://enneagramuniverse.com/enneagram/learn/enneagram-wings/enneagram_4w5/'
                }
              >
                5
              </Link>{' '}
              &nbsp;•&nbsp; Instinctual Variant:{' '}
              <Link href={'https://introvertedgrowth.com/so-sp-2/'}>SO/SP</Link> &nbsp;•&nbsp;
              Tritype:{' '}
              <Link
                href={
                  'https://personalityprofilinghell.tumblr.com/post/134436263161/my-tritype-is-4-6-1-what-does-that-actually'
                }
              >
                461
              </Link>
            </li>
            <li>
              Socionics &nbsp;—&nbsp; Code:{' '}
              <Link href={'https://classicsocionics.wordpress.com/augusta-eii/'}>EII</Link> &nbsp;
              <i>
                (Ego Blocks: Fi-Ne &nbsp;•&nbsp; Super-Ego Blocks: Ti-Se &nbsp;•&nbsp; Super-Id
                Blocks: Te-Si &nbsp;•&nbsp; Id Blocks: Fe-Ni)
              </i>
            </li>
            <li>
              Global 5 (SLOAN) &nbsp;—&nbsp; Code:{' '}
              <Link href={'https://similarminds.com/global5/rloai.html'}>RLOAI</Link>
            </li>
            <li>
              Attitudinal Psyche: &nbsp;—&nbsp; Code:{' '}
              <Link href={'https://www.attitudinalpsyche.com/personality-profiles/exi/levf/'}>
                LEVF
              </Link>{' '}
              &nbsp;
              <i>
                (Attitude: 4F &nbsp;•&nbsp; Positive Disposition: Fo+ &nbsp;•&nbsp; Negative
                Disposition: Fs-)
              </i>
            </li>
            <li>
              Four Temperaments: &nbsp;—&nbsp; Code:{' '}
              <Link
                href={
                  'https://plus.catholicmatch.com/temperaments/melancholic/melancholic-phlegmatic'
                }
              >
                Melancholy-Phlegmatic
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
