import { Skeleton } from './ui/skeleton'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ShowListingProps = {
  id: number
  name: string
  thumbnailUrl: string
}

const ShowListing = ({ id, name, thumbnailUrl }: ShowListingProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <div className='flex flex-col'>
      <Link className='relative h-24 rounded-lg' href={`/watch/${id}`}>
        {loading && <Skeleton className='relative h-24 rounded-lg'></Skeleton>}
        <Image
          className='rounded-lg border'
          src={thumbnailUrl}
          alt={name}
          fill
          onLoad={() => setLoading(false)}
        />
      </Link>
      <div className='line-clamp-2 text-center md:text-lg'>
        <Link title={name} href={`/watch/${id}`}>
          {name}
        </Link>
      </div>
    </div>
  )
}

export default ShowListing
