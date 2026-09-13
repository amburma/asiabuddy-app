import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { country, slug } = body

    if (!country) {
      return NextResponse.json({ success: false, error: 'Country is required' }, { status: 400 })
    }

    revalidateTag(`posts-${country}`)
    if (slug) {
      revalidateTag(`post-${slug}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
