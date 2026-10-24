import { useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Text, TextInput } from '../components/AppText'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWallet } from '../context/WalletContext'
import { favourites, formatDateTime, formatRs, initials } from '../data/mock'
import { AccountNotFoundError, fetchAccountTitle, isValidMobile } from '../services/accountService'
import { colors, font, s } from '../theme'
import { BackButton, ScreenHeader, SquareButton } from '../components/UI'
import { AccountCard, ChevronRight, Close, Search, User } from '../components/Icons'
import { EpLogo } from '../components/Illustrations'

export default function TransferScreen({ navigation, route }) {
  const insets = useSafeAreaInsets()
  const [tab, setTab] = useState(route.params?.tab ?? 'send') // 'send' | 'history'
  const [mode, setMode] = useState('mobile') // 'mobile' | 'digital'
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')
  const lookup = useAccountLookup(query)

  const openRecipient = (r) => {
    setSearching(false)
    setQuery('')
    navigation.navigate('EnterAmount', { recipient: r })
  }

  const exitSearch = () => {
    setSearching(false)
    setQuery('')
  }

  // ---------- search mode ----------
  if (searching) {
    const digits = query.replace(/\D/g, '')
    const matches = favourites.filter(
      (f) => query && (f.mobile.includes(digits || '#') || f.name.toLowerCase().includes(query.toLowerCase())),
    )
    const exactFav = matches.find((f) => f.mobile === digits)
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <ScreenHeader
          title="easypaisa Transfer"
          topRow={
            <View style={styles.searchTopRow}>
              <BackButton onPress={exitSearch} />
              <View style={styles.searchActive}>
                <Search size={s(36)} />
                <TextInput
                  autoFocus
                  value={query}
                  onChangeText={setQuery}
                  keyboardType={mode === 'mobile' ? 'phone-pad' : 'number-pad'}
                  maxLength={11}
                  placeholder={mode === 'mobile' ? 'Enter or Select Receiver Number' : 'Enter Digital Account No.'}
                  placeholderTextColor={colors.placeholder}
                  style={styles.searchActiveInput}
                  selectionColor={colors.ink}
                />
                {query.length > 0 && (
                  <Pressable hitSlop={10} onPress={() => setQuery('')}>
                    <Close size={s(30)} />
                  </Pressable>
                )}
              </View>
            </View>
          }
        />
        <ScrollView style={{ backgroundColor: '#F7F7F8' }} keyboardShouldPersistTaps="handled">
          {matches.map((f) => (
            <ResultRow key={f.id} name={f.name} mobile={f.mobile} onPress={() => openRecipient(f)} />
          ))}
          {isValidMobile(digits) && !exactFav && (
            <>
              {lookup.status === 'loading' && (
                <View style={styles.resultRow}>
                  <ActivityIndicator color={colors.brandText} />
                  <Text style={[styles.muted, { marginLeft: s(20) }]}>Fetching account title…</Text>
                </View>
              )}
              {lookup.status === 'found' && (
                <ResultRow
                  name={lookup.account.fullName}
                  mobile={digits}
                  onPress={() => openRecipient({ name: lookup.account.fullName, mobile: digits, fullName: lookup.account.fullName })}
                />
              )}
              {lookup.status === 'notfound' && (
                <Text style={styles.notice}>No easypaisa account is registered on {digits}.</Text>
              )}
              {lookup.status === 'error' && (
                <Text style={styles.notice}>Couldn't fetch account details. Check your connection and try again.</Text>
              )}
            </>
          )}
          {digits.length > 0 && digits.length < 11 && matches.length === 0 && (
            <Text style={styles.notice}>Enter the complete 11-digit number (03XXXXXXXXX).</Text>
          )}
        </ScrollView>
      </View>
    )
  }

  // ---------- default mode ----------
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScreenHeader
        title="easypaisa Transfer"
        topRight={
          <SquareButton accessibilityLabel="Help" onPress={() => Alert.alert('Help', 'Call 3737 or visit the Help Center.')}>
            <Text style={styles.help}>Help</Text>
          </SquareButton>
        }
      >
        <View style={styles.tabs}>
          {[
            { key: 'send', label: 'Send Money' },
            { key: 'history', label: 'History' },
          ].map((t) => (
            <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
              {tab === t.key && <View style={styles.tabUnderline} />}
            </Pressable>
          ))}
        </View>
      </ScreenHeader>

      {tab === 'send' ? (
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + s(40) }} keyboardShouldPersistTaps="handled">
          <View style={styles.favHeader}>
            <Text style={styles.favTitle}>My Easypaisa Favourites</Text>
            <Pressable hitSlop={8} onPress={() => setSearching(true)}>
              <Text style={styles.favTitle}>See All</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.favRow}>
            {favourites.map((f) => (
              <Pressable key={f.id} style={styles.fav} onPress={() => openRecipient(f)}>
                <View style={styles.favCircle}>
                  <Text style={styles.favInitials}>{initials(f.name)}</Text>
                </View>
                <Text style={styles.favName} numberOfLines={2}>
                  {f.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.segment}>
            {[
              { key: 'mobile', label: 'Mobile No.', Icon: User },
              { key: 'digital', label: 'Digital Account No.', Icon: AccountCard },
            ].map(({ key, label, Icon }) => (
              <Pressable
                key={key}
                onPress={() => setMode(key)}
                style={[styles.segmentItem, mode === key && styles.segmentItemActive]}
              >
                <Icon size={s(34)} />
                <Text style={styles.segmentText} numberOfLines={1}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.searchBox} onPress={() => setSearching(true)}>
            <Search size={s(40)} />
            <Text style={styles.searchPlaceholder}>
              {mode === 'mobile' ? 'Enter or Select Receiver Number' : 'Enter Digital Account No.'}
            </Text>
          </Pressable>
        </ScrollView>
      ) : (
        <HistoryList />
      )}
    </View>
  )
}

function ResultRow({ name, mobile, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.resultRow, pressed && { backgroundColor: '#EFEFF1' }]}>
      <View style={styles.resultAvatar}>
        <Text style={styles.resultInitial}>{name[0].toUpperCase()}</Text>
        <View style={styles.badge}>
          <EpLogo size={s(34)} />
        </View>
      </View>
      <View style={{ flex: 1, marginLeft: s(30) }}>
        <Text style={styles.resultName}>{name}</Text>
        <Text style={styles.resultNumber}>{mobile}</Text>
      </View>
      <ChevronRight size={s(40)} />
    </Pressable>
  )
}

function HistoryList() {
  const { transactions } = useWallet()
  if (!transactions.length) {
    return <Text style={[styles.notice, { textAlign: 'center' }]}>No easypaisa transfers yet.</Text>
  }
  return (
    <FlatList
      data={transactions}
      keyExtractor={(t) => t.id}
      contentContainerStyle={{ padding: s(36), gap: s(16) }}
      renderItem={({ item }) => (
        <View style={styles.historyItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.resultName}>{item.to.fullName}</Text>
            <Text style={styles.muted}>{item.to.mobile}</Text>
            <Text style={[styles.muted, { marginTop: s(6) }]}>{formatDateTime(item.date)}</Text>
          </View>
          <Text style={styles.historyAmount}>- {formatRs(item.amount)}</Text>
        </View>
      )}
    />
  )
}

// Debounced, cancellable account-title lookup for a full 11-digit number.
function useAccountLookup(query) {
  const digits = useMemo(() => query.replace(/\D/g, ''), [query])
  const [state, setState] = useState({ status: 'idle' })
  const lastDigits = useRef('')

  useEffect(() => {
    if (!isValidMobile(digits) || favourites.some((f) => f.mobile === digits)) {
      setState({ status: 'idle' })
      return
    }
    lastDigits.current = digits
    setState({ status: 'loading' })
    const controller = new AbortController()
    const timer = setTimeout(() => {
      fetchAccountTitle(digits, { signal: controller.signal })
        .then((account) => lastDigits.current === digits && setState({ status: 'found', account }))
        .catch((err) => {
          if (err.name === 'AbortError') return
          setState({ status: err instanceof AccountNotFoundError ? 'notfound' : 'error' })
        })
    }, 250)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [digits])

  return state
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  help: { fontSize: s(18), color: colors.ink, ...font.semibold },

  tabs: { flexDirection: 'row', marginHorizontal: -s(36), borderBottomWidth: 2, borderBottomColor: '#DCDCDF' },
  tab: { flex: 1, alignItems: 'center', paddingTop: s(4), paddingBottom: s(14) },
  tabText: { fontSize: s(24), color: colors.muted, ...font.medium },
  tabTextActive: { color: colors.ink },
  tabUnderline: { position: 'absolute', left: 0, right: 0, bottom: -2, height: 3, backgroundColor: colors.brandText },

  favHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: s(46),
    marginTop: s(50),
  },
  favTitle: { fontSize: s(22), color: colors.ink, ...font.semibold },
  favRow: { paddingHorizontal: s(14), marginTop: s(24) },
  fav: { width: s(154), alignItems: 'center' },
  favCircle: {
    width: s(96),
    height: s(96),
    borderRadius: s(48),
    backgroundColor: colors.white,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favInitials: { fontSize: s(28), color: colors.text },
  favName: { marginTop: s(14), fontSize: s(21), lineHeight: s(26), color: colors.text, textAlign: 'center' },

  segment: {
    flexDirection: 'row',
    marginHorizontal: s(46),
    marginTop: s(110),
    height: s(88),
    padding: s(6),
    borderRadius: s(14),
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  segmentItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(10),
    borderRadius: s(10),
  },
  segmentItemActive: { backgroundColor: colors.segmentActive },
  segmentText: { fontSize: s(24), color: colors.ink },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: s(46),
    marginTop: s(48),
    height: s(82),
    borderRadius: s(41),
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: s(20),
  },
  searchPlaceholder: { marginLeft: s(18), fontSize: s(24), color: colors.placeholder },

  searchTopRow: { flexDirection: 'row', alignItems: 'center', gap: s(26) },
  searchActive: {
    flex: 1,
    height: s(72),
    borderRadius: s(36),
    borderWidth: 1.6,
    borderColor: colors.brandText,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(20),
  },
  searchActiveInput: { flex: 1, marginLeft: s(10), fontSize: s(24), color: colors.ink, paddingVertical: 0 },

  resultRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: s(42), paddingVertical: s(40) },
  resultAvatar: {
    width: s(108),
    height: s(108),
    borderRadius: s(54),
    backgroundColor: colors.white,
    borderWidth: 1.2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultInitial: { fontSize: s(28), color: colors.ink, ...font.semibold },
  badge: {
    position: 'absolute',
    right: -s(4),
    bottom: -s(2),
    width: s(42),
    height: s(42),
    borderRadius: s(21),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultName: { fontSize: s(24), color: colors.ink, ...font.medium },
  resultNumber: { fontSize: s(24), color: colors.text, marginTop: s(6) },
  muted: { fontSize: s(21), color: colors.muted },
  notice: { fontSize: s(22), color: colors.muted, paddingHorizontal: s(42), paddingVertical: s(36) },

  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: s(14),
    borderWidth: 1,
    borderColor: colors.border,
    padding: s(26),
  },
  historyAmount: { fontSize: s(24), color: colors.danger, ...font.semibold },
})
