import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

// Dual-mode storage: KV in production (if env present), JSON file locally.
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
  } catch (e) {
    // Jika file belum ada, kembalikan array kosong
    return []
  }
}

async function writeJSON (list: any[]) {
  try {
    const dir = path.dirname(FILE_PATH)
    // Pastikan folder ada
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(FILE_PATH, JSON.stringify(list, null, 2), 'utf-8')
    return true
  } catch (e) {
    return false
  }
}

export async function GET () {
  const SHEET_BASE =
    process.env.EXTERNAL_API_BASE ||
    'https://api.sheetbest.com/sheets/10dc2a5e-e4cf-4d3d-9112-2ba60317cb83'
  const external = SHEET_BASE
  if (external) {
    try {
      const base = external.endsWith('/') ? external.slice(0, -1) : external
      const res = await fetch(base, { cache: 'no-store' })
      const data = await res.json().catch(() => [])
      const list = Array.isArray(data) ? data : []
      // Normalisasi parts agar array
      const normalized = list.map((row: any) => {
        let parts: any = row.parts
        if (typeof parts === 'string') {
          try {
            parts = JSON.parse(parts)
          } catch {
            parts = parts ? [parts] : []
          }
        }
        if (!Array.isArray(parts)) parts = []
        return { ...row, parts }
      })
      return NextResponse.json(normalized)
    } catch {
      // fallback ke mode berikutnya
    }
  }
  const kv = await getKV()
  if (kv) {
    const data = await kv.get('luxforge:bookings')
    const list = Array.isArray(data) ? (data as any[]) : []
    return NextResponse.json(list)
  }
  const list = await readJSON()
  return NextResponse.json(list)
}

export async function POST (req: NextRequest) {
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    const booking = {
      id: body.id || crypto.randomUUID(),
      carName: body.carName,
      color: body.color,
      interiorColor: body.interiorColor,
      parts: Array.isArray(body.parts) ? body.parts : [],
      wheelModel: body.wheelModel,
      tireSpec: body.tireSpec,
      customerName: body.customerName,
      phone: body.phone,
      email: body.email,
      date: body.date,
      status: body.status || 'Pending Review',
      price: body.price,
      createdAt: body.createdAt || now
    }

    // Basic validation
    if (
      !booking.customerName ||
      !booking.email ||
      !booking.phone ||
      !booking.carName
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const SHEET_BASE =
      process.env.EXTERNAL_API_BASE ||
      'https://api.sheetbest.com/sheets/10dc2a5e-e4cf-4d3d-9112-2ba60317cb83'
    const external = SHEET_BASE
    if (external) {
      try {
        const base = external.endsWith('/') ? external.slice(0, -1) : external
        // Stringify parts untuk Sheet.best
        const payload = Array.isArray(booking.parts)
          ? { ...booking, parts: JSON.stringify(booking.parts) }
          : booking
        const res = await fetch(base, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const result = await res.json().catch(() => booking)
        return NextResponse.json(result, { status: res.status })
      } catch {
        // fallback ke KV/JSON
      }
    }

    const kv = await getKV()
    if (kv) {
      const existing = await kv.get('luxforge:bookings')
      const list = Array.isArray(existing) ? (existing as any[]) : []
      await kv.set('luxforge:bookings', [booking, ...list])
    } else {
      const current = await readJSON()
      const updated = [booking, ...current]
      const ok = await writeJSON(updated)
      if (!ok) {
        return NextResponse.json(
          { error: 'Gagal menulis file JSON' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
