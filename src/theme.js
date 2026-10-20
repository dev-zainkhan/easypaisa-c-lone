import { Dimensions } from 'react-native'

// Every size in this app is measured from the reference screenshots (720px wide)
// and scaled to the device width, so proportions match the real app on any phone.
const DESIGN_WIDTH = 720
const { width } = Dimensions.get('window')
export const s = (px) => Math.round((px * width) / DESIGN_WIDTH)

export const colors = {
  brand: '#00BE5F', // primary buttons
  brandStatus: '#22B35B', // home status bar
  brandText: '#13B157', // green text (balance, "Change", "See All" accents)
  ink: '#2B2A35', // headings
  text: '#3A3A42',
  muted: '#6E6E78',
  placeholder: '#7B7B84',
  border: '#E1E1E4',
  borderStrong: '#D6D6DA',
  bg: '#F4F4F5',
  bgMint: '#F0F7F2',
  white: '#FFFFFF',
  disabled: '#9C9AA2',
  danger: '#E5484D',
  mintPill: '#DDF1E4',
  segmentActive: '#D3ECDB',
  overlay: 'rgba(0,0,0,0.38)',
}

export const font = {
  regular: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
}
