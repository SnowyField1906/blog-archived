import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import MetricCard from 'components/metrics/Card'

export default function GithubCard() {
  const { data } = useSWR('/api/github-stats', fetcher)

  const followers = new Number(data?.followers)
  const following = new Number(data?.following)
  const link = 'https://github.com/SnowyField1906'

  return (
    <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      <MetricCard header="GitHub Following" link={link} metric={following} isCurrency={false} />
      <MetricCard header="Github Followers" link={link} metric={followers} isCurrency={false} />
    </div>
  )
}
