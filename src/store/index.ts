import { createStore } from 'vuex'

import user from './modules/user'
import pool from './modules/pool'

export default createStore({
  modules: {
    user,
    pool
  }
})
