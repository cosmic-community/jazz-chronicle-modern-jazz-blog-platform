import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category, User } from '@/types'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
  apiEnvironment: "staging"
})

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'posts',
      slug: slug,
    }).depth(1)
    
    return response.object as Post
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
      'metadata.category.slug': categorySlug,
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'authors',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Author[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'authors',
      slug: slug,
    }).depth(1)
    
    return response.object as Author
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPostsByAuthor(authorSlug: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
      'metadata.author.slug': authorSlug,
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'categories',
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Category[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'categories',
      slug: slug,
    }).depth(1)
    
    return response.object as Category
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
      'metadata.tags': { $regex: tag, $options: 'i' },
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects.find({
      type: 'posts',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { 'metadata.content': { $regex: query, $options: 'i' } },
        { 'metadata.excerpt': { $regex: query, $options: 'i' } },
      ],
    }).props(['id', 'title', 'slug', 'metadata']).depth(1)
    
    return response.objects as Post[]
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return []
    }
    throw error
  }
}

// User authentication functions
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      'metadata.email': email,
    }).depth(1)
    
    return response.object as User
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}

export async function createUser(userData: {
  name: string;
  email: string;
  password_hash: string;
  role?: 'user' | 'admin';
  bio?: string;
}): Promise<User> {
  const response = await cosmic.objects.insertOne({
    title: userData.name,
    type: 'users',
    slug: userData.email.toLowerCase().replace(/[^a-z0-9]/g, '-'),
    metadata: {
      name: userData.name,
      email: userData.email,
      password_hash: userData.password_hash,
      role: userData.role || 'user',
      bio: userData.bio || ''
    }
  })
  
  return response.object as User
}

export async function getUserById(id: string): Promise<User | null> {
  try {
    const response = await cosmic.objects.findOne({
      type: 'users',
      id: id,
    }).depth(1)
    
    return response.object as User
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
      return null
    }
    throw error
  }
}