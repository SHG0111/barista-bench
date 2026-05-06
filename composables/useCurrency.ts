const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SAR: 3.75,
  QAR: 3.64,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.38,
  JOD: 0.71,
  EGP: 49.50,
}

const symbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'د.إ',
  SAR: 'ر.س',
  QAR: 'ر.ق',
  KWD: 'د.ك',
  BHD: '.د.ب',
  OMR: 'ر.ع.',
  JOD: 'د.ا',
  EGP: 'ج.م',
}

const threeDecimal = ['BHD', 'JOD', 'KWD', 'OMR']

export const useCurrency = () => {
  const currency = useState<string>('selected-currency', () => 'EGP')

  function setCurrency(code: string) {
    if (rates[code] !== undefined) {
      currency.value = code
    }
  }

  function convert(usdAmount: number): number {
    return usdAmount * (rates[currency.value] || 1)
  }

  function formatPrice(usdAmount: number): string {
    const converted = convert(usdAmount)
    const symbol = symbols[currency.value] || 'ج.م'
    const decimals = threeDecimal.includes(currency.value) ? 3 : 2
    return `${symbol}${converted.toFixed(decimals)}`
  }

  function getSymbol(): string {
    return symbols[currency.value] || 'ج.م'
  }

  function getStripeAmount(usdAmount: number): number {
    const converted = convert(usdAmount)
    if (threeDecimal.includes(currency.value)) return Math.round(converted * 1000)
    return Math.round(converted * 100)
  }

  return { currency, setCurrency, convert, formatPrice, getSymbol, getStripeAmount, rates, symbols }
}
