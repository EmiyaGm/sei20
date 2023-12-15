interface PoolState {
    pairs: Array<any>
  }
  
  export default {
    namespaced: true,
    state(): PoolState {
      return {
        pairs: []
      }
    },
    mutations: {
      setPairs(state: PoolState, pairs: Array<any>) {
        state.pairs = pairs
      }
    },
    actions: {
      async setPairs({ commit }: { commit: any }, pairs: Array<any>) {
        commit('setPairs', pairs)
      }
    }
  }
  