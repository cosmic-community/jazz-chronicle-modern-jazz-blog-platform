import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'
import { getUserById } from '@/lib/cosmic'
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG || '',
  readKey: process.env.COSMIC_READ_KEY || '',
  writeKey: process.env.COSMIC_WRITE_KEY || '',
  apiEnvironment: "staging"
})

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    let decoded
    try {
      decoded = await verifyToken(token)
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    const user = await getUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const bio = formData.get('bio') as string
    const avatarFile = formData.get('avatar') as File | null

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 })
    }

    // Check if email is already taken by another user
    if (email !== user.metadata.email) {
      try {
        const existingUser = await cosmic.objects
          .findOne({ type: 'users', 'metadata.email': email })
          .props(['id'])
        
        if (existingUser && existingUser.object.id !== user.id) {
          return NextResponse.json({ message: 'Email already in use' }, { status: 400 })
        }
      } catch (error) {
        // If 404, email is not taken, which is good
        if (!(error && typeof error === 'object' && 'status' in error && error.status === 404)) {
          throw error
        }
      }
    }

    // Prepare update data
    const updateData: any = {
      title: name,
      metadata: {
        name,
        email,
        bio: bio || '',
        password_hash: user.metadata.password_hash,
        role: user.metadata.role,
        avatar: user.metadata.avatar, // Keep existing avatar by default
      },
    }

    // Handle avatar upload if provided
    if (avatarFile && avatarFile.size > 0) {
      try {
        // Upload the file to Cosmic
        const uploadResponse = await cosmic.media.insertOne({
          media: avatarFile,
          folder: 'avatars',
        })

        updateData.metadata.avatar = {
          url: uploadResponse.media.url,
          imgix_url: uploadResponse.media.imgix_url,
        }
      } catch (uploadError) {
        console.error('Avatar upload failed:', uploadError)
        return NextResponse.json({ message: 'Failed to upload avatar' }, { status: 500 })
      }
    }

    // Update user in Cosmic
    await cosmic.objects.updateOne(user.id, updateData)

    return NextResponse.json({ message: 'Profile updated successfully' })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}