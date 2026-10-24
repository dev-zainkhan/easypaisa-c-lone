import { useRef, useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, View } from 'react-native'
import { Text, TextInput } from '../components/AppText'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWallet } from '../context/WalletContext'
import { formatRs } from '../data/mock'
import { colors, font, s } from '../theme'
import { PrimaryButton, ScreenHeader } from '../components/UI'
import { Refresh } from '../components/Icons'
import { EpLogo } from '../components/Illustrations'

const MAX_DIGITS = 7

export default function EnterAmountScreen({ navigation, route }) {
  const { recipient } = route.params
  const insets = useSafeAreaInsets()
  const { balance } = useWallet()
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const amountRef = useRef(null)

  const value = Number(amount || 0)
  const amountFont = amount.length <= 4 ? s(112) : amount.length === 5 ? s(98) : amount.length === 6 ? s(86) : s(74)

  const onChange = (text) => {
    const digits = text.replace(/\D/g, '').replace(/^0+/, '').slice(0, MAX_DIGITS)
    setAmount(digits)
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScreenHeader
        title="Enter Amount"
        subtitle={
          <Text style={styles.payTo}>
            Pay To: <Text style={styles.payToName}>{recipient.name.split(' ')[0]}</Text>
          </Text>
        }
        titleRight={
          <View style={styles.logoCircle}>
            <EpLogo size={s(58)} />
          </View>
        }
      />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <View style={styles.body}>
          <Pressable style={styles.amountRow} onPress={() => amountRef.current?.focus()}>
            <Text style={styles.currency}>Rs.</Text>
            <TextInput
              ref={amountRef}
              autoFocus
              value={amount}
              onChangeText={onChange}
              keyboardType="number-pad"
              placeholder="0"
              placeholderTextColor={colors.disabled}
              selectionColor={colors.brandText}
              cursorColor={colors.brandText}
              style={[styles.amountInput, { fontSize: amountFont, lineHeight: amountFont * 1.15 }]}
            />
          </Pressable>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>My Balance: </Text>
            <Text style={styles.balanceValue}>{formatRs(balance, 2)}</Text>
            <Refresh size={s(28)} />
          </View>

          {showMessage ? (
            <TextInput
              autoFocus
              value={message}
              onChangeText={setMessage}
              maxLength={50}
              placeholder="Write a message (optional)"
              placeholderTextColor={colors.placeholder}
              style={styles.messageInput}
              returnKeyType="done"
              onSubmitEditing={() => amountRef.current?.focus()}
            />
          ) : (
            <Pressable style={styles.messagePill} onPress={() => setShowMessage(true)}>
              <Text style={styles.messagePillText}>+ Add a Message</Text>
            </Pressable>
          )}

          <View style={{ flex: 1 }} />
          <PrimaryButton
            title="Next"
            disabled={value <= 0}
            onPress={() => navigation.navigate('ConfirmTransaction', { recipient, amount: value, message: message.trim() })}
            style={{ marginBottom: Math.max(insets.bottom, s(22)) + s(22) }}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bgMint },
  payTo: { marginTop: s(10), fontSize: s(22), color: colors.muted },
  payToName: { color: colors.ink, ...font.semibold },
  logoCircle: {
    width: s(96),
    height: s(96),
    borderRadius: s(48),
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginTop: -s(10),
  },

  body: { flex: 1, alignItems: 'stretch', paddingTop: s(100) },
  amountRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' },
  currency: { fontSize: s(30), color: colors.ink, marginTop: s(20), ...font.medium },
  amountInput: {
    minWidth: s(70),
    padding: 0,
    color: colors.ink,
    letterSpacing: -2,
    includeFontPadding: false,
    ...font.bold,
  },

  balanceRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: s(70) },
  balanceLabel: { fontSize: s(22), color: colors.ink, ...font.medium },
  balanceValue: { fontSize: s(22), color: colors.brandText, marginRight: s(6), ...font.bold },

  messagePill: {
    alignSelf: 'center',
    marginTop: s(46),
    width: s(296),
    height: s(70),
    borderRadius: s(10),
    backgroundColor: colors.mintPill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagePillText: { fontSize: s(22), color: '#4A4A52', ...font.medium },
  messageInput: {
    alignSelf: 'center',
    marginTop: s(46),
    width: s(480),
    height: s(70),
    borderRadius: s(10),
    borderWidth: 1.5,
    borderColor: colors.brandText,
    backgroundColor: colors.white,
    paddingHorizontal: s(20),
    fontSize: s(22),
    color: colors.ink,
    textAlign: 'center',
  },
})
