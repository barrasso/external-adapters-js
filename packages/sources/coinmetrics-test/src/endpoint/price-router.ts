import { wsTransport } from './price-ws'
import { priceInputParameters, VALID_QUOTES } from '../config'
import { SingleNumberResultResponse } from '@chainlink/external-adapter-framework/util'
import { PriceEndpoint } from '@chainlink/external-adapter-framework/adapter'
import { httpTransport } from './price'

export type MetricData = {
  asset: string
  time: string
  ReferenceRateUSD?: string
  ReferenceRateEUR?: string
  ReferenceRateETH?: string
  ReferenceRateBTC?: string
}

interface ResponseSchema {
  data: MetricData[]
  error?: {
    type: string
    message: string
  }
}

export type AssetMetricsRequestBody = {
  base: string
  quote: VALID_QUOTES
}

// Common endpoint type shared by the REST and WS transports
export type AssetMetricsEndpointTypes = {
  Response: SingleNumberResultResponse
  Request: {
    Params: AssetMetricsRequestBody
  }
  //TODO: currently setting this to typeof customSettings causes type errors in index.ts. Can be refactored after framework version update
  CustomSettings: any
  Provider: {
    RequestBody: never
    ResponseBody: ResponseSchema
  }
}

export const endpoint = new PriceEndpoint<AssetMetricsEndpointTypes>({
  name: 'price',
  transports: {
    ws: wsTransport,
    rest: httpTransport,
  },
  defaultTransport: 'rest',
  inputParameters: priceInputParameters,
})
