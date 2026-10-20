import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWallet } from '../context/WalletContext'
import { formatRs } from '../data/mock'
import { fetchAccountTitle } from '../services/accountService'
import { colors, font, s } from '../theme'
import { PrimaryButton, ScreenHeader } from '../components/UI'
import { Check, CheckCircle, ChevronDown } from '../components/Icons'
import { EpLogo, WalletCoins } from '../components/Illustrations'

const FEE = 0

export default function ConfirmTransactionScreen({ navigation, route }) {
  const { recipient, amount, message } = route.params
  const insets = useSafeAreaInsets()
  const { balance, send } = useWallet()
  const [favourite, setFavourite] = useState(false)
  const [title, setTitle] = useState({ status: 'loading', name: '' })

  // Always re-fetch the account title from the backend before money moves.
  useEffect(() => {
    fetchAccountTitle(recipient.mobile)
      .then((acc) => setTitle({ status: 'verified', name: acc.fullName }))
      .catch(() => setTitle({ status: 'failed', name: recipient.name }))
  }, [recipient])

  const total = amount + FEE

  const onSend = () => {
    if (total > balance) {
      Alert.alert('Insufficient Balance', `Your balance of ${formatRs(balance, 2)} is not enough for this transaction.`)
      return
    }
    const tx = send({ to: { ...recipient, fullName: title.name }, amount: total, message })
    navigation.replace('TransactionSuccess', { tx })
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScreenHeader title="Confirm Transaction" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.section}>Pay From</Text>
        <View style={[styles.card, styles.row, { paddingVertical: s(22) }]}>
          <WalletCoins size={s(56)} />
          <View style={{ flex: 1, marginLeft: s(18) }}>
            <Text style={styles.cardText}>Easypaisa Wallet</Text>
            <Text style={[styles.cardText, font.medium, { marginTop: s(8) }]}>Balance: {formatRs(balance, 2)}</Text>
          </View>
          <Pressable
            style={styles.row}
            hitSlop={8}
            onPress={() => Alert.alert('Pay From', 'Easypaisa Wallet is your only linked source of funds.')}
          >
            <Text style={styles.change}>Change</Text>
            <ChevronDown size={s(30)} color={colors.brandText} />
          </Pressable>
        </View>

        <Text style={styles.section}>Pay To</Text>
        <View style={[styles.card, styles.row, { paddingVertical: s(28) }]}>
          <View style={styles.logoCircle}>
            <EpLogo size={s(56)} />
          </View>
          <View style={{ flex: 1, marginLeft: s(22) }}>
            <Text style={styles.payToName}>{title.status === 'loading' ? 'Verifying account…' : title.name}</Text>
            <Text style={[styles.cardText, { fontSize: s(24), marginTop: s(8) }]}>{recipient.mobile}</Text>
          </View>
          {title.status === 'loading' && <ActivityIndicator color={colors.brandText} />}
          {title.status === 'verified' && <CheckCircle size={s(46)} />}
        </View>

        <Text style={styles.section}>Payment Summary</Text>
        <View style={[styles.card, { paddingVertical: s(26) }]}>
          <View style={styles.summaryRow}>
            <Text style={styles.cardText}>Transfer Amount</Text>
            <Text style={styles.cardText}>{formatRs(amount)}</Text>
          </View>
          <View style={[styles.summaryRow, { marginTop: s(30) }]}>
            <Text style={styles.cardText}>Fee (including tax)</Text>
            <Text style={styles.cardText}>{FEE ? formatRs(FEE) : 'Free'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.total}>Total Amount</Text>
            <Text style={styles.total}>{formatRs(total, 2)}</Text>
          </View>
        </View>

        <Pressable style={[styles.card, styles.row, { marginTop: s(30), paddingVertical: s(26) }]} onPress={() => setFavourite(!favourite)}>
          <View style={[styles.checkbox, favourite && styles.checkboxOn]}>{favourite && <Check size={s(24)} />}</View>
          <View style={{ flex: 1, marginLeft: s(28) }}>
            <Text style={[styles.cardText, font.medium]}>Favourite Contact</Text>
            <Text style={styles.favSub}>Favourite this recipient for quicker payments.</Text>
          </View>
        </Pressable>
      </ScrollView>

      <PrimaryButton
        title="Send Now"
        disabled={title.status === 'loading'}
        onPress={onSend}
        style={{ marginBottom: Math.max(insets.bottom, s(40)) + s(120) }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F6F6F7' },
  content: { paddingHorizontal: s(45), paddingBottom: s(40) },
  row: { flexDirection: 'row', alignItems: 'center' },
  section: { fontSize: s(22), color: colors.ink, marginTop: s(46), marginBottom: s(18), ...font.medium },
  card: {
    backgroundColor: colors.white,
    borderRadius: s(16),
    borderWidth: 1.2,
    borderColor: colors.border,
    paddingHorizontal: s(30),
  },
  cardText: { fontSize: s(22), color: colors.text },
  change: { fontSize: s(24), color: colors.brandText, marginRight: s(6), ...font.medium },
  logoCircle: {
    width: s(88),
    height: s(88),
    borderRadius: s(44),
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payToName: { fontSize: s(26), color: colors.ink, ...font.medium },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  divider: { height: 1.5, backgroundColor: '#D9D9DD', marginVertical: s(26) },
  total: { fontSize: s(31), color: colors.ink, ...font.semibold },
  checkbox: {
    width: s(32),
    height: s(32),
    borderRadius: s(3),
    borderWidth: 2,
    borderColor: colors.brandText,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: colors.brandText },
  favSub: { fontSize: s(20), color: colors.text, marginTop: s(8) },
})
