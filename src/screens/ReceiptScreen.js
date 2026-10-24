import { useRef, useState } from 'react'
import { Alert, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Svg, { Circle, Path } from 'react-native-svg'
import { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import { Text } from '../components/AppText'
import { CoinFace } from '../components/Illustrations'
import { formatReceiptDate, formatRs, profile } from '../data/mock'
import { colors, font, s } from '../theme'

const WORDMARK = require('../../assets/ep-wordmark.png')

export default function ReceiptScreen({ navigation, route }) {
  const { tx } = route.params
  const insets = useSafeAreaInsets()
  const cardRef = useRef(null)
  const [busy, setBusy] = useState(false)

  // Renders the receipt card to a PNG (same as the real app's share/download).
  const snapshot = () =>
    captureRef(cardRef, { format: 'png', quality: 1, result: 'tmpfile', fileName: `easypaisa-receipt-${tx.id}` })

  const onShare = async () => {
    try {
      setBusy(true)
      const uri = await snapshot()
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Share receipt' })
    } catch (e) {
      Alert.alert('Share failed', e.message)
    } finally {
      setBusy(false)
    }
  }

  const onDownload = async () => {
    try {
      setBusy(true)
      const { granted } = await MediaLibrary.requestPermissionsAsync(true)
      if (!granted) return Alert.alert('Permission needed', 'Allow photo access to save the receipt.')
      const uri = await snapshot()
      await MediaLibrary.saveToLibraryAsync(uri)
      Alert.alert('Receipt saved', 'The receipt has been saved to your gallery.')
    } catch (e) {
      Alert.alert('Download failed', e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <LinearGradient colors={['#BFEBD3', '#E3F6EB', '#FFFFFF']} locations={[0, 0.35, 0.5]} style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingTop: insets.top - s(6), paddingBottom: s(220) }} showsVerticalScrollIndicator={false}>
        <View ref={cardRef} collapsable={false} style={styles.card}>
          <LinearGradient
            colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.85)', '#FFFFFF']}
            locations={[0, 0.4, 0.6]}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.coin}>
            <CoinFace size={s(148)} variant="check" />
          </View>
          <Text style={styles.title}>Transaction Successful</Text>
          <Text style={styles.subtitle}>You have sent money.</Text>

          <View style={[styles.divider, { marginTop: s(36) }]} />
          <Row label="Transaction ID" value={`#${tx.id}`} strong />
          <Row label="Date & Time" value={formatReceiptDate(tx.date)} />
          <Row label="Funding Source" value="easypaisa Account" />

          <View style={styles.divider} />
          <Text style={styles.section}>Sent to</Text>
          <Row label="Name" value={tx.to.fullName.toUpperCase()} />
          <Row label="Account Number" value={tx.to.mobile} />

          <View style={styles.divider} />
          <Text style={styles.section}>Sent by</Text>
          <Row label="Name" value={profile.name} />
          <Row label="Account Number" value={profile.mobile} />

          <View style={styles.divider} />
          <Text style={styles.section}>Charges</Text>
          <Row label="Amount" value={formatRs(tx.amount, 2)} />
          <Row label="Fee" value={formatRs(tx.fee || 0, 2)} />

          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatRs(tx.amount + (tx.fee || 0), 2)}</Text>
          </View>
          <View style={[styles.divider, { marginHorizontal: s(6), marginTop: s(20) }]} />

          <View style={styles.paidVia}>
            <Text style={styles.paidText}>Paid via</Text>
            <View>
              <Image source={WORDMARK} style={styles.wordmark} resizeMode="contain" />
              <Text style={styles.digitalBank}>digital bank</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.actions, { bottom: Math.max(insets.bottom, s(30)) + s(38) }]}>
        <Pressable style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Pressable disabled={busy} style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]} onPress={onShare} accessibilityLabel="Share receipt">
          <ShareIcon size={s(40)} />
        </Pressable>
        <Pressable disabled={busy} style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]} onPress={onDownload} accessibilityLabel="Download receipt">
          <DownloadIcon size={s(40)} />
        </Pressable>
      </View>
    </LinearGradient>
  )
}

function Row({ label, value, strong }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, strong && font.semibold]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  )
}

export const ShareIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="17.5" cy="5.5" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Circle cx="6" cy="12" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Circle cx="17.5" cy="18.5" r="2.7" stroke={colors.ink} strokeWidth={1.6} />
    <Path d="M8.4 10.7l6.7-3.9M8.4 13.3l6.7 3.9" stroke={colors.ink} strokeWidth={1.6} />
  </Svg>
)

const DownloadIcon = ({ size }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 3.5v11M7.5 10.5l4.5 4.5 4.5-4.5" stroke={colors.ink} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 19.5h14" stroke={colors.ink} strokeWidth={1.7} strokeLinecap="round" />
  </Svg>
)

const styles = StyleSheet.create({
  root: { flex: 1 },
  card: {
    marginHorizontal: s(28),
    borderTopLeftRadius: s(16),
    borderTopRightRadius: s(16),
    overflow: 'hidden',
    paddingHorizontal: s(28),
    paddingBottom: s(36),
  },
  coin: { alignSelf: 'center', marginTop: s(30) },
  title: { marginTop: s(20), textAlign: 'center', fontSize: s(36), color: colors.ink, ...font.semibold },
  subtitle: { marginTop: s(8), textAlign: 'center', fontSize: s(23), color: colors.text },
  divider: { height: 1.5, backgroundColor: '#DADADF', marginTop: s(12), marginBottom: s(12) },
  section: { fontSize: s(23), color: colors.ink, marginTop: s(13), marginBottom: s(12), ...font.semibold },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: s(53), gap: s(20) },
  rowLabel: { fontSize: s(23), color: colors.text },
  rowValue: { flexShrink: 1, textAlign: 'right', fontSize: s(23), color: colors.ink },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: s(14) },
  totalLabel: { fontSize: s(26), color: colors.ink, ...font.semibold },
  totalValue: { fontSize: s(32), color: colors.ink, ...font.semibold },
  paidVia: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: s(12), marginTop: s(24) },
  paidText: { fontSize: s(20), color: '#55555E' },
  wordmark: { width: s(128), height: s(28) },
  digitalBank: { position: 'absolute', right: 0, bottom: -s(16), fontSize: s(12), color: colors.ink },

  actions: { position: 'absolute', left: s(28), right: s(28), flexDirection: 'row', alignItems: 'center', gap: s(38) },
  backBtn: {
    flex: 1,
    height: s(82),
    borderRadius: s(41),
    borderWidth: s(3),
    borderColor: '#1DBE5E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  backText: { fontSize: s(23), color: colors.ink, ...font.medium },
  circleBtn: {
    width: s(82),
    height: s(82),
    borderRadius: s(41),
    borderWidth: s(3),
    borderColor: '#1DBE5E',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  pressed: { opacity: 0.6 },
})
