import clsx from 'clsx'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination'
import { type ResourcePaginationLink } from '~/utils/types'

type PaginationProps = {
  currentPage: number
  resourceUri: string
  nextPage?: ResourcePaginationLink
}

const ResourcePagination = ({
  currentPage,
  resourceUri,
  nextPage,
}: PaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className={clsx(currentPage == 1 && 'invisible')}>
          <PaginationPrevious
            href={
              currentPage > 1 ? `${resourceUri}?page=${currentPage - 1}` : '#'
            }
          />
        </PaginationItem>

        {currentPage > 1 ? (
          <PaginationItem>
            <PaginationLink href={`${resourceUri}?page=${currentPage - 1}`}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationLink isActive href={`${resourceUri}?page=${currentPage}`}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        {nextPage ? (
          <PaginationItem>
            <PaginationLink href={`${resourceUri}?page=${currentPage + 1}`}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        <PaginationItem className={clsx(!nextPage && 'invisible')}>
          <PaginationNext
            href={nextPage ? `${resourceUri}?page=${currentPage + 1}` : '#'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ResourcePagination
