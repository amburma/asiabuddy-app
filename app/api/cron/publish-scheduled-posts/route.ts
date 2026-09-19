import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const now = new Date().toISOString()

  // Find posts due to publish (scheduled time has passed, not yet published)
  const { data: duePosts, error: fetchError } = await supabase
    .from('posts')
    .select('id, scheduled_publish_at')
    .eq('published', false)
    .not('scheduled_publish_at', 'is', null)
    .lte('scheduled_publish_at', now)
    .order('scheduled_publish_at', { ascending: true })

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  if (!duePosts || duePosts.length === 0) {
    return NextResponse.json({ published: 0, message: 'No posts due' })
  }

  // Safety cap: only publish ONE post per invocation, even if multiple are overdue
  // (prevents a backlog of missed schedules from all going live at once)
  const postToPublish = duePosts[0]

  const { error: updateError } = await supabase
    .from('posts')
    .update({ published: true, published_at: now })
    .eq('id', postToPublish.id)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ published: 1, postId: postToPublish.id })
}
