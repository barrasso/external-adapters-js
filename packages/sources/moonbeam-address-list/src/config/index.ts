export const customSettings = {
  RPC_URL: {
    type: 'string',
    description:
      'The RPC URL to connect to the Moonbeam chain the address manager contract is deployed to.',
    required: true,
  },
  CHAIN_ID: {
    type: 'number',
    description: 'The chain id to connect to',
    default: 1284,
  },
} as const
