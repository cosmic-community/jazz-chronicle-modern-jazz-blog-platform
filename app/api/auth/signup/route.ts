import { NextRequest, NextResponse } from 'next/server'
import { registerUser, generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, bio } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const user = await registerUser({ name, email, password, bio })
    const token = generateToken(user.id)

    return NextResponse.json({
      user,
      token,
      message: 'Account created successfully'
    })
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('User already exists')) {
        return NextResponse.json(
          { message: 'User already exists with this email' },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}