import { favourites } from '../data/mock'

// Account-title lookup ("title fetch") for a receiver's mobile number.
//
// If EXPO_PUBLIC_ACCOUNT_API_URL is set, the app calls the real backend:
//   GET {URL}/accounts/title?msisdn=03XXXXXXXXX
//   → 200 { "title": "Full Name", "msisdn": "03XXXXXXXXX" }   |   404 when no account
// Otherwise it falls back to a local mock with a realistic network delay,
// so the UI (loading / found / not found / error) behaves exactly the same.

const API_URL = process.env.EXPO_PUBLIC_ACCOUNT_API_URL

export const isValidMobile = (n) => /^03\d{9}$/.test(n)

export class AccountNotFoundError extends Error {}

export async function fetchAccountTitle(msisdn, { signal } = {}) {
  if (!isValidMobile(msisdn)) throw new Error('Invalid mobile number')

  if (API_URL) {
    const res = await fetch(`${API_URL}/accounts/title?msisdn=${encodeURIComponent(msisdn)}`, { signal })
    if (res.status === 404) throw new AccountNotFoundError()
    if (!res.ok) throw new Error(`Lookup failed (${res.status})`)
    const data = await res.json()
    return { mobile: msisdn, fullName: data.title }
  }

  return mockLookup(msisdn, signal)
}

// ---- mock backend ----------------------------------------------------------

const directory = Object.fromEntries(favourites.map((f) => [f.mobile, f.fullName]))
const sampleNames = ['Usman Tariq', 'Hina Saleem', 'Faisal Qureshi', 'Ayesha Noor', 'Kamran Butt', 'Nida Farooq']

function mockLookup(msisdn, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Numbers ending in 0000 simulate "no easypaisa account" for demoing that state.
      if (msisdn.endsWith('0000')) return reject(new AccountNotFoundError())
      const fullName =
        directory[msisdn] ??
        sampleNames[msisdn.split('').reduce((sum, d) => sum + Number(d), 0) % sampleNames.length]
      resolve({ mobile: msisdn, fullName })
    }, 700)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(Object.assign(new Error('Aborted'), { name: 'AbortError' }))
    })
  })
}
