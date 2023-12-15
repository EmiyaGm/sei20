interface UserState {
  account: string,
  wallet: string
}

export default {
  namespaced: true,
  state(): UserState {
    return {
      account: '',
      wallet: ''
    }
  },
  mutations: {
    setAccount(state: UserState, account: string) {
      state.account = account
    },
    setWallet(state: UserState, wallet: string) {
      state.wallet = wallet
    }
  },
  actions: {
    async setAccount({ commit }: { commit: any }, account: string) {
      commit('setAccount', account)
    },
    async setWallet({ commit }: { commit: any }, wallet: string) {
      commit('setWallet', wallet)
    }
  }
}
