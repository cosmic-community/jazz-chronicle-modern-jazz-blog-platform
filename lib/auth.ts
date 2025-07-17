import { sign, verify } from 'jsonwebtoken'
import { compare, hash } from 'bcryptjs'
import { getUserByEmail, createUser, getUserById } from '@/lib/cosmic'
import { AuthUser, LoginCredentials, SignupCredentials } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || ''

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12)
}

export async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return sign(
    { userId },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string }
    return decoded
  } catch (error) {
    return null
  }
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AuthUser | null> {
  const user = await getUserByEmail(credentials.email)
  
  if (!user) {
    return null
  }
  
  const isValid = await comparePasswords(credentials.password, user.metadata.password_hash)
  
  if (!isValid) {
    return null
  }
  
  return {
    id: user.id,
    name: user.metadata.name,
    email: user.metadata.email,
    role: user.metadata.role,
    avatar: user.metadata.avatar?.imgix_url,
    bio: user.metadata.bio
  }
}

export async function registerUser(credentials: SignupCredentials): Promise<AuthUser> {
  // Check if user already exists
  const existingUser = await getUserByEmail(credentials.email)
  if (existingUser) {
    throw new Error('User already exists with this email')
  }
  
  // Hash password
  const hashedPassword = await hashPassword(credentials.password)
  
  // Create user
  const user = await createUser({
    name: credentials.name,
    email: credentials.email,
    password_hash: hashedPassword,
    role: 'user',
    bio: credentials.bio
  })
  
  return {
    id: user.id,
    name: user.metadata.name,
    email: user.metadata.email,
    role: user.metadata.role,
    avatar: user.metadata.avatar?.imgix_url,
    bio: user.metadata.bio
  }
}

export async function getUserFromToken(token: string): Promise<AuthUser | null> {
  const decoded = await verifyToken(token)
  
  if (!decoded) {
    return null
  }
  
  const user = await getUserById(decoded.userId)
  
  if (!user) {
    return null
  }
  
  return {
    id: user.id,
    name: user.metadata.name,
    email: user.metadata.email,
    role: user.metadata.role,
    avatar: user.metadata.avatar?.imgix_url,
    bio: user.metadata.bio
  }
}