import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Menu Item Skeleton
export function MenuItemSkeleton() {
  return (
    <div className="group relative py-8 border-b border-gray-200">
      <div className="flex gap-6 items-start">
        {/* Image Skeleton */}
        <Skeleton className="w-32 h-32 flex-shrink-0 rounded-lg" />
        
        {/* Content Skeleton */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  )
}

// Beverage Card Skeleton
export function BeverageCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-3/4 mb-4" />
      <Skeleton className="h-32 w-full mb-4 rounded" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

