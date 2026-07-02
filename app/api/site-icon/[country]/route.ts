import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ country: string }> }
) {
  const { country } = await params
  const normalizedCountry = country.toLowerCase()

  const primaryPath = path.join(
    process.cwd(),
    'public',
    'logos',
    normalizedCountry,
    'icon-192.png'
  )

  const fallbackPath = path.join(
    process.cwd(),
    'public',
    'logos',
    'thailand',
    'icon-192.png'
  )

  const targetPath = existsSync(primaryPath) ? primaryPath : fallbackPath

  try {
    const fileBuffer = await readFile(targetPath)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
