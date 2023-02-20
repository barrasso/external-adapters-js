import { RoutingTransport } from '@chainlink/external-adapter-framework/transports/meta'
import { wsTransport } from './price-ws'
import { customSettings, priceInputParameters, VALID_QUOTES } from '../config'
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
  transport: string
}

// Common endpoint type shared by the REST and WS transports
export type AssetMetricsEndpointTypes = {
  Response: SingleNumberResultResponse
  Request: {
    Params: AssetMetricsRequestBody
  }
  CustomSettings: typeof customSettings
  Provider: {
    RequestBody: never
    ResponseBody: ResponseSchema
  }
}

const transports = {
  ws: wsTransport,
  rest: httpTransport,
}

export const routingTransport = new RoutingTransport<AssetMetricsEndpointTypes>(transports, {
  defaultTransport: 'rest',
})

export const endpoint = new PriceEndpoint<AssetMetricsEndpointTypes>({
  name: 'price',
  transport: routingTransport,
  inputParameters: priceInputParameters,
})
