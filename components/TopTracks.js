import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Track from '@/components/Track'

export default function TopTracks({ range, multiply }) {
  const { data } = useSWR(`/api/top-tracks?limit=50&range=${range}`, fetcher)

  if (!data) {
    return null
  }

  return data.tracks
    .slice(0, 10 * multiply)
    .map((track, index) => <Track ranking={index + 1} key={track.songUrl} {...track} />)
}
