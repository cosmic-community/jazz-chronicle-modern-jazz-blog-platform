'use client'

import { useState } from 'react'
import { CategoryFilterProps } from '@/types'

export default function CategoryFilter({ categories, className = '' }: CategoryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug)
    // In a real implementation, you might want to update the URL or filter posts
    // For now, this is just a visual component
  }

  return (
    <div className={`mb-12 ${className}`}>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => handleCategoryChange('all')}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.slug)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category.slug
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedCategory === category.slug ? category.metadata.color : undefined,
            }}
          >
            {category.metadata.name}
          </button>
        ))}
      </div>
    </div>
  )
}