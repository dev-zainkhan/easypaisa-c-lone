import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, font, s } from '../theme'
import { EpLogo } from './Illustrations'
import { BankIcon, CnicIcon, RaastIcon, WalletIcon } from './Icons'

const options = [
  { key: 'easypaisa', label: 'easypaisa', Icon: ({ size }) => <EpLogo size={size} /> },
  { key: 'bank', label: 'Bank', Icon: BankIcon },
  { key: 'wallet', label: 'Wallet', Icon: WalletIcon },
  { key: 'raast', label: 'Raast', Icon: RaastIcon },
  { key: 'cnic', label: 'CNIC', Icon: CnicIcon },
]

export default function SendMoneySheet({ visible, onClose, onSelect }) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Inner Pressable stops taps on the card from closing the sheet */}
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Send Money</Text>
          <View style={styles.grid}>
            {options.map(({ key, label, Icon }) => (
              <Pressable
                key={key}
                onPress={() => onSelect(key)}
                style={({ pressed }) => [styles.tile, pressed && { opacity: 0.7 }]}
              >
                <Icon size={s(58)} />
                <Text style={styles.label}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
    paddingHorizontal: s(27),
    paddingBottom: s(352),
  },
  card: {
    backgroundColor: colors.bg,
    borderRadius: s(36),
    paddingTop: s(38),
    paddingBottom: s(44),
    paddingHorizontal: s(45),
  },
  title: { textAlign: 'center', fontSize: s(30), color: colors.ink, marginBottom: s(38), ...font.medium },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: s(36) },
  tile: {
    width: s(277),
    height: s(166),
    borderRadius: s(14),
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(14),
  },
  label: { fontSize: s(24), color: colors.text },
})
