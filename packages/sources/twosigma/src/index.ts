import { expose, ServerInstance } from '@chainlink/external-adapter-framework'
import { PriceAdapter, PriceEndpoint } from '@chainlink/external-adapter-framework/adapter'
import { customSettings } from './config'
import { priceEndpoint } from './endpoint'

const makeAdapter = () => {
  // Factory method because the adapter loads configs from env vars at initialization
  // time, so this is useful in tests for example.
  return new PriceAdapter({
    name: 'TWOSIGMA',
    endpoints: [priceEndpoint as PriceEndpoint<any>],
    defaultEndpoint: priceEndpoint.name,
    customSettings,
  })
}

export const adapter = makeAdapter()

export const server = (): Promise<ServerInstance | undefined> => expose(makeAdapter())
