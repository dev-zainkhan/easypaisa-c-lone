import { createContext, useContext, useState } from 'react'

const WalletContext = createContext(null)

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(25073.25)
  const [balanceHidden, setBalanceHidden] = useState(false)
  const [transactions, setTransactions] = useState([])

  const send = ({ to, amount, message }) => {
    const tx = {
      id: 'TID' + Math.floor(10000000000 + Math.random() * 89999999999),
      to,
      amount,
      fee: 0,
      message,
      date: new Date().toISOString(), // real device time, serializable for navigation params
    }
    setBalance((b) => +(b - amount).toFixed(2))
    setTransactions((list) => [tx, ...list])
    return tx
  }

  return (
    <WalletContext.Provider value={{ balance, balanceHidden, setBalanceHidden, transactions, send }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext(WalletContext)
