// Mock data only — no real accounts, names or numbers.

export const favourites = [
  { id: 'f1', name: 'Zain Ali', mobile: '03001234567', fullName: 'Zain Ali Khan' },
  { id: 'f2', name: 'Sana Khan', mobile: '03111234567', fullName: 'Sana Khan' },
  { id: 'f3', name: 'Rehan Zafar Malik', mobile: '03211234567', fullName: 'Rehan Zafar Malik' },
  { id: 'f4', name: 'Javed Hussain', mobile: '03451234567', fullName: 'Javed Hussain' },
  { id: 'f5', name: 'Maryam Aslam', mobile: '03331234567', fullName: 'Maryam Aslam' },
  { id: 'f6', name: 'Bilal Ahmed', mobile: '03021234567', fullName: 'Bilal Ahmed' },
]

export const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')

export const formatRs = (n, decimals) =>
  'Rs. ' +
  Number(n).toLocaleString('en-US', {
    minimumFractionDigits: decimals ?? (Number.isInteger(Number(n)) ? 0 : 2),
    maximumFractionDigits: 2,
  })

// Real device date/time, formatted like the app ("20 Oct 2026, 01:38 PM").
export const formatDateTime = (input = new Date()) => {
  const d = new Date(input)
  const date = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  return `${date}, ${time}`
}

export const profile = {
  name: 'Ahmed Hassan',
  mobile: '03001112233',
  email: 'ahmed.hassan@gmail.com',
  appVersion: 'V.2.10.11',
}
