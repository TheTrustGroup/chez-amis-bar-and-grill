'use client'

export function ImagePlaceholder({ type = 'dish' }: { type?: 'dish' | 'video' | 'restaurant' }) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
  )
}

