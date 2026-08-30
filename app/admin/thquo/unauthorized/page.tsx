import Link from 'next/link'

export default function ThquoUnauthorizedPage() {
  return (
    <div>
      <p>သင့်အကောင့်တွင် ဤစာမျက်နှာကို ဝင်ရောက်ခွင့်မရှိပါ။</p>
      <Link href="/admin/staff">Back to Staff Hub</Link>
    </div>
  )
}