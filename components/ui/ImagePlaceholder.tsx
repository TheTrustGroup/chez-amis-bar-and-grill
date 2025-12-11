'use client'

export function ImagePlaceholder({ type = 'dish' }: { type?: 'dish' | 'video' | 'restaurant' }) {
  const icons = {
    dish: '🍽️',
    video: '▶️',
    restaurant: '🏠'
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="text-center p-8">
        <div className="text-6xl mb-4">{icons[type]}</div>
        <div className="text-amber-400 font-serif text-2xl mb-2">Chez Amis</div>
        <div className="text-gray-400 text-sm">Bar and Grill</div>
      </div>
    </div>
  )
}

