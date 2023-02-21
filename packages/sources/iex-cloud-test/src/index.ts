import { expose, ServerInstance } from '@chainlink/external-adapter-framework'
import { PriceAdapter } from '@chainlink/external-adapter-framework/adapter'
import { customSettings } from './config'
import { crypto, eod, stock } from './endpoint'

export const adapter = new PriceAdapter({
  defaultEndpoint: crypto.name,
  name: 'IEX-CLOUD',
  customSettings,
  endpoints: [crypto, stock, eod],
  rateLimiting: {
    tiers: {
      individual: {
        rateLimit1h: 6944.44444444,
        note: 'only mentions monthly limit',
      },
      business: {
        rateLimit1h: 208333.333333,
        note: 'only mentions monthly limit',
      },
    },
  },
})

export const server = (): Promise<ServerInstance | undefined> => expose(adapter)
