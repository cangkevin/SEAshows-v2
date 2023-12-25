import Link from 'next/link'

import { type PaginationLink } from '~/utils/types'

type PaginationProps = {
  currentPage: number
  resourceUri: string
  nextPage?: PaginationLink
}

const Pagination = ({
  currentPage,
  resourceUri,
  nextPage,
}: PaginationProps) => {
  return (
    <nav>
      <ul className='flex justify-center py-4'>
        {currentPage > 1 && (
          <li>
            <Link
              className='ml-0 rounded-l-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
              href={`${resourceUri}?page=${currentPage - 1}`}
            >
              Page {currentPage - 1}
            </Link>
          </li>
        )}
        <li>
          <Link
            className='ml-0 border bg-white px-3 py-2 leading-tight hover:text-blue-700'
            href={`${resourceUri}?page=${currentPage}`}
          >
            Page {currentPage}
          </Link>
        </li>
        {nextPage ? (
          <li>
            <Link
              className='ml-0 rounded-r-lg border bg-white px-3 py-2 leading-tight hover:text-blue-700'
              href={`${resourceUri}?page=${currentPage + 1}`}
            >
              Page {currentPage + 1}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default Pagination
