import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { WalletProvider } from './src/context/WalletContext'
import HomeScreen from './src/screens/HomeScreen'
import TransferScreen from './src/screens/TransferScreen'
import EnterAmountScreen from './src/screens/EnterAmountScreen'
import ConfirmTransactionScreen from './src/screens/ConfirmTransactionScreen'
import ReceiptScreen from './src/screens/ReceiptScreen'
import TransactionSuccessScreen from './src/screens/TransactionSuccessScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold })
  if (!fontsLoaded) return null

  return (
    <SafeAreaProvider>
      <WalletProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="EnterAmount" component={EnterAmountScreen} />
            <Stack.Screen name="ConfirmTransaction" component={ConfirmTransactionScreen} />
            <Stack.Screen
              name="TransactionSuccess"
              component={TransactionSuccessScreen}
              options={{ gestureEnabled: false, animation: 'fade' }}
            />
            <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ animation: 'slide_from_bottom' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </WalletProvider>
    </SafeAreaProvider>
  )
}
