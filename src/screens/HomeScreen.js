import { useState } from 'react'
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '../components/AppText'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWallet } from '../context/WalletContext'
import { formatRs } from '../data/mock'
import { colors, font, s } from '../theme'
import BottomTabBar, { TAB_BAR_HEIGHT } from '../components/BottomTabBar'
import SendMoneySheet from '../components/SendMoneySheet'
import ProfileDrawer from '../components/ProfileDrawer'
import {
  Bell, BillIcon, ChevronDown, DonationIcon, EasycashIcon, EnterWinIcon, Eye, EyeOff, GameIcon,
  InsuranceIcon, LoadIcon, Logout, PlusCircle, QrIcon, SavingsIcon, SeeAllIcon, SendMoneyIcon,
  TermDepositIcon, TicketIcon,
} from '../components/Icons'
import { GreenCard, HeadsetArt, Mascot, MoneyStack, PhoneArt, ShopArt, UmbrellaArt, WalletCoins } from '../components/Illustrations'

const SCREEN_W = Dimensions.get('window').width

// ---- carousel geometry (from screenshots) ----
const CARD_W = s(466)
const CARD_GAP = s(20)
const SIDE = s(41)
const CAROUSEL_CARDS = 3
const maxOffset = SIDE * 2 + CARD_W * CAROUSEL_CARDS + CARD_GAP * (CAROUSEL_CARDS - 1) - SCREEN_W
const snapOffsets = Array.from({ length: CAROUSEL_CARDS }, (_, i) =>
  Math.min(Math.max(SIDE + i * (CARD_W + CARD_GAP) - (SCREEN_W - CARD_W) / 2, 0), maxOffset),
)

const servicePages = [
  [
    { key: 'send', label: 'Send Money', Icon: SendMoneyIcon },
    { key: 'bill', label: 'Bill Payment', Icon: BillIcon },
    { key: 'load', label: 'Loads & Packages', Icon: LoadIcon },
    { key: 'win', label: 'Enter and Win', Icon: EnterWinIcon },
    { key: 'easycash', label: 'Easycash', Icon: EasycashIcon },
    { key: 'deposit', label: 'Term Deposit', Icon: TermDepositIcon },
    { key: 'insurance', label: 'Insurance', Icon: InsuranceIcon },
    { key: 'game', label: 'Rs. 1 Game', Icon: GameIcon },
    { key: 'all', label: 'See All', Icon: SeeAllIcon },
  ],
  [
    { key: 'qr', label: 'Scan QR', Icon: QrIcon },
    { key: 'savings', label: 'Savings Pocket', Icon: SavingsIcon },
    { key: 'donation', label: 'Donations', Icon: DonationIcon },
    { key: 'tickets', label: 'Tickets', Icon: TicketIcon },
  ],
]

const stories = [
  { key: 's1', text: 'Rs. 50 cashback\non every ice cream', colors: ['#2BC46B', '#0B7A3B'] },
  { key: 's2', text: 'your zong package\ncomes with a cashback', colors: ['#0FA552', '#06703A'] },
  { key: 's3', text: 'mega week,\nnow for Rs. 50 less', colors: ['#12A957', '#056B36'] },
  { key: 's4', text: 'pay bills,\nwin prizes', colors: ['#1FB863', '#0A7C40'] },
]

const hubs = [
  { key: 'mini', title: 'Mini Apps', Art: ShopArt },
  { key: 'ins', title: 'Insurance', Art: UmbrellaArt },
  { key: 'load', title: 'Load & Packages', Art: PhoneArt },
  { key: 'help', title: 'Help Center', Art: HeadsetArt },
]

const comingSoon = (label) => Alert.alert(label, 'This flow is not part of the current assessment build.')

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets()
  const { balance, balanceHidden, setBalanceHidden } = useWallet()
  const [page, setPage] = useState(0)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const onService = (item) => (item.key === 'send' ? setSheetOpen(true) : comingSoon(item.label))

  const onSendOption = (key) => {
    setSheetOpen(false)
    if (key === 'easypaisa') navigation.navigate('Transfer')
    else comingSoon(`Send to ${key[0].toUpperCase() + key.slice(1)}`)
  }

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={{ height: insets.top, backgroundColor: sheetOpen ? '#17602F' : colors.brandStatus }} />

      {/* Header stays fixed while content scrolls under it */}
      <View style={styles.header}>
        <Pressable style={styles.avatar} onPress={() => setDrawerOpen(true)} accessibilityLabel="Open profile">
          <Text style={styles.avatarText}>A</Text>
        </Pressable>
        <Text style={styles.hey}>Hey There 👋</Text>
        <Pressable hitSlop={10} onPress={() => comingSoon('Notifications')} style={styles.headerIcon}>
          <Bell size={s(46)} />
        </Pressable>
        <Pressable hitSlop={10} onPress={() => comingSoon('Logout')} style={styles.headerIcon}>
          <Logout size={s(46)} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + insets.bottom + s(40) }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.search} onPress={() => comingSoon('Ello assistant')}>
          <Mascot size={s(60)} />
          <Text style={styles.searchText}>Search or Ask Ello</Text>
        </Pressable>

        {/* Product carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToOffsets={snapOffsets}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SIDE, gap: CARD_GAP }}
          style={{ marginTop: s(32) }}
        >
          <LinearGradient colors={['#B4F1C9', '#86DFAB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
            <View style={styles.cardTop}>
              <WalletCoins size={s(124)} />
              <Pressable style={styles.upgrade} onPress={() => comingSoon('Upgrade account')}>
                <Text style={styles.upgradeText}>Upgrade</Text>
              </Pressable>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>easypaisa Account</Text>
              <ChevronDown size={s(36)} color={colors.ink} />
            </View>
            <View style={{ marginTop: 'auto' }}>
              <View style={styles.row}>
                <Text style={styles.cardAmount}>{balanceHidden ? 'Rs. ••••' : formatRs(balance, 2)}</Text>
                <Pressable hitSlop={8} onPress={() => comingSoon('Add money')} style={{ marginLeft: s(20) }}>
                  <PlusCircle size={s(36)} />
                </Pressable>
              </View>
              <Pressable style={styles.row} onPress={() => setBalanceHidden(!balanceHidden)} hitSlop={8}>
                <Text style={styles.cardSub}>{balanceHidden ? 'Show Balance' : 'Hide Balance'}</Text>
                <View style={{ marginLeft: s(14) }}>
                  {balanceHidden ? <Eye size={s(32)} /> : <EyeOff size={s(32)} />}
                </View>
              </Pressable>
            </View>
          </LinearGradient>

          <PromoCard
            gradient={['#FBF0C0', '#E7D06A']}
            Art={MoneyStack}
            title="Borrow Money"
            headline="Get up to Rs. 50,000"
            sub="Instant loan with easycash"
          />
          <PromoCard
            gradient={['#DDFBE9', '#4DEA98']}
            Art={GreenCard}
            title="Debit & Credit Card"
            headline="Get your Card"
            sub="Tap to explore and apply"
          />
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: s(42) }]}>More with easypaisa</Text>

        {/* Services grid, 2 pages */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => setPage(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W))}
          style={{ marginTop: s(22) }}
        >
          {servicePages.map((items, i) => (
            <View key={i} style={styles.gridPage}>
              {items.map((item) => (
                <Pressable
                  key={item.key}
                  onPress={() => onService(item)}
                  style={({ pressed }) => [styles.tile, pressed && { opacity: 0.7 }]}
                >
                  <item.Icon size={s(62)} />
                  <Text style={styles.tileLabel} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.85}>
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={styles.dots}>
          {servicePages.map((_, i) => (
            <View key={i} style={[styles.dot, i === page && styles.dotActive]} />
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: s(36) }]}>Stories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SIDE, gap: s(20) }}
          style={{ marginTop: s(26) }}
        >
          {stories.map((st) => (
            <Pressable key={st.key} style={styles.storyRing} onPress={() => comingSoon('Stories')}>
              <LinearGradient colors={st.colors} style={styles.story}>
                <Text style={styles.storyText}>{st.text}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: s(44) }]}>Hubs</Text>
        <View style={styles.hubs}>
          {hubs.map(({ key, title, Art }) => (
            <Pressable key={key} style={styles.hub} onPress={() => comingSoon(title)}>
              <Text style={styles.hubTitle}>{title}</Text>
              <View style={styles.hubArtWrap}>
                <LinearGradient colors={['#F4FCF6', '#C9EFD6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.hubArtBg} />
                <View style={styles.hubArt}>
                  <Art size={s(180)} />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="home" />
      <SendMoneySheet visible={sheetOpen} onClose={() => setSheetOpen(false)} onSelect={onSendOption} />
      <ProfileDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(screen, params) => {
          setDrawerOpen(false)
          navigation.navigate(screen, params)
        }}
      />
    </View>
  )
}

function PromoCard({ gradient, Art, title, headline, sub }) {
  return (
    <Pressable onPress={() => comingSoon(title)}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Art size={s(124)} />
        <Text style={[styles.cardTitle, { marginTop: s(30) }]}>{title}</Text>
        <View style={{ marginTop: 'auto' }}>
          <Text style={styles.cardAmount} numberOfLines={1}>
            {headline}
          </Text>
          <Text style={styles.cardSub}>{sub}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  )
}

const GRID_GAP = s(14)
const TILE_W = Math.floor((SCREEN_W - SIDE * 2 - GRID_GAP * 2) / 3)

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: 'row', alignItems: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIDE,
    paddingTop: s(36),
    paddingBottom: s(38),
    backgroundColor: colors.bg,
  },
  avatar: {
    width: s(76),
    height: s(76),
    borderRadius: s(38),
    backgroundColor: '#CDEFD9',
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: s(32), color: colors.ink, ...font.semibold },
  hey: { flex: 1, marginLeft: s(16), fontSize: s(27), color: colors.ink, ...font.medium },
  headerIcon: { marginLeft: s(44) },

  search: {
    marginHorizontal: SIDE,
    height: s(80),
    borderRadius: s(40),
    borderWidth: 1.5,
    borderColor: '#D9D9DD',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(14),
  },
  searchText: { marginLeft: s(16), fontSize: s(26), color: colors.text },

  card: {
    width: CARD_W,
    height: s(436),
    borderRadius: s(32),
    paddingHorizontal: s(36),
    paddingTop: s(34),
    paddingBottom: s(34),
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: s(30) },
  upgrade: {
    marginTop: s(16),
    paddingHorizontal: s(24),
    height: s(44),
    borderRadius: s(22),
    backgroundColor: 'rgba(52, 128, 82, 0.45)',
    justifyContent: 'center',
  },
  upgradeText: { color: colors.white, fontSize: s(20), ...font.medium },
  cardTitle: { fontSize: s(28), color: colors.ink, marginRight: s(10), ...font.medium },
  cardAmount: { fontSize: s(42), color: colors.ink, letterSpacing: -0.4, ...font.bold },
  cardSub: { fontSize: s(24), color: '#55555E', marginTop: s(8) },

  sectionTitle: { marginHorizontal: SIDE, fontSize: s(28), color: colors.ink, ...font.medium },

  gridPage: {
    width: SCREEN_W,
    paddingHorizontal: SIDE,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
    rowGap: s(15),
  },
  tile: {
    width: TILE_W,
    height: s(154),
    borderRadius: s(12),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(14),
  },
  tileLabel: { fontSize: s(21), color: colors.text },

  dots: { flexDirection: 'row', justifyContent: 'center', gap: s(18), marginTop: s(38) },
  dot: { width: s(13), height: s(13), borderRadius: s(7), backgroundColor: '#D6D6DA' },
  dotActive: { backgroundColor: colors.brandText },

  storyRing: {
    width: s(186),
    height: s(186),
    borderRadius: s(93),
    borderWidth: s(6),
    borderColor: '#1DBE5E',
    padding: s(6),
    backgroundColor: colors.white,
  },
  story: { flex: 1, borderRadius: s(90), alignItems: 'center', justifyContent: 'center', padding: s(14) },
  storyText: { color: colors.white, fontSize: s(17), textAlign: 'center', ...font.medium },

  hubs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SIDE,
    justifyContent: 'space-between',
    rowGap: s(25),
    marginTop: s(24),
  },
  hub: {
    width: s(307),
    height: s(227),
    borderRadius: s(16),
    borderWidth: 1.2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: s(22),
  },
  hubTitle: { fontSize: s(26), color: colors.ink, ...font.medium },
  hubArtWrap: { flex: 1, justifyContent: 'flex-end' },
  hubArtBg: { height: s(82), borderRadius: s(12) },
  hubArt: { position: 'absolute', left: 0, right: 0, bottom: 0, alignItems: 'center' },
})
