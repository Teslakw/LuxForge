import { NextResponse } from 'next/server'

export async function GET () {
  let mode: 'kv' | 'json' = 'json'
  let kvOk = false
  try {
    // External mode check
    const external = process.env.EXTERNAL_API_BASE
    if (external) {
      try {
        const base = external.endsWith('/') ? external.slice(0, -1) : external
        const res = await fetch(base, { cache: 'no-store' })
        const data = await res.json().catch(() => [])
        const ok = Array.isArray(data)
        return NextResponse.json({ mode: 'external', base, ok, count: ok ? data.length : 0 })
      } catch {
        return NextResponse.json({ mode: 'external', base: external, ok: false })
      }
    }

    // KV mode check
    try {
      if (
        process.env.KV_REST_API_URL &&
        (process.env.KV_REST_API_TOKEN || process.env.KV_URL)
      ) {
        const mod = await import('@vercel/kv')
        const kv = mod.kv
        const data = await kv.get('luxforge:bookings')
        const ok = Array.isArray(data)
        return NextResponse.json({ mode: 'kv', ok, count: ok ? (data as any[]).length : 0 })
      }
  } catch {}
  // JSON mode
    // JSON fallback
    return NextResponse.json({ mode: 'json', note: 'Using JSON file storage locally' })
}
