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
  const baseStyles =
    'ml-0 border bg-white px-3 py-2 leading-tight hover:text-blue-700'

  return (
    <nav>
      <ul className='flex justify-center py-4'>
        {currentPage > 1 ? (
          <li>
            <Link
              className={`${baseStyles} rounded-l-lg`}
              href={`${resourceUri}?page=${currentPage - 1}`}
            >
              Page {currentPage - 1}
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            className={`${baseStyles} ${
              currentPage == 1 ? 'rounded-l-lg' : ''
            } ${nextPage ? '' : 'rounded-r-lg'}`}
            href={`${resourceUri}?page=${currentPage}`}
          >
            Page {currentPage}
          </Link>
        </li>
        {nextPage ? (
          <li>
            <Link
              className={`${baseStyles} rounded-r-lg`}
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
