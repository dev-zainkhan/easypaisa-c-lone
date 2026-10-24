# easypaisa – React Native UI Assessment

A pixel-faithful React Native (Expo) recreation of the easypaisa app's **Send Money → easypaisa Transfer** flow.
All data is mock data; no real accounts are accessed.

## Screens
| Screen | Details |
|---|---|
| Home | Fixed header, "Ask Ello" search, snapping product carousel (Account / Borrow / Card), 2-page services grid with pager dots, Stories, Hubs, bottom tab bar, hide/show balance |
| Send Money sheet | easypaisa · Bank · Wallet · Raast · CNIC |
| easypaisa Transfer | Send Money / History tabs, favourites, Mobile No. / Digital Account No. toggle, live search |
| Search | Matches favourites; for a full 11-digit number calls the **account-title lookup** (loading / found / not-found / error) |
| Enter Amount | Large amount input, live balance, optional message, Next enabled only for amount > 0 |
| Confirm Transaction | Pay From / Pay To (re-verifies title) / Payment Summary / Favourite toggle / Send Now with balance check |
| Success | Animated coin flip (e → ✓) with ray burst, amount, recipient, Back to home, Share, Receipt |
| Receipt | Full-screen receipt (ID, real date/time, funding source, sent to/by, charges, total, "Paid via easypaisa"); Share as image, Download to gallery |
| Profile drawer | Avatar → side drawer with account details, expandable My Account / More, version and language toggle |

## Engineering notes
- **Device-proportional sizing** – every dimension is measured from 720px reference screenshots and scaled with `s()` (`src/theme.js`), so layouts match on any screen width.
- **Account-title service** – `src/services/accountService.js`. Set `EXPO_PUBLIC_ACCOUNT_API_URL` to point at a real backend (`GET /accounts/title?msisdn=`); without it a mock with network latency is used. Numbers ending in `0000` demo the "no account" state.
- **Real date/time** – transactions are stamped with the device clock (`formatDateTime`).
- State lives in `WalletContext` (balance, hide balance, transaction history).
- Icons and illustrations are inline SVG (`react-native-svg`) — no binary assets.

## Get the APK (no local build)
Every push to `main` runs **GitHub Actions → Build Android APK** (`.github/workflows/android-apk.yml`):
it installs dependencies, generates the native Android project with `expo prebuild`, builds a release APK with Gradle,
and attaches `easypaisa-clone.apk` to a new GitHub **Release**. Download it on an Android phone and install
(allow "Install unknown apps"). You can also re-run it from the Actions tab → *Run workflow*.

## Run locally (optional)
```bash
npm install
npx expo start
```
