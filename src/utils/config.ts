export const REST_URL = 'https://sei-api.polkachu.com/'
export const RPC_URL = 'https://sei-rpc.polkachu.com/'
export const NETWORK = 'pacific-1'

export interface Token {
  decimals: number,
  name: string,
  symbol: string,
  contract: string,
  isNative: boolean,
  logo: string
}

