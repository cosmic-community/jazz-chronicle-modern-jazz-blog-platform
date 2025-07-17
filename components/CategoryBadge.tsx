import { CategoryBadgeProps } from '@/types'

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  return (
    <span 
      className={`px-3 py-1 rounded-full text-sm font-medium text-white ${className}`}
      style={{ backgroundColor: category.metadata.color }}
    >
      {category.metadata.name}
    </span>
  )
}