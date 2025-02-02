import { HttpTransport } from '@chainlink/external-adapter-framework/transports'
import {
  buildBatchedRequestBody,
  constructEntry,
  BatchEndpointTypes,
  cryptoInputParams,
} from '../crypto-utils'
import { PriceEndpoint } from '@chainlink/external-adapter-framework/adapter'
import overrides from '../config/overrides.json'

export const httpTransport = new HttpTransport<BatchEndpointTypes>({
  prepareRequests: (params, config) => {
    return buildBatchedRequestBody(params, config)
  },
  parseResponse: (params, res) => {
    const entries = []
    for (const requestPayload of params) {
      const entry = constructEntry(requestPayload, res.data, 'VOLUME24HOURTO')
      if (entry) {
        entries.push(entry)
      }
    }
    return entries
  },
})

export const endpoint = new PriceEndpoint<BatchEndpointTypes>({
  name: 'volume',
  transport: httpTransport,
  inputParameters: cryptoInputParams,
  overrides: overrides.cryptocompare,
})
