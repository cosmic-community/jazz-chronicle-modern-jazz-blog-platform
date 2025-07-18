import { getCategories } from '@/lib/cosmic'
import Link from 'next/link'
import { Category } from '@/types'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
            <p className="text-xl text-gray-600">
              Explore our jazz content by category
            </p>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No categories found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category: Category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group block"
                >
                  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.metadata.name}
                      </h2>
                      {category.metadata.color && (
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: category.metadata.color }}
                        />
                      )}
                    </div>
                    
                    {category.metadata.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.metadata.description}
                      </p>
                    )}
                    
                    <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                      <span className="text-sm font-medium">View posts</span>
                      <svg 
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}