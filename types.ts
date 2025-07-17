// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  published_at?: string;
  status: string;
}

// User interface
interface User extends CosmicObject {
  type: 'users';
  metadata: {
    name: string;
    email: string;
    password_hash: string;
    role: 'user' | 'admin';
    avatar?: {
      url: string;
      imgix_url: string;
    };
    bio?: string;
  };
}

// Post interface
interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    excerpt?: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
    tags?: string;
    published_date?: string;
  };
}

// Author interface
interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    website?: string;
    twitter?: string;
    specialties?: string;
  };
}

// Category interface
interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
  };
}

// Authentication types
interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  bio?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Component prop types
interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
  className?: string;
}

interface CategoryBadgeProps {
  category: Category;
  className?: string;
}

interface AuthorCardProps {
  author: Author;
  className?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  className?: string;
}

// Utility types
type PostStatus = 'published' | 'draft' | 'archived';

export type {
  CosmicObject,
  User,
  Post,
  Author,
  Category,
  AuthUser,
  LoginCredentials,
  SignupCredentials,
  AuthContextType,
  CosmicResponse,
  PostCardProps,
  CategoryBadgeProps,
  AuthorCardProps,
  CategoryFilterProps,
  PostStatus
};