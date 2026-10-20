import Svg, { Path, Circle, Ellipse, Rect, Defs, LinearGradient, Stop, Text as SvgText } from 'react-native-svg'

// Lightweight vector stand-ins for the app's 3D illustrations.
// Swap these for the official PNG/Lottie assets from the design team when available.

const GREEN = '#13B157'
const GREEN_DARK = '#0B8A41'
const GOLD = '#D9B36A'

export const EpLogo = ({ size = 40 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    <Path
      d="M24 7C14.6 7 8 11.8 8 18.5S14.6 29.5 24 29.5c5.2 0 9.4-1.2 12.3-3.4l-3.4-4.2c-2.1 1.3-5 2.1-8.9 2.1-4.8 0-8.4-1.5-9.4-3.8h23.6c.5-.6.8-1.3.8-2.2C39 11.5 32.7 7 24 7zm-8.9 9.3c1-2.4 4.5-4 8.9-4s7.9 1.6 8.9 4H15.1z"
      fill="#23222B"
    />
    <Path d="M9.5 30.5C11.5 37 17.4 41 24.6 41c5.6 0 10.4-2.2 13.4-5.8" stroke={GREEN} strokeWidth={6} strokeLinecap="round" fill="none" />
  </Svg>
)

export const Mascot = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Circle cx="32" cy="32" r="32" fill={GREEN} />
    <Path d="M24 14c-2-5-6-7-8-6M40 14c2-5 6-7 8-6" stroke="#2B2A35" strokeWidth={2} strokeLinecap="round" />
    <Ellipse cx="32" cy="36" rx="20" ry="18" fill="#FFD43B" />
    <Path d="M14 40c6 8 30 8 36 0v6c-6 8-30 8-36 0z" fill="#F59F00" />
    <Circle cx="24" cy="32" r="7" fill="#fff" />
    <Circle cx="40" cy="32" r="7" fill="#fff" />
    <Circle cx="25" cy="33" r="4" fill="#1D1D1F" />
    <Circle cx="39" cy="33" r="4" fill="#1D1D1F" />
    <Circle cx="26.5" cy="31.5" r="1.3" fill="#fff" />
    <Circle cx="40.5" cy="31.5" r="1.3" fill="#fff" />
  </Svg>
)

const Coin = ({ cx, cy, r = 10 }) => (
  <>
    <Ellipse cx={cx} cy={cy + 2} rx={r} ry={r * 0.95} fill="#B8893E" />
    <Ellipse cx={cx} cy={cy} rx={r} ry={r * 0.95} fill={GOLD} />
    <Ellipse cx={cx} cy={cy} rx={r * 0.72} ry={r * 0.68} fill={GREEN} />
    <SvgText x={cx} y={cy + r * 0.35} fill="#E8FFE9" fontSize={r} fontWeight="bold" textAnchor="middle">
      e
    </SvgText>
  </>
)

export const WalletCoins = ({ size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Defs>
      <LinearGradient id="wal" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#3DD47A" />
        <Stop offset="1" stopColor={GREEN_DARK} />
      </LinearGradient>
    </Defs>
    <Rect x="4" y="20" width="56" height="36" rx="9" fill="url(#wal)" />
    <Rect x="4" y="20" width="56" height="10" rx="5" fill="#ffffff" opacity={0.18} />
    <Coin cx={34} cy={14} r={9} />
    <Coin cx={26} cy={30} r={9} />
    <Coin cx={28} cy={47} r={9} />
  </Svg>
)

export const MoneyStack = ({ size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Defs>
      <LinearGradient id="note" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#8BE3A8" />
        <Stop offset="1" stopColor="#1FA055" />
      </LinearGradient>
    </Defs>
    {[0, 1, 2, 3].map((i) => (
      <Path
        key={i}
        d={`M6 ${36 - i * 4}l30-18 18 12-30 18z`}
        fill={i === 3 ? 'url(#note)' : i % 2 ? '#1E9B52' : '#E9E2C8'}
      />
    ))}
    <Ellipse cx="36" cy="27" rx="5" ry="3" fill="#ffffff" opacity={0.5} />
    <Circle cx="48" cy="44" r="11" fill="#B8893E" />
    <Circle cx="48" cy="42" r="11" fill={GOLD} />
    <Circle cx="48" cy="42" r="8" fill="#F2DDA9" />
    <Path d="M48 47v-9M44 41.5l4-4 4 4" stroke={GREEN} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
)

export const GreenCard = ({ size = 60 }) => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Defs>
      <LinearGradient id="card" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#43D07D" />
        <Stop offset="1" stopColor="#15934A" />
      </LinearGradient>
    </Defs>
    <Path d="M10 8c-6 6-6 14-2 18" stroke={GOLD} strokeWidth={4} strokeLinecap="round" fill="none" />
    <Path d="M6 22l3 5 4-4" stroke={GOLD} strokeWidth={3} strokeLinecap="round" fill="none" />
    <Path d="M8 22l44-12 8 30-44 12z" fill="url(#card)" />
    <Path d="M12 26l2 8" stroke="#C9F5D8" strokeWidth={2.5} strokeLinecap="round" />
    <SvgText x="36" y="38" fill="#E9FFF0" fontSize="18" fontWeight="bold" textAnchor="middle" transform="rotate(-15 36 32)">
      e
    </SvgText>
    <Path d="M54 56c6-6 6-14 2-18" stroke={GOLD} strokeWidth={4} strokeLinecap="round" fill="none" />
  </Svg>
)

// ---------- Hubs ----------

export const ShopArt = ({ size = 80 }) => (
  <Svg width={size} height={size * 0.75} viewBox="0 0 80 60">
    <Rect x="16" y="22" width="44" height="36" fill="#E9D6AE" />
    <Rect x="12" y="16" width="52" height="8" fill="#D8BF8C" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <Path key={i} d={`M${14 + i * 8} 24h8v4a4 4 0 01-8 0z`} fill={i % 2 ? '#fff' : GREEN} />
    ))}
    <Rect x="30" y="4" width="16" height="10" fill={GREEN} />
    <Rect x="22" y="34" width="14" height="14" fill="none" stroke="#B89A62" strokeWidth={2} />
    <Rect x="42" y="34" width="12" height="24" fill="none" stroke="#B89A62" strokeWidth={2} />
    <Path d="M2 40h14v18H2z" fill={GREEN} />
    <Path d="M5 40v-4a4 4 0 018 0v4" stroke="#0B8A41" strokeWidth={1.5} fill="none" />
    <Circle cx="68" cy="44" r="10" fill={GREEN} />
    <SvgText x="68" y="48" fill="#E8FFE9" fontSize="12" fontWeight="bold" textAnchor="middle">e</SvgText>
  </Svg>
)

export const UmbrellaArt = ({ size = 80 }) => (
  <Svg width={size} height={size * 0.75} viewBox="0 0 80 60">
    <Path d="M14 30C14 16 26 6 40 6s26 10 26 24c-4-3-9-3-13 0-4-3-9-3-13 0-4-3-9-3-13 0-4-3-9-3-13 0z" fill={GREEN} />
    <Path d="M27 30c0-14 6-22 13-24 7 2 13 10 13 24" fill="#E7C98E" />
    <Path d="M40 6v46a5 5 0 01-10 0" stroke={GREEN_DARK} strokeWidth={3} strokeLinecap="round" fill="none" />
    <Path d="M30 30h20v12c0 6-10 10-10 10s-10-4-10-10z" fill="#E7C98E" stroke="#C9A65E" strokeWidth={1.5} />
    <Path d="M34 41l4 4 8-8" stroke={GREEN} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
)

export const PhoneArt = ({ size = 80 }) => (
  <Svg width={size} height={size * 0.75} viewBox="0 0 80 60">
    <Path d="M24 14l18-6 14 46-18 6z" fill={GREEN} />
    <Path d="M26 15l14-4.6 12.6 41.4-14 4.6z" fill="#3DD47A" />
    <Rect x="46" y="20" width="16" height="22" rx="2" fill="#E9D6AE" transform="rotate(12 54 31)" />
    <Rect x="50" y="30" width="8" height="8" fill={GREEN} transform="rotate(12 54 34)" />
    <Path d="M40 4h16a3 3 0 013 3v8a3 3 0 01-3 3H46l-4 3v-3h-2a3 3 0 01-3-3V7a3 3 0 013-3z" fill={GREEN} />
    <Circle cx="60" cy="6" r="5" fill="#E9C46A" />
    <SvgText x="60" y="9" fill="#5C4400" fontSize="7" fontWeight="bold" textAnchor="middle">1</SvgText>
  </Svg>
)

export const HeadsetArt = ({ size = 80 }) => (
  <Svg width={size} height={size * 0.75} viewBox="0 0 80 60">
    <Path d="M18 36c0-16 10-28 22-28s22 12 22 28" stroke="#D9B36A" strokeWidth={7} fill="none" strokeLinecap="round" />
    <Rect x="10" y="32" width="14" height="22" rx="7" fill="#C99A4A" />
    <Rect x="56" y="32" width="14" height="22" rx="7" fill="#C99A4A" />
    <Rect x="13" y="36" width="8" height="14" rx="4" fill={GREEN} />
    <Rect x="59" y="36" width="8" height="14" rx="4" fill={GREEN} />
    <Path d="M17 50c0 6 10 8 20 8" stroke={GREEN_DARK} strokeWidth={2.5} fill="none" strokeLinecap="round" />
    <Rect x="36" y="55" width="10" height="5" rx="2.5" fill={GREEN} />
  </Svg>
)

// ---------- Transaction success coin ----------

export const CoinFace = ({ size = 220, variant = 'e' }) => (
  <Svg width={size} height={size} viewBox="0 0 100 100">
    <Defs>
      <LinearGradient id="coinRim" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#F6E2B8" />
        <Stop offset="0.55" stopColor="#E2B66A" />
        <Stop offset="1" stopColor="#C9933F" />
      </LinearGradient>
      <LinearGradient id="coinFace" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0" stopColor="#F4DCAA" />
        <Stop offset="0.6" stopColor="#E7C07C" />
        <Stop offset="1" stopColor="#D9A452" />
      </LinearGradient>
    </Defs>
    <Circle cx="51.5" cy="51" r="47" fill="#C48A35" />
    <Circle cx="50" cy="50" r="47" fill="url(#coinRim)" />
    <Circle cx="50" cy="50" r="42" fill="url(#coinFace)" />
    <Circle cx="50" cy="50" r="42" fill="none" stroke="#FFF3D6" strokeWidth={0.8} opacity={0.6} />
    {variant === 'e' ? (
      <>
        <Path
          d="M50 30c-11 0-18 5.6-18 13s7 12.5 18 12.5c6 0 10.8-1.4 14-3.9l-3.9-4.8c-2.4 1.5-5.7 2.4-10.1 2.4-5.5 0-9.6-1.7-10.7-4.3h26.9c.6-.7.9-1.5.9-2.5C67.1 35.1 60 30 50 30zm-10.1 10.6c1.1-2.7 5.1-4.6 10.1-4.6s9 1.9 10.1 4.6H39.9z"
          fill="#1E9E4E"
          transform="translate(1.2 1.2)"
        />
        <Path
          d="M50 30c-11 0-18 5.6-18 13s7 12.5 18 12.5c6 0 10.8-1.4 14-3.9l-3.9-4.8c-2.4 1.5-5.7 2.4-10.1 2.4-5.5 0-9.6-1.7-10.7-4.3h26.9c.6-.7.9-1.5.9-2.5C67.1 35.1 60 30 50 30zm-10.1 10.6c1.1-2.7 5.1-4.6 10.1-4.6s9 1.9 10.1 4.6H39.9z"
          fill="#33D46F"
        />
        <Path d="M34 58c2.3 7.4 9 12 17.2 12 6.4 0 11.8-2.5 15.2-6.6" stroke="#1E9E4E" strokeWidth={7.5} strokeLinecap="round" fill="none" transform="translate(1.2 1.2)" />
        <Path d="M34 58c2.3 7.4 9 12 17.2 12 6.4 0 11.8-2.5 15.2-6.6" stroke="#33D46F" strokeWidth={7} strokeLinecap="round" fill="none" />
      </>
    ) : (
      <>
        <Path d="M30 50l13 13 27-27" stroke="#0E7F3A" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(2 2.5)" />
        <Path d="M30 50l13 13 27-27" stroke="#22C55E" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <Path d="M33 49l10 10" stroke="#7CF0A8" strokeWidth={2.2} strokeLinecap="round" opacity={0.8} />
      </>
    )}
  </Svg>
)

export const Leaf = ({ size = 30 }) => (
  <Svg width={size} height={size * 0.6} viewBox="0 0 50 30">
    <Path d="M2 26C6 10 22 4 34 6c-4 12-16 20-32 20z" fill="#3BD16F" />
    <Path d="M2 26C14 18 24 12 34 6" stroke="#178C45" strokeWidth={1.4} fill="none" />
    <Path d="M34 6l14-4" stroke="#3BD16F" strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
)
