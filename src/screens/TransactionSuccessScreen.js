import { useCallback, useEffect, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Animated, BackHandler, Easing, Pressable, Share, StyleSheet, View } from 'react-native'
import { Text } from '../components/AppText'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Path } from 'react-native-svg'
import { formatDateTime, formatRs } from '../data/mock'
import { colors, font, s } from '../theme'
import { CoinFace, EpLogo, Leaf } from '../components/Illustrations'

const COIN = s(232)
const RAY_ANGLES = [-70, -20, 25, 70, 110, 160, 200, 250]

export default function TransactionSuccessScreen({ navigation, route }) {
  const { tx } = route.params
  const insets = useSafeAreaInsets()

  const enter = useRef(new Animated.Value(0)).current
  const flip = useRef(new Animated.Value(0)).current
  const rays = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.spring(enter, { toValue: 1, friction: 6, tension: 60, useNativeDriver: true }),
      Animated.delay(450),
      Animated.timing(flip, { toValue: 1, duration: 650, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }),
      Animated.spring(rays, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
    ]).start()
  }, [])

  const goHome = () => navigation.popToTop()

  // Hardware back on Android returns home instead of the confirm screen.
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        goHome()
        return true
      })
      return () => sub.remove()
    }, []),
  )

  const receiptText = [
    'easypaisa – Transaction Receipt',
    `Amount: ${formatRs(tx.amount, 2)}`,
    `Sent to: ${tx.to.fullName} (${tx.to.mobile})`,
    `Fee: ${tx.fee ? formatRs(tx.fee, 2) : 'Free'}`,
    `Transaction ID: ${tx.id}`,
    `Date & Time: ${formatDateTime(tx.date)}`,
    tx.message ? `Message: ${tx.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const onShare = () => Share.share({ message: receiptText }).catch(() => {})

  const frontRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] })
  const backRotate = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] })
  const frontOpacity = flip.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [1, 1, 0, 0] })
  const backOpacity = flip.interpolate({ inputRange: [0, 0.5, 0.51, 1], outputRange: [0, 0, 1, 1] })
  const leafOpacity = flip.interpolate({ inputRange: [0, 0.3], outputRange: [1, 0], extrapolate: 'clamp' })

  return (
    <LinearGradient colors={['#C2EFD6', '#E6F8EE', '#FFFFFF']} locations={[0, 0.55, 0.95]} style={styles.root}>
      <StatusBar style="dark" />

      <View style={[styles.coinArea, { marginTop: insets.top + s(118) }]}>
        {/* Rays burst after the coin flips */}
        {RAY_ANGLES.map((deg) => (
          <Animated.View
            key={deg}
            style={[
              styles.rayWrap,
              {
                opacity: rays,
                transform: [
                  { rotate: `${deg}deg` },
                  { translateY: rays.interpolate({ inputRange: [0, 1], outputRange: [-COIN * 0.45, -COIN * 0.72] }) },
                ],
              },
            ]}
          >
            <View style={styles.ray} />
          </Animated.View>
        ))}

        <Animated.View style={{ transform: [{ scale: enter.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) }], opacity: enter }}>
          <Animated.View style={[styles.face, { opacity: frontOpacity, transform: [{ perspective: 800 }, { rotateY: frontRotate }] }]}>
            <CoinFace size={COIN} variant="e" />
          </Animated.View>
          <Animated.View
            style={[styles.face, styles.faceBack, { opacity: backOpacity, transform: [{ perspective: 800 }, { rotateY: backRotate }] }]}
          >
            <CoinFace size={COIN} variant="check" />
          </Animated.View>
        </Animated.View>

        <Animated.View style={[styles.leaf, { opacity: leafOpacity }]}>
          <Leaf size={s(62)} />
        </Animated.View>
      </View>

      <Text style={styles.amount}>{formatRs(tx.amount, 2)}</Text>
      <Text style={styles.sentTo}>Successfully Sent to</Text>

      <View style={styles.logoCircle}>
        <EpLogo size={s(66)} />
      </View>
      <Text style={styles.name}>{tx.to.fullName}</Text>
      <Text style={styles.number}>{tx.to.mobile}</Text>

      <View style={[styles.actions, { bottom: Math.max(insets.bottom, s(30)) + s(84) }]}>
        <Pressable style={({ pressed }) => [styles.homeBtn, pressed && styles.pressed]} onPress={goHome}>
          <Text style={styles.homeText}>Back to home</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]} onPress={onShare} accessibilityLabel="Share">
          <ShareIcon size={s(40)} />
        </Pressable>
        <Pressable
          style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]}
          onPress={() => navigation.navigate('Receipt', { tx })}
          accessibilityLabel="Receipt"
        >
          <ReceiptIcon size={s(40)} />
        </Pressable>
      </View>

    </LinearGradient>
  )
}

const ShareIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="17.5" cy="5.5" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Circle cx="6" cy="12" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Circle cx="17.5" cy="18.5" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Path d="M8.4 10.7l6.7-3.9M8.4 13.3l6.7 3.9" stroke={colors.ink} strokeWidth={1.6} />
  </Svg>
)

const ReceiptIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 3h8.5L19 7.5V19a2 2 0 01-2 2H6a2 2 0 01-2-2V5a2 2 0 012-2z" stroke={colors.ink} strokeWidth={1.6} strokeLinejoin="round" />
    <Path d="M8 14.5h8M8 18h5" stroke={colors.ink} strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
)

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: 'center' },
  coinArea: { width: COIN, height: COIN, alignItems: 'center', justifyContent: 'center' },
  face: { width: COIN, height: COIN, backfaceVisibility: 'hidden' },
  faceBack: { position: 'absolute', top: 0, left: 0 },
  rayWrap: { position: 'absolute', width: s(8), height: s(44), alignItems: 'center' },
  ray: { width: s(7), height: s(40), borderRadius: s(4), backgroundColor: '#1CB956' },
  leaf: { position: 'absolute', left: -s(62), top: COIN * 0.48 },

  amount: { marginTop: s(180), fontSize: s(56), color: colors.ink, letterSpacing: -0.5, ...font.semibold },
  sentTo: { marginTop: s(10), fontSize: s(23), color: '#55555E' },
  logoCircle: {
    marginTop: s(72),
    width: s(114),
    height: s(114),
    borderRadius: s(57),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { marginTop: s(20), fontSize: s(32), color: colors.ink, ...font.medium },
  number: { marginTop: s(8), fontSize: s(28), color: colors.ink },

  actions: { position: 'absolute', left: s(46), right: s(46), flexDirection: 'row', alignItems: 'center', gap: s(38) },
  homeBtn: {
    flex: 1,
    height: s(82),
    borderRadius: s(41),
    borderWidth: s(3),
    borderColor: '#1DBE5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeText: { fontSize: s(23), color: colors.ink, ...font.medium },
  circleBtn: {
    width: s(82),
    height: s(82),
    borderRadius: s(41),
    borderWidth: s(3),
    borderColor: '#1DBE5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.6 },

})
