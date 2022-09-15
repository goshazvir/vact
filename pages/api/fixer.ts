import { DEFAULT_CURRENCY } from '../../variables/constants'

type RequestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: Headers
}

type CurrencyConvert = {
  from: string,
  amount: number
}

type CurrencySymbolsResponce = {
  success: boolean,
  symbols: {
      [key: string]: string
  }
}

type CurrenceeConveerResponce = {
  success: boolean,
  result: number
}

const mockCurrencySymbols = {
  success: false,
  symbols: {}
}

const mockCurrencyConvert = {
  success: false,
  result: 0
}

const fixerRequest = () => {
  const myHeaders = new Headers()
  myHeaders.append('apikey', process.env.NEXT_PUBLIC_FIXER_IO as string)
  
  const requestOptions: RequestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const getCurrencySymbols = async (): Promise<CurrencySymbolsResponce> => {
   try {
      const responce = await fetch('https://api.apilayer.com/fixer/symbols', requestOptions)
      const json = await responce.json()

      return json.symbols
   } catch (error) {
    console.error('error', error)
    return mockCurrencySymbols
   }
  }

  const getCurrencyConvert = async (from: string,  amount: string): Promise<CurrenceeConveerResponce> => {
    try {
      const responce = await fetch(`https://api.apilayer.com/fixer/convert?to=${DEFAULT_CURRENCY}&from=${from}&amount=${amount}`, requestOptions)
      const json = await responce.json()

      return json.result.toFixed(1)
    } catch (error) {
      console.error('error', error)
      return mockCurrencyConvert
    }
  }

  return {
    getCurrencySymbols,
    getCurrencyConvert
  }
}

export default fixerRequest
