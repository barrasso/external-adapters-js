import { customSettings } from './config'
import { SingleNumberResultResponse } from '@chainlink/external-adapter-framework/util'
import { AdapterConfig } from '@chainlink/external-adapter-framework/config'

export const inputParameters = {
  base: {
    aliases: ['from', 'coin', 'asset', 'symbol'],
    description: 'The symbol to query',
    required: true,
    type: 'string',
  },
} as const

interface RequestParams {
  base: string
}

interface ResponseSchema {
  avgTotalVolume: number
  calculationPrice: string
  change: number
  changePercent: number
  close: number
  closeSource: string
  closeTime: number
  companyName: string
  currency: string
  delayedPrice: number
  delayedPriceTime: number
  extendedChange: number
  extendedChangePercent: number
  extendedPrice: number
  extendedPriceTime: number
  high: number
  highSource: string
  highTime: number
  iexAskPrice: number
  iexAskSize: number
  iexBidPrice: number
  iexBidSize: number
  iexClose: number
  iexCloseTime: number
  iexLastUpdated: number
  iexMarketPercent: number
  iexOpen: number
  iexOpenTime: number
  iexRealtimePrice: number
  iexRealtimeSize: number
  iexVolume: number
  lastTradeTime: number
  latestPrice: number
  latestSource: string
  latestTime: string
  latestUpdate: number
  latestVolume: number
  low: number
  lowSource: string
  lowTime: number
  marketCap: number
  oddLotDelayedPrice: number
  oddLotDelayedPriceTime: number
  open: number
  openTime: number
  openSource: string
  peRatio: number
  previousClose: number
  previousVolume: number
  primaryExchange: string
  symbol: string
  volume: number
  week52High: number
  week52Low: number
  ytdChange: number
  isUSMarketOpen: boolean
}

export type StockEndpointTypes = {
  Request: {
    Params: RequestParams
  }
  Response: SingleNumberResultResponse
  CustomSettings: typeof customSettings
  Provider: {
    RequestBody: never
    ResponseBody: ResponseSchema
  }
}

export const buildBatchedRequestBody = (
  params: RequestParams[],
  config: AdapterConfig<typeof customSettings>,
) => {
  return params.map((param) => {
    return {
      params,
      request: {
        url: `stock/${param.base.toUpperCase()}/quote`,
        baseURL: config.API_ENDPOINT,
        params: {
          token: config.API_KEY,
        },
      },
    }
  })
}

export const constructEntries = (
  res: ResponseSchema,
  params: RequestParams[],
  resultPath: keyof ResponseSchema,
) => {
  return params.map((param) => {
    const result = Number(res[resultPath])
    return {
      params: param,
      response: {
        data: {
          result: result,
        },
        result,
      },
    }
  })
}
