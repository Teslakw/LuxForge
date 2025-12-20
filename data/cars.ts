// data/cars.ts

export interface Car {
  id: number
  name: string
  price: string
  image: string
  type: string
  vehicleType: 'car' | 'motorcycle'
  category:
  | 'Ferrari'
  | 'Koenigsegg'
  | 'McLaren'
  | 'Rolls-Royce'
  | 'Mercedes'
  | 'Lamborghini'
  | 'Porsche'
  | 'Toyota'
  | 'Honda'
  | 'Mitsubishi'
  | 'Harley-Davidson'
  | 'Ducati'
  | 'Kawasaki'
  | 'Yamaha'
  | 'Other'
  specs: { engine: string; power: string; speed: string }
  rentalPrice?: string
  availableForRent?: boolean
}

import carsJson from './cars.json'

export const CAR_DATABASE: Car[] = carsJson as unknown as Car[]

// Helpers for category filtering
export const cars = CAR_DATABASE

export function getCarsByCategory(category: Car['category']) {
  return CAR_DATABASE.filter(c => c.category === category)
}

// Simple image repair request model (mock, client-side only)
export interface ImageRepairRequest {
  id: string
  carId: number
  carName: string
  category: Car['category']
  brokenUrl: string
  alternatives: string[]
  selectedReplacement?: string
}

const STORAGE_KEY = 'luxforge_image_repair_requests'

function seedRequestsIfEmpty() {
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    const sample: ImageRepairRequest[] = [
      {
        id: 'r1',
        carId: 3,
        carName: 'Ferrari SF90 Stradale',
        category: 'Ferrari',
        brokenUrl:
          'https://images.unsplash.com/photo-1609138315745-4e44ac3bbd8d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alternatives: [
          'https://images.unsplash.com/photo-1675426513824-25a43c3ae0ba?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          'https://images.unsplash.com/photo-1687296331978-025ad9d6be1a?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ]
      },
      {
        id: 'r2',
        carId: 5,
        carName: 'Koenigsegg Jesko',
        category: 'Koenigsegg',
        brokenUrl:
          'https://images.unsplash.com/photo-1612190618826-8b2b6a4a2e9f?q=80&w=1200',
        alternatives: [
          'https://images.unsplash.com/photo-1558981700-72a8f1bc0f2c?q=80&w=1200',
          'https://images.unsplash.com/photo-1542367597-8d8c078662bc?q=80&w=1200'
        ]
      }
    ]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample))
  }
}

export function getImageRepairRequests(): ImageRepairRequest[] {
  if (typeof window !== 'undefined') {
    seedRequestsIfEmpty()
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }
  return []
}

export function approveImageRepair(id: string): ImageRepairRequest[] {
  const list = getImageRepairRequests()
  const req = list.find(r => r.id === id)
  if (req && req.selectedReplacement) {
    replaceCarImageById(req.carId, req.selectedReplacement)
    const next = list.filter(r => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    return next
  }
  return list
}

export function rejectImageRepair(id: string): ImageRepairRequest[] {
  const list = getImageRepairRequests()
  const next = list.filter(r => r.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export function replaceCarImageById(carId: number, newUrl: string) {
  const idx = CAR_DATABASE.findIndex(c => c.id === carId)
  if (idx >= 0) {
    CAR_DATABASE[idx] = { ...CAR_DATABASE[idx], image: newUrl }
  }
}
