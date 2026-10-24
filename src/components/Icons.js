import Svg, { Path, Circle, Rect, Text as SvgText } from 'react-native-svg'

// Line icons redrawn to match the app: dark strokes with green accents.
const INK = '#2B2A35'
const GREEN = '#13B157'

const Icon = ({ size = 24, viewBox = '0 0 64 64', children }) => (
  <Svg width={size} height={size} viewBox={viewBox} fill="none">
    {children}
  </Svg>
)

const stroke = { stroke: INK, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }
const greenStroke = { ...stroke, stroke: GREEN }

// ---------- header / navigation ----------

export const ChevronLeft = ({ size = 24, color = INK }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const ChevronRight = ({ size = 24, color = INK }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M9 5l7 7-7 7" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const ChevronDown = ({ size = 24, color = INK, strokeWidth = 2 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M6 9l6 6 6-6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const Bell = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M6 17V11a6 6 0 1112 0v6l1.5 1.5h-15L6 17z" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
    <Path d="M10 21.2c.6.5 1.2.8 2 .8s1.4-.3 2-.8" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" />
  </Icon>
)

export const Logout = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M10 4H6a2 2 0 00-2 2v12a2 2 0 002 2h4" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
    <Path d="M10 12h11M17 8l4 4-4 4" stroke="#E5484D" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const Search = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Circle cx="11" cy="11" r="8" stroke={INK} strokeWidth={1.6} />
    <Path d="M17 18.5l1.6 1.6" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" />
  </Icon>
)

export const Close = ({ size = 24, color = INK }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M6 6l12 12M18 6L6 18" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Icon>
)

export const PlusCircle = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" stroke={INK} strokeWidth={1.6} />
    <Path d="M12 7.5v9M7.5 12h9" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
  </Icon>
)

export const EyeOff = ({ size = 24, color = '#4A4A52' }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke={color} strokeWidth={1.6} />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.6} />
    <Path d="M4 20L20 4" stroke={color} strokeWidth={1.6} strokeLinecap="round" />
  </Icon>
)

export const Eye = ({ size = 24, color = '#4A4A52' }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" stroke={color} strokeWidth={1.6} />
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.6} />
  </Icon>
)

export const Refresh = ({ size = 24, color = INK }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M20 11a8 8 0 00-14.3-4.5M4 13a8 8 0 0014.3 4.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M5 3v4h4M19 21v-4h-4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const User = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" stroke={INK} strokeWidth={1.5} />
    <Path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
  </Icon>
)

export const AccountCard = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Rect x="3" y="5" width="18" height="14" rx="2.5" stroke={INK} strokeWidth={1.5} />
    <Path d="M3 10h18M7 15h4" stroke={INK} strokeWidth={1.5} strokeLinecap="round" />
  </Icon>
)

export const CheckCircle = ({ size = 24 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M21 12a9 9 0 11-4.2-7.6" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
    <Path d="M8 12l3 3 9-9" stroke={GREEN} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const Check = ({ size = 24, color = '#fff' }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

// ---------- services grid ----------

export const SendMoneyIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M22 14l36 18-36 18 6-18-6-18z" {...stroke} />
    <Path d="M28 32h30" {...stroke} />
    <Path d="M6 26h10M10 32h10M6 38h10" {...greenStroke} />
  </Icon>
)

export const BillIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M18 8h26a6 6 0 016 6v6H40M18 8a6 6 0 00-6 6v40l6-4 6 4 6-4 6 4 6-4V14a6 6 0 00-6-6" {...stroke} />
    <Path d="M30 16l-6 10h8l-6 10" {...greenStroke} />
    <Path d="M20 44h10" {...greenStroke} />
  </Icon>
)

export const LoadIcon = ({ size }) => (
  <Icon size={size}>
    <Rect x="14" y="6" width="28" height="52" rx="5" {...stroke} />
    <Path d="M24 50h8" {...stroke} />
    <Path d="M38 18l10-5 10 5v11l-10 5-10-5V18z" {...greenStroke} fill="#fff" />
    <Path d="M38 18l10 5 10-5M48 23v11" {...greenStroke} />
  </Icon>
)

export const EnterWinIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M20 28l12 32 12-32" fill="#C98A3D" stroke="#7A4A1A" strokeWidth={2} strokeLinejoin="round" />
    <Path d="M24 34l14 10M40 34L26 44M22 30l18 16" stroke="#7A4A1A" strokeWidth={1.4} />
    <Path d="M16 28c0-10 7-18 16-18s16 8 16 18H16z" fill="#4A2416" />
    <Path d="M22 18c3-4 8-6 12-5" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" />
    <Circle cx="44" cy="12" r="4" fill="#FFC928" />
  </Icon>
)

export const EasycashIcon = ({ size }) => (
  <Icon size={size}>
    <Rect x="10" y="30" width="8" height="24" rx="2" {...stroke} />
    <Path d="M18 34h8l6-8a4 4 0 017 3l-3 7h14a4 4 0 010 8l-6 10H18" {...stroke} />
    <Rect x="32" y="6" width="18" height="26" rx="3" {...stroke} fill="#fff" />
    <Rect x="36" y="11" width="10" height="12" rx="1.5" {...greenStroke} />
    <Path d="M41 14v6" {...greenStroke} />
  </Icon>
)

export const TermDepositIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M18 16l6-8 6 4 6-4 6 8" {...stroke} />
    <Path d="M20 16h24c8 8 12 18 10 28-1 6-6 10-12 10H22c-6 0-11-4-12-10-2-10 2-20 10-28z" {...stroke} />
    <SvgText x="19" y="44" fill={INK} fontSize="13" fontWeight="bold">RS</SvgText>
    <Circle cx="52" cy="34" r="8" {...greenStroke} fill="#fff" />
    <Path d="M46 44h12M46 49h12" {...stroke} />
  </Icon>
)

export const InsuranceIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M6 30C6 18 18 8 32 8s26 10 26 22c-4-3-8-3-13 0-4-3-9-3-13 0-4-3-9-3-13 0-5-3-9-3-13 0z" {...greenStroke} />
    <Path d="M32 8v42a5 5 0 01-10 0" {...stroke} />
    <Path d="M19 30c0-10 5-20 13-22 8 2 13 12 13 22" {...stroke} />
  </Icon>
)

export const GameIcon = ({ size }) => (
  <Icon size={size}>
    <Circle cx="32" cy="36" r="22" fill="#fff" {...stroke} />
    <Circle cx="32" cy="36" r="17" fill={GREEN} />
    <SvgText x="32" y="41" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">RS</SvgText>
    <Path d="M14 4h34l-3 10H11z" fill="#FFC928" />
    <SvgText x="29" y="12.5" fill={INK} fontSize="9.5" fontWeight="bold" textAnchor="middle">Win</SvgText>
  </Icon>
)

export const SeeAllIcon = ({ size }) => (
  <Icon size={size}>
    {[12, 32, 52].map((y) =>
      [12, 32, 52].map((x) => <Circle key={`${x}-${y}`} cx={x} cy={y} r="5" {...stroke} />),
    )}
  </Icon>
)

// Page 2 of the services grid
export const QrIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M8 20V12a4 4 0 014-4h8M44 8h8a4 4 0 014 4v8M56 44v8a4 4 0 01-4 4h-8M20 56h-8a4 4 0 01-4-4v-8" {...stroke} />
    <Path d="M14 32h36" {...greenStroke} />
  </Icon>
)

export const SavingsIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M10 32c0-10 9-18 22-18 4 0 8 1 11 3l7-3-1 8c3 3 5 6 5 10h4v8h-5c-2 4-5 6-9 8v6h-8v-4h-8v4h-8v-7c-6-3-10-8-10-15z" {...stroke} />
    <Circle cx="42" cy="28" r="2" fill={INK} />
    <Path d="M26 22h10" {...greenStroke} />
  </Icon>
)

export const DonationIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M32 26c-3-6-14-6-14 2 0 7 14 14 14 14s14-7 14-14c0-8-11-8-14-2z" {...greenStroke} />
    <Path d="M6 46h10l10 6h18l14-8c2-1 2-5-2-5l-12 4H30" {...stroke} />
  </Icon>
)

export const TicketIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M8 18a4 4 0 014-4h40a4 4 0 014 4v6a6 6 0 000 16v6a4 4 0 01-4 4H12a4 4 0 01-4-4v-6a6 6 0 000-16v-6z" {...stroke} />
    <Path d="M38 16v32" {...greenStroke} strokeDasharray="4 4" />
  </Icon>
)

// ---------- Send Money sheet ----------

export const BankIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M8 22L32 10l24 12H8z" {...stroke} />
    <Circle cx="32" cy="17" r="2" fill={INK} />
    <Path d="M18 28v16M32 28v16M46 28v16" {...greenStroke} />
    <Path d="M8 50h48M6 56h52" {...stroke} />
  </Icon>
)

export const WalletIcon = ({ size }) => (
  <Icon size={size}>
    <Path d="M10 20a6 6 0 016-6h30l4-4v10" {...stroke} />
    <Rect x="10" y="18" width="44" height="34" rx="6" {...stroke} />
    <Path d="M54 30h-8a5 5 0 000 10h8" {...greenStroke} />
  </Icon>
)

export const RaastIcon = ({ size }) => (
  <Icon size={size}>
    <Rect x="10" y="6" width="44" height="6" fill="#1B5E3B" />
    <Rect x="14" y="12" width="36" height="5" fill="#2C7A4D" />
    <Rect x="8" y="17" width="48" height="4" fill="#1B5E3B" />
    <Rect x="10" y="21" width="44" height="26" fill="#2C7A4D" />
    {[14, 26, 38].map((x) => (
      <Rect key={x} x={x} y="26" width="8" height="21" fill="#fff" />
    ))}
    <Rect x="6" y="47" width="52" height="4" fill="#1B5E3B" />
    <Path d="M4 54c20 4 36 4 56-2" stroke="#1B5E3B" strokeWidth={1.5} />
  </Icon>
)

export const CnicIcon = ({ size }) => (
  <Icon size={size}>
    <Rect x="6" y="14" width="52" height="36" rx="3" {...stroke} />
    <Circle cx="22" cy="28" r="5" {...greenStroke} />
    <Path d="M13 42c1-5 5-7 9-7s8 2 9 7" {...greenStroke} />
    <Path d="M38 26h12M38 34h12" {...greenStroke} />
  </Icon>
)

// ---------- bottom tab bar ----------

export const TabHome = ({ size, active }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path
      d="M3.5 10.5L12 3l8.5 7.5V19a2 2 0 01-2 2h-13a2 2 0 01-2-2v-8.5z"
      fill={active ? GREEN : 'none'}
      stroke={active ? GREEN : INK}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
    <Path d="M12 15v3" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
  </Icon>
)

export const TabCards = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Rect x="5" y="3.5" width="16" height="11" rx="2" stroke={INK} strokeWidth={1.4} />
    <Rect x="3" y="7" width="16" height="12" rx="2" stroke={INK} strokeWidth={1.4} fill="#fff" />
    <Path d="M3 11h16M6 15.5h4" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
  </Icon>
)

export const TabPay = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M20 16v2a2 2 0 01-2 2h-2M8 20H6a2 2 0 01-2-2v-2" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
    <Rect x="7.5" y="7.5" width="9" height="9" rx="2.5" stroke={INK} strokeWidth={1.4} />
    <Path d="M6 12h12" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
  </Icon>
)

export const TabPromotions = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M8 4.5h8l3.5 6v8a2 2 0 01-2 2h-11a2 2 0 01-2-2v-8L8 4.5z" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
    <Path d="M9 2.5h6" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M12 10.5l1.2 2.4 2.6.4-1.9 1.8.5 2.6-2.4-1.3-2.4 1.3.5-2.6-1.9-1.8 2.6-.4z" stroke={INK} strokeWidth={1.2} strokeLinejoin="round" />
  </Icon>
)

export const TabZen = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M3 7l4.5 4L12 4l4.5 7L21 7l-2 11H5L3 7z" stroke={INK} strokeWidth={1.4} strokeLinejoin="round" />
    <Path d="M5 21h14" stroke={INK} strokeWidth={1.4} strokeLinecap="round" />
  </Icon>
)


// ---------- profile drawer ----------

export const ChevronUp = ({ size = 24, color = INK, strokeWidth = 1.8 }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M6 15l6-6 6 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const MenuUser = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="7" r="3.2" stroke={GREEN} strokeWidth={1.6} />
    <Path d="M4.5 20c.6-4 3.7-6.2 7.5-6.2s6.9 2.2 7.5 6.2" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
  </Icon>
)

export const MenuLink = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M10 14l4-4" stroke={GREEN} strokeWidth={1.6} strokeLinecap="round" />
    <Path d="M8.5 11.5l-2.8 2.8a3.4 3.4 0 004.8 4.8l2.8-2.8M15.5 12.5l2.8-2.8a3.4 3.4 0 00-4.8-4.8l-2.8 2.8" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
  </Icon>
)

export const MenuApprovals = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path d="M20.5 12a8.5 8.5 0 11-4-7.2" stroke={INK} strokeWidth={1.6} strokeLinecap="round" />
    <Path d="M8 12l3 3 7.5-7.5" stroke={GREEN} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
)

export const MenuGear = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Path
      d="M10.3 2.8h3.4l.5 2.4 1.6.9 2.3-.8 1.7 2.9-1.8 1.6v1.9l1.8 1.6-1.7 2.9-2.3-.8-1.6.9-.5 2.4h-3.4l-.5-2.4-1.6-.9-2.3.8-1.7-2.9 1.8-1.6v-1.9L4.2 8.2l1.7-2.9 2.3.8 1.6-.9z"
      stroke={INK}
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <Circle cx="12" cy="12" r="3" stroke={GREEN} strokeWidth={1.6} />
  </Icon>
)

export const MenuMore = ({ size }) => (
  <Icon size={size} viewBox="0 0 24 24">
    <Circle cx="7" cy="7" r="3.3" stroke={INK} strokeWidth={1.5} />
    <Circle cx="17" cy="7" r="3.3" stroke={INK} strokeWidth={1.5} />
    <Circle cx="7" cy="17" r="3.3" stroke={INK} strokeWidth={1.5} />
    <Circle cx="17" cy="17" r="3.3" stroke={GREEN} strokeWidth={1.5} />
  </Icon>
)
