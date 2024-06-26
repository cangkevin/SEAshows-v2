// NOTE https://github.com/shadcn-ui/ui/issues/697#issuecomment-1605883170
import { type VariantProps, cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import React from 'react'

import { cn } from '~/lib/utils'

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'size-4',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size }, ref) => {
    return (
      <div role='status' title='Loading' className={className}>
        <Loader2 ref={ref} className={cn(spinnerVariants({ size }))} />
      </div>
    )
  },
)
Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }
