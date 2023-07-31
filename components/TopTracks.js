import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Track from '@/components/Track'

export default function TopTracks({ range, multiply }) {
  console.log('TopTracks multiply ', multiply)
  const { data } = useSWR(`/api/top-tracks?range=${range}&limit=${10 * multiply}`, fetcher)

  if (!data) {
    return null
  }

  return data.tracks.map((track, index) => (
    <Track ranking={index + 1} key={track.songUrl} {...track} />
  ))
}
