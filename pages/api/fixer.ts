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


const fixerRequest = () => {
  const myHeaders = new Headers()
  myHeaders.append('apikey', process.env.NEXT_PUBLIC_FIXER_IO as string)
  
  const requestOptions: RequestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const getCurrencySymbols = async (): Promise<CurrencySymbolsResponce> => {
    return await fetch('https://api.apilayer.com/fixer/symbols', requestOptions)
      .then(response => response.json())
      .then(data => data.symbols)
      .catch(error => console.log('error', error))
  }

  const getCurrencyConvert = async (from: string,  amount: string): Promise<CurrenceeConveerResponce> => {
    return await fetch(`https://api.apilayer.com/fixer/convert?to=${DEFAULT_CURRENCY}&from=${from}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(data => data.result.toFixed(1))
      .catch(error => console.log('error', error))
  }

  return {
    getCurrencySymbols,
    getCurrencyConvert
  }
}

export default fixerRequest
