export const REST_URL = 'https://rest.atlantic-2.seinetwork.io/'
export const RPC_URL = 'https://rpc.atlantic-2.seinetwork.io/'
export const HTTP_URL = 'https://fvwlfvuz15.execute-api.ap-southeast-2.amazonaws.com'

export interface Token {
  decimals: number,
  name: string,
  symbol: string,
  contract: string,
  isNative: boolean,
  logo: string
}

