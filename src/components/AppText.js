import { forwardRef } from 'react'
import { StyleSheet, Text as RNText, TextInput as RNTextInput } from 'react-native'

// Text/TextInput that always render with the bundled Inter font.
// OEM system fonts (Infinix/Tecno/Oppo…) are measured incorrectly by React Native,
// which clips or wraps text — a bundled font makes layout identical on every phone.
const FAMILY = {
  normal: 'Inter_400Regular',
  400: 'Inter_400Regular',
  500: 'Inter_500Medium',
  600: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  700: 'Inter_700Bold',
  800: 'Inter_700Bold',
}

const withFont = (style) => {
  const weight = StyleSheet.flatten(style)?.fontWeight ?? '400'
  return [style, { fontFamily: FAMILY[weight] ?? FAMILY[400], fontWeight: 'normal' }]
}

export const Text = forwardRef((props, ref) => <RNText ref={ref} {...props} style={withFont(props.style)} />)

export const TextInput = forwardRef((props, ref) => <RNTextInput ref={ref} {...props} style={withFont(props.style)} />)
