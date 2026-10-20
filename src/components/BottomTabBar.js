import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, font, s } from '../theme'
import { TabCards, TabHome, TabPay, TabPromotions, TabZen } from './Icons'

const tabs = [
  { key: 'home', label: 'Home', Icon: TabHome },
  { key: 'cards', label: 'Cards', Icon: TabCards },
  { key: 'pay', label: 'Pay', Icon: TabPay },
  { key: 'promotions', label: 'Promotions', Icon: TabPromotions },
  { key: 'zen', label: 'Zen', Icon: TabZen },
]

export const TAB_BAR_HEIGHT = s(112)

export default function BottomTabBar({ active = 'home' }) {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom }]} pointerEvents="box-none">
      <LinearGradient
        colors={['rgba(244,244,245,0)', 'rgba(255,255,255,0.96)']}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.bar}>
        {tabs.map(({ key, label, Icon }) => {
          const isActive = key === active
          return (
            <Pressable
              key={key}
              style={styles.tab}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              onPress={() => !isActive && Alert.alert(label, 'This section is not part of the current assessment build.')}
            >
              {isActive && <View style={styles.indicator} />}
              <Icon size={s(42)} active={isActive} />
              <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 0, right: 0, bottom: 0 },
  bar: { height: TAB_BAR_HEIGHT, flexDirection: 'row', alignItems: 'center' },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: s(6), height: '100%' },
  indicator: {
    position: 'absolute',
    top: 0,
    width: s(12),
    height: s(8),
    borderBottomLeftRadius: s(6),
    borderBottomRightRadius: s(6),
    backgroundColor: colors.brandText,
  },
  label: { fontSize: s(18), color: colors.ink, ...font.medium },
  labelActive: { color: colors.brandText },
})
