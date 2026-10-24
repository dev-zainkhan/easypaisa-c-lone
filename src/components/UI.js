import { Pressable, StyleSheet, View } from 'react-native'
import { Text } from './AppText'
import { useNavigation } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, font, s } from '../theme'
import { ChevronLeft } from './Icons'

export function SquareButton({ onPress, children, style, accessibilityLabel }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.square, pressed && styles.pressed, style]}
    >
      {children}
    </Pressable>
  )
}

export function BackButton({ onPress }) {
  const navigation = useNavigation()
  return (
    <SquareButton accessibilityLabel="Back" onPress={onPress ?? (() => navigation.goBack())}>
      <ChevronLeft size={s(34)} color={colors.ink} />
    </SquareButton>
  )
}

// White header used by every inner screen: back button row, large title, optional subtitle/right slot.
export function ScreenHeader({ title, subtitle, topRight, titleRight, topRow, children }) {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.header, { paddingTop: insets.top + s(36), borderBottomWidth: children ? 0 : 1 }]}>
      {topRow ?? (
        <View style={styles.topRow}>
          <BackButton />
          {topRight}
        </View>
      )}
      <View style={styles.titleRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle}
        </View>
        {titleRight}
      </View>
      {children}
    </View>
  )
}

export function PrimaryButton({ title, onPress, disabled, style }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.primary,
        { backgroundColor: disabled ? colors.disabled : colors.brand },
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  square: {
    width: s(72),
    height: s(72),
    borderRadius: s(14),
    borderWidth: 1.2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: s(36),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginTop: s(36), paddingBottom: s(18) },
  title: { fontSize: s(46), color: colors.ink, letterSpacing: -0.3, ...font.semibold },
  primary: {
    height: s(84),
    borderRadius: s(42),
    marginHorizontal: s(99),
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: { color: colors.white, fontSize: s(23), ...font.semibold },
})
