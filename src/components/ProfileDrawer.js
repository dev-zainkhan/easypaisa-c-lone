import { useEffect, useRef, useState } from 'react'
import { Alert, Animated, Dimensions, Easing, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Ellipse, Line } from 'react-native-svg'
import { profile } from '../data/mock'
import { colors, font, s } from '../theme'
import { ChevronDown, ChevronLeft, ChevronUp, MenuApprovals, MenuGear, MenuLink, MenuMore, MenuUser } from './Icons'

const DRAWER_W = Math.round((Dimensions.get('window').width * 576) / 720)
const HEADER_H = s(262)

const accountItems = [
  { key: 'account', label: 'My Account' },
  { key: 'limits', label: 'Account Level & Limits' },
  { key: 'history', label: 'Transaction History' },
  { key: 'statement', label: 'E-Statement' },
  { key: 'certificate', label: 'Download Certificate' },
  { key: 'newgen', label: 'NewGen Account' },
  { key: 'business', label: 'Open Business Account', isNew: true },
  { key: 'agent', label: 'Agent Merchant Account Creation' },
]

const moreItems = [
  { key: 'refer', label: 'Refer & Earn' },
  { key: 'help', label: 'Help Center' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'privacy', label: 'Privacy Policy' },
]

export default function ProfileDrawer({ visible, onClose, onNavigate }) {
  const insets = useSafeAreaInsets()
  const progress = useRef(new Animated.Value(0)).current
  const [mounted, setMounted] = useState(visible)
  const [open, setOpen] = useState({ account: false, more: false })
  const [lang, setLang] = useState('en')

  useEffect(() => {
    if (visible) {
      setMounted(true)
      Animated.timing(progress, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start()
    } else if (mounted) {
      Animated.timing(progress, { toValue: 0, duration: 200, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(() =>
        setMounted(false),
      )
    }
  }, [visible])

  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }))
  const select = (key, label) => {
    if (key === 'history') return onNavigate('Transfer', { tab: 'history' })
    Alert.alert(label, 'This section is not part of the current assessment build.')
  }

  return (
    <Modal visible={mounted} transparent statusBarTranslucent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.scrim, { opacity: progress }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX: progress.interpolate({ inputRange: [0, 1], outputRange: [-DRAWER_W, 0] }) }] },
        ]}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          {/* Green header with guilloche-style line pattern */}
          <View style={{ height: HEADER_H + insets.top - s(74) }}>
            <LinearGradient
              colors={['#A9F0BE', '#4FD585', '#22C062']}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 1, y: 0.8 }}
              style={StyleSheet.absoluteFill}
            />
            <HeaderPattern />
            <Pressable
              onPress={onClose}
              hitSlop={12}
              accessibilityLabel="Close profile"
              style={[styles.back, { top: insets.top + s(2) }]}
            >
              <ChevronLeft size={s(46)} color={colors.ink} />
            </Pressable>
            <Pressable style={styles.editBtn} onPress={() => select('edit', 'Edit Profile')}>
              <Text style={styles.editText}>Edit Profile</Text>
            </Pressable>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{profile.name[0]}</Text>
          </View>

          <View style={styles.identity}>
            <Text style={styles.name}>{profile.name.toUpperCase()}</Text>
            <Text style={styles.phone}>{profile.mobile}</Text>
            <Text style={styles.email}>{profile.email}</Text>
          </View>

          <View style={styles.divider} />

          <View style={{ paddingTop: s(28) }}>
            <MenuRow
              Icon={MenuUser}
              label="My Account"
              expanded={open.account}
              onPress={() => toggle('account')}
              expandable
            />
            {open.account && <SubList items={accountItems} onSelect={select} />}
            <MenuRow Icon={MenuLink} label="Subscribed Services" onPress={() => select('subs', 'Subscribed Services')} />
            <MenuRow Icon={MenuApprovals} label="My Approvals" onPress={() => select('approvals', 'My Approvals')} />
            <MenuRow Icon={MenuGear} label="Security Preferences" onPress={() => select('security', 'Security Preferences')} />
            <MenuRow Icon={MenuMore} label="More" expanded={open.more} onPress={() => toggle('more')} expandable />
            {open.more && <SubList items={moreItems} onSelect={select} />}
          </View>

          <View style={[styles.divider, { marginTop: s(22) }]} />
          <View style={{ flex: 1, minHeight: s(40) }} />

          <View style={[styles.footer, { paddingBottom: insets.bottom + s(24) }]}>
            <Text style={styles.version}>Version {profile.appVersion}</Text>
            <View style={styles.langToggle}>
              {[
                { key: 'en', label: 'English' },
                { key: 'ur', label: 'اردو' },
              ].map((l) => (
                <Pressable key={l.key} onPress={() => setLang(l.key)} style={[styles.langItem, lang === l.key && styles.langItemActive]}>
                  <Text style={[styles.langText, lang === l.key && styles.langTextActive]}>{l.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  )
}

function MenuRow({ Icon, label, onPress, expandable, expanded }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.menuRow, pressed && { opacity: 0.6 }]}>
      <Icon size={s(46)} />
      <Text style={[styles.menuLabel, expanded && { color: colors.brandText }]}>{label}</Text>
      {expandable && (expanded ? <ChevronUp size={s(34)} /> : <ChevronDown size={s(34)} strokeWidth={1.8} />)}
    </Pressable>
  )
}

// Timeline-style sub menu: ringed dots joined by a dotted line.
function SubList({ items, onSelect }) {
  return (
    <View style={styles.subList}>
      {items.map((it, i) => (
        <Pressable key={it.key} onPress={() => onSelect(it.key, it.label)} style={({ pressed }) => [styles.subRow, pressed && { opacity: 0.6 }]}>
          {i < items.length - 1 && (
            <Svg width={2} height={ROW_H - s(18)} style={styles.connector}>
              <Line x1={1} y1={0} x2={1} y2={ROW_H - s(18)} stroke="#C2C2C8" strokeWidth={1.2} strokeDasharray="3 3" />
            </Svg>
          )}
          <View style={styles.dotRing}>
            <View style={styles.dot} />
          </View>
          <Text style={styles.subLabel} numberOfLines={1}>
            {it.label}
          </Text>
          {it.isNew && (
            <View style={styles.newPill}>
              <Text style={styles.newText}>New</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  )
}

function HeaderPattern() {
  const w = DRAWER_W
  const h = HEADER_H
  return (
    <Svg width={w} height={h} style={StyleSheet.absoluteFill} pointerEvents="none">
      {Array.from({ length: 34 }).map((_, i) => (
        <Ellipse
          key={i}
          cx={w * 0.78}
          cy={h * 0.95}
          rx={w * 0.12 + i * w * 0.028}
          ry={h * 0.1 + i * h * 0.05}
          transform={`rotate(-28 ${w * 0.78} ${h * 0.95})`}
          stroke="#FFFFFF"
          strokeOpacity={0.32}
          strokeWidth={0.8}
          fill="none"
        />
      ))}
    </Svg>
  )
}

const DOT_X = s(22) // centre of timeline dots relative to sub list
const ROW_H = s(71)

const styles = StyleSheet.create({
  scrim: { backgroundColor: 'rgba(0,0,0,0.45)' },
  drawer: { position: 'absolute', top: 0, bottom: 0, left: 0, width: DRAWER_W, backgroundColor: colors.white },
  back: { position: 'absolute', left: s(40) },
  editBtn: {
    position: 'absolute',
    right: s(28),
    bottom: s(28),
    height: s(46),
    paddingHorizontal: s(22),
    borderRadius: s(23),
    borderWidth: 2,
    borderColor: colors.white,
    justifyContent: 'center',
  },
  editText: { color: colors.white, fontSize: s(20), ...font.semibold },

  avatar: {
    marginTop: -s(90),
    marginLeft: s(36),
    width: s(178),
    height: s(178),
    borderRadius: s(89),
    borderWidth: s(5),
    borderColor: colors.white,
    backgroundColor: '#CDEFD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: s(64), color: colors.ink, ...font.semibold },

  identity: { paddingHorizontal: s(34), marginTop: s(32) },
  name: { fontSize: s(32), color: colors.ink, letterSpacing: 0.2, ...font.semibold },
  phone: { marginTop: s(18), fontSize: s(24), color: '#5A5A63' },
  email: { marginTop: s(14), fontSize: s(22), color: '#5A5A63' },
  divider: { height: 1, backgroundColor: '#E3E3E6', marginHorizontal: s(32), marginTop: s(30) },

  menuRow: { flexDirection: 'row', alignItems: 'center', height: s(82), paddingLeft: s(38), paddingRight: s(44) },
  menuLabel: { flex: 1, marginLeft: s(30), fontSize: s(26), color: colors.ink, ...font.medium },

  subList: { paddingLeft: s(40), paddingRight: s(28), marginBottom: s(4) },
  subRow: { flexDirection: 'row', alignItems: 'center', height: ROW_H },
  connector: { position: 'absolute', left: DOT_X - 1, top: ROW_H / 2 + s(9) },
  dotRing: {
    width: s(18),
    height: s(18),
    marginLeft: DOT_X - s(9),
    borderRadius: s(9),
    borderWidth: 1.2,
    borderColor: '#A8A8AE',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: s(7), height: s(7), borderRadius: s(4), backgroundColor: colors.ink },
  subLabel: { flex: 1, marginLeft: s(40), fontSize: s(22), color: colors.text },
  newPill: {
    height: s(32),
    paddingHorizontal: s(22),
    borderRadius: s(16),
    backgroundColor: '#FFC928',
    justifyContent: 'center',
  },
  newText: { color: colors.white, fontSize: s(19), ...font.medium },

  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: s(28) },
  version: { fontSize: s(21), color: '#5A5A63' },
  langToggle: { flexDirection: 'row', backgroundColor: '#EFEFF1', borderRadius: s(14), padding: s(8), width: s(210) },
  langItem: { flex: 1, height: s(52), borderRadius: s(10), alignItems: 'center', justifyContent: 'center' },
  langItemActive: { backgroundColor: colors.white },
  langText: { fontSize: s(21), color: '#8A8A92' },
  langTextActive: { color: colors.ink, ...font.semibold },
})
