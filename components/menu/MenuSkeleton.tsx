import { Card, CardContent, CardFooter } from "@/components/ui/card"

export function MenuSkeleton() {
  return (
    <Card className="flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-muted"></div>

      {/* Content Skeleton */}
      <CardContent className="flex-1 p-4 md:p-6">
        <div className="h-6 bg-muted rounded mb-2"></div>
        <div className="h-4 bg-muted rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-muted rounded mb-4 w-full"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-5 w-20 bg-muted rounded"></div>
        </div>
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="flex items-center justify-between p-4 md:p-6 pt-0 border-t">
        <div className="h-8 w-20 bg-muted rounded"></div>
        <div className="h-9 w-24 bg-muted rounded"></div>
      </CardFooter>
    </Card>
  )
}



