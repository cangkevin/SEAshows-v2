import Image from 'next/image'
import Link from 'next/link'

type ShowListingProps = {
  id: number
  name: string
  thumbnailUrl: string
}

const ShowListing = ({ id, name, thumbnailUrl }: ShowListingProps) => {
  return (
    <div key={id} className='flex flex-col'>
      <Link className='relative h-24 border-4' href={`/episodes/${id}`}>
        <Image src={thumbnailUrl} alt='' fill />
      </Link>
      <div className='text-center text-xl'>
        <Link href={`/episodes/${id}`} className='hover:text-blue-700'>
          {name}
        </Link>
      </div>
    </div>
  )
}

export default ShowListing
