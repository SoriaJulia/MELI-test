import currencies, { ARS } from './constants/currencies'

export function formatPrice(currency = ARS, amount) {
  if (!amount) return
  return `${currencies[currency]}  ${amount.toLocaleString('es')}`
}
