import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILE_PATH = path.join(process.cwd(), 'data', 'bookings.json')

async function getKV () {
  try {
    if (
      process.env.KV_REST_API_URL &&
      (process.env.KV_REST_API_TOKEN || process.env.KV_URL)
    ) {
      const mod = await import('@vercel/kv')
      return mod.kv
    }
  } catch {}
  return null
}

async function readJSON () {
  try {
    const buf = await fs.readFile(FILE_PATH, 'utf-8')
    const data = JSON.parse(buf)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeJSON (list: any[]) {
  try {
    const dir = path.dirname(FILE_PATH)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8')
    return true
  } catch {
    return false
  }
}

export async function PATCH (
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const payload = await req.json().catch(() => ({}))
  const external = process.env.EXTERNAL_API_BASE
  if (external) {
    try {
      const base = external.endsWith('/') ? external.slice(0, -1) : external
      // Stringify parts if present
      const patchPayload =
        typeof (payload as any).parts !== 'undefined' &&
        Array.isArray((payload as any).parts)
          ? { ...payload, parts: JSON.stringify((payload as any).parts) }
          : payload
      const res = await fetch(`${base}/id/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patchPayload)
      })
      const data = await res.json().catch(() => ({}))
      return NextResponse.json(data, { status: res.status })
    } catch {
      // fallback ke KV/JSON
    }
  }
  const kv = await getKV()
  const current = kv
    ? Array.isArray(await kv.get('luxforge:bookings'))
      ? ((await kv.get('luxforge:bookings')) as any[])
      : []
    : await readJSON()
  const idx = current.findIndex((b: any) => b.id === id)
  if (idx === -1)
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  const updated = { ...current[idx], ...payload }
  current[idx] = updated
  if (kv) {
    await kv.set('luxforge:bookings', current)
  } else {
    const ok = await writeJSON(current)
    if (!ok)
      return NextResponse.json(
        { error: 'Gagal menulis file JSON' },
        { status: 500 }
      )
  }
  return NextResponse.json(updated)
}

export async function DELETE (
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  const external = process.env.EXTERNAL_API_BASE
  if (external) {
    try {
      const base = external.endsWith('/') ? external.slice(0, -1) : external
      const res = await fetch(`${base}/id/${id}`, { method: 'DELETE' })
      const data = await res.json().catch(() => ({ ok: res.ok }))
      return NextResponse.json(data, { status: res.status })
    } catch {
      // fallback ke KV/JSON
    }
  }
  const kv = await getKV()
  const current = kv
    ? Array.isArray(await kv.get('luxforge:bookings'))
      ? ((await kv.get('luxforge:bookings')) as any[])
      : []
    : await readJSON()
  const next = current.filter((b: any) => b.id !== id)
  if (kv) {
    await kv.set('luxforge:bookings', next)
  } else {
    const ok = await writeJSON(next)
    if (!ok)
      return NextResponse.json(
        { error: 'Gagal menulis file JSON' },
        { status: 500 }
      )
  }
  return NextResponse.json({ ok: true })
}
