'use client'
import React, { useEffect, useMemo, useState } from 'react'
import bookingsSeed from '@/data/bookings.json'
import {
  Phone,
  Mail,
  Trash2,
  Search,
  Calendar,
  User,
  Settings
} from 'lucide-react'

// Sesuaikan tipe data dengan apa yang disimpan di CheckoutPage
type Booking = {
  id: string
  carName: string
  color: string
  interiorColor?: string // Field baru dari checkout
  parts?: string[] | string // Bisa array dari checkout atau string dari Sheet.best
  // Legacy fields (optional support untuk data lama)
  wheelModel?: string
  tireSpec?: string

  customerName: string
  phone: string
  email: string
  date: string
  status: string
  price?: string
  createdAt?: string
}

type Creds = { username: string; password: string }
const VALID: Creds = { username: 'admin', password: 'parta 2005' }

export default function AdminPage () {
  const [auth, setAuth] = useState<Creds>({ username: '', password: '' })
  const [loggedIn, setLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  const loginDisabled = useMemo(() => !auth.username || !auth.password, [auth])

  function handleLogin (e: React.FormEvent) {
    e.preventDefault()
    const username = auth.username.trim().toLowerCase()
    const password = auth.password.trim()
    if (
      username === VALID.username.toLowerCase() &&
      password === VALID.password
    ) {
      setLoggedIn(true)
    } else {
      alert('Invalid credentials')
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/bookings', { cache: 'no-store' })
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        setBookings(Array.isArray(data) ? data : [])
      } catch (e) {
        try {
          const existing = JSON.parse(
            localStorage.getItem('luxforge_bookings') || '[]'
          )
          if (existing.length === 0 && Array.isArray(bookingsSeed)) {
            setBookings([])
          } else {
            setBookings(existing)
          }
        } catch {
          setBookings([])
        }
      } finally {
        setLoading(false)
      }
    }
    if (loggedIn) load()
  }, [loggedIn])

  const filtered = useMemo(() => {
    if (!q) return bookings
    const s = q.toLowerCase()
    return bookings.filter(
      b =>
        b.customerName.toLowerCase().includes(s) ||
        b.email.toLowerCase().includes(s) ||
        b.phone.toLowerCase().includes(s) ||
        b.carName.toLowerCase().includes(s)
    )
  }, [q, bookings])

  async function handleDelete (id: string) {
    if (!confirm('Delete this request?')) return
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch {
      const next = bookings.filter(b => b.id !== id)
      setBookings(next)
      localStorage.setItem('luxforge_bookings', JSON.stringify(next))
    }
  }

  async function handleApproveBooking (id: string) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Approved' })
      })
      if (!res.ok) throw new Error('Failed to update')
    } catch {}
    // Update state locally regardless of PATCH response shape
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Approved' } : b))
    )
  }

  async function handleRejectBooking (id: string) {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Rejected' })
      })
      if (!res.ok) throw new Error('Failed to update')
    } catch {}
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Rejected' } : b))
    )
  }

  return (
    <div className='min-h-screen bg-black text-white pt-24 px-6 md:px-12 pb-20'>
      {!loggedIn && (
        <div className='max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 mt-10'>
          <h1 className='text-2xl font-serif mb-4 uppercase tracking-wider'>
            Admin Portal
          </h1>
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-[10px] uppercase tracking-widest text-gray-400 mb-2'>
                Username
              </label>
              <input
                type='text'
                value={auth.username}
                onChange={e => setAuth({ ...auth, username: e.target.value })}
                className='w-full bg-black border border-white/20 rounded-none px-4 py-3 outline-none focus:border-white transition-colors text-sm'
                placeholder='admin'
              />
            </div>
            <div>
              <label className='block text-[10px] uppercase tracking-widest text-gray-400 mb-2'>
                Password
              </label>
              <input
                type='password'
                value={auth.password}
                onChange={e => setAuth({ ...auth, password: e.target.value })}
                className='w-full bg-black border border-white/20 rounded-none px-4 py-3 outline-none focus:border-white transition-colors text-sm'
                placeholder='•••••••••'
              />
            </div>
            <button
              type='submit'
              disabled={loginDisabled}
              className='w-full bg-white text-black py-3 font-bold uppercase text-xs tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-50'
            >
              Access Dashboard
            </button>
          </form>
          {/* Password hint intentionally omitted to avoid disclosure */}
        </div>
      )}
      {loggedIn && (
        <>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6'>
            <div>
              <h2 className='text-3xl font-serif uppercase'>
                Concierge Requests
              </h2>
              <p className='text-gray-500 text-sm mt-1'>
                Manage incoming vehicle allocation requests.
              </p>
            </div>
            <div className='flex items-center gap-3 w-full md:w-auto'>
              <div className='bg-[#0a0a0a] border border-white/10 flex items-center px-4 py-3 w-full md:w-80 focus-within:border-white/40 transition-colors'>
                <Search size={16} className='text-gray-500 mr-3' />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  placeholder='SEARCH CLIENT OR VEHICLE...'
                  className='bg-transparent text-xs text-white outline-none placeholder-gray-600 w-full uppercase tracking-wider'
                />
              </div>
              <div className='bg-[#0a0a0a] border border-white/10 px-5 py-3 text-right hidden md:block'>
                <span className='block text-[10px] text-gray-500 uppercase tracking-widest'>
                  Pending
                </span>
                <span className='text-xl font-mono text-white leading-none'>
                  {filtered.filter(b => b.status === 'Pending Review').length}
                </span>
              </div>
            </div>
          </div>

          <div className='border border-white/10 bg-[#050505] shadow-2xl overflow-hidden'>
            <div className='overflow-x-auto'>
              {loading ? (
                <div className='p-20 text-center text-gray-500 animate-pulse text-xs uppercase tracking-widest'>
                  Syncing Database...
                </div>
              ) : filtered.length === 0 ? (
                <div className='p-20 text-center flex flex-col items-center justify-center text-gray-600'>
                  <Settings size={32} className='mb-4 opacity-50' />
                  <span className='text-xs uppercase tracking-widest'>
                    No active requests found
                  </span>
                </div>
              ) : (
                <table className='w-full text-left text-sm whitespace-nowrap'>
                  <thead className='bg-[#111] uppercase text-[10px] tracking-[0.15em] text-gray-400 border-b border-white/10'>
                    <tr>
                      <th className='p-6 font-medium'>Client Identity</th>
                      <th className='p-6 font-medium'>Configuration Spec</th>
                      <th className='p-6 font-medium'>Contact Info</th>
                      <th className='p-6 font-medium'>Allocation Date</th>
                      <th className='p-6 font-medium text-right'>Decisions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-white/5'>
                    {filtered.map(b => (
                      <tr
                        key={b.id}
                        className='hover:bg-white/[0.02] transition-colors group'
                      >
                        {/* CLIENT IDENTITY */}
                        <td className='p-6 align-top'>
                          <div className='flex items-start gap-3'>
                            <div>
                              <div className='font-bold text-white uppercase text-sm tracking-wide'>
                                {b.customerName}
                              </div>
                              <div className='text-[10px] text-gray-600 font-mono mt-1 uppercase'>
                                Ref: {b.id.slice(0, 8)}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* CONFIGURATION SPEC */}
                        <td className='p-6 align-top'>
                          <div className='flex items-start gap-4'>
                            {/* Visual Color Indicator */}
                            <div
                              className='w-12 h-12 rounded-full border border-white/20 flex items-center justify-center relative shadow-lg'
                              style={{ backgroundColor: b.color }}
                            >
                              {/* Inner circle for Interior Color */}
                              <div
                                className='w-5 h-5 rounded-full border border-black/20 shadow-sm absolute bottom-0 right-0'
                                style={{
                                  backgroundColor: b.interiorColor || '#2b2b2b'
                                }}
                                title={`Interior: ${b.interiorColor}`}
                              />
                            </div>

                            <div>
                              <span className='block text-white text-sm font-bold uppercase tracking-wide'>
                                {b.carName}
                              </span>

                              <div className='space-y-1 mt-2'>
                                {/* Colors */}
                                <div className='flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider'>
                                  <span className='w-16'>Exterior:</span>
                                  <span className='text-white'>{b.color}</span>
                                </div>
                                <div className='flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wider'>
                                  <span className='w-16'>Interior:</span>
                                  <span className='text-white'>
                                    {b.interiorColor || 'Standard'}
                                  </span>
                                </div>

                                {/* Parts List from Array (guard for strings) */}
                                {(() => {
                                  const raw = b.parts as
                                    | string[]
                                    | string
                                    | undefined
                                  const safeParts: string[] = Array.isArray(raw)
                                    ? raw
                                    : typeof raw === 'string'
                                    ? raw
                                        .split(',')
                                        .map(s => s.trim())
                                        .filter(Boolean)
                                    : []
                                  if (safeParts.length === 0) return null
                                  return (
                                    <div className='mt-2 pt-2 border-t border-white/5'>
                                      <span className='text-[10px] text-gray-500 uppercase tracking-widest mb-1 block'>
                                        Selected Upgrades:
                                      </span>
                                      <div className='flex flex-wrap gap-1 max-w-xs whitespace-normal'>
                                        {safeParts.map(
                                          (part: string, i: number) => (
                                            <span
                                              key={i}
                                              className='inline-block px-1.5 py-0.5 bg-white/10 border border-white/10 rounded text-[9px] text-gray-300 uppercase tracking-wider'
                                            >
                                              {part.replace(/_/g, ' ')}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )
                                })()}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* CONTACT INFO */}
                        <td className='p-6 align-top text-gray-400'>
                          <div className='flex flex-col gap-3 text-xs'>
                            <span className='flex items-center gap-3'>
                              <Phone size={14} className='text-gray-600' />{' '}
                              {b.phone}
                            </span>
                            <span className='flex items-center gap-3'>
                              <Mail size={14} className='text-gray-600' />{' '}
                              {b.email}
                            </span>
                          </div>
                        </td>

                        {/* DATE & STATUS */}
                        <td className='p-6 align-top text-gray-400 font-mono text-xs'>
                          <div className='flex flex-col gap-2'>
                            <span className='flex items-center gap-2'>
                              <Calendar size={14} className='text-gray-600' />{' '}
                              {b.date}
                            </span>

                            <div className='mt-1'>
                              {b.status === 'Pending Review' && (
                                <span className='px-2 py-1 text-[10px] bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-wider'>
                                  Pending Review
                                </span>
                              )}
                              {b.status === 'Approved' && (
                                <span className='px-2 py-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider'>
                                  Approved
                                </span>
                              )}
                              {b.status === 'Rejected' && (
                                <span className='px-2 py-1 text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider'>
                                  Rejected
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* ACTIONS */}
                        <td className='p-6 align-top text-right'>
                          <div className='flex items-center justify-end gap-2'>
                            {b.status === 'Pending Review' && (
                              <>
                                <button
                                  onClick={() => handleApproveBooking(b.id)}
                                  className='px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white transition-colors'
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectBooking(b.id)}
                                  className='px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors'
                                >
                                  Reject
                                </button>
                              </>
                            )}

                            <button
                              onClick={() => handleDelete(b.id)}
                              className='p-1.5 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded transition-all ml-2'
                              title='Delete Request'
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
