import Image from 'next/image'
import Link from 'next/link'

type ShowListingProps = {
  id: number
  name: string
  thumbnailUrl: string
}

const ShowListing = ({ id, name, thumbnailUrl }: ShowListingProps) => {
  return (
    <div className='flex flex-col'>
      <Link className='relative h-24 rounded-lg border-2' href={`/watch/${id}`}>
        <Image src={thumbnailUrl} alt={name} fill />
      </Link>
      <div className='line-clamp-2 text-center md:text-lg'>
        <Link
          title={name}
          href={`/watch/${id}`}
          className='hover:text-blue-700'
        >
          {name}
        </Link>
      </div>
    </div>
  )
}

export default ShowListing
