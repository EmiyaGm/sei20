<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import { Wallet, CopyDocument, Monitor, ArrowRight } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCosmWasmClient, getQueryClient } from '@sei-js/core'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import AudioLoading from './components/AudioLoading.vue'
import { NETWORK, REST_URL, RPC_URL } from './utils/config'
import BigNumber from 'bignumber.js'
import clipboard3 from 'vue-clipboard3'

const store = useStore()

const bgCanvas = ref(null)

const hideLoading = ref(false)

const activeName = ref('mint')

const account = ref('')

const dialogAccountVisible = ref(false)

const dialogVisible = ref(false)

const router = useRouter()

const network = ref('atlantic-2')

const backHome = () => {
  router.push('/')
  activeName.value = 'mint'
}

const openAccountSetting = () => {
  dialogAccountVisible.value = true
}

const disconnect = () => {
  dialogAccountVisible.value = false
  account.value = ''
  store.dispatch('user/setAccount', '')
}

const openConnectWallet = () => {
  dialogVisible.value = true
}

const connectFinWallet = async () => {
  if (!window.fin || !window.fin.getOfflineSigner) {
    ElMessageBox.confirm('Please install fin extension. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna',
        '_blank'
      )
    })
  } else {
    if (window.fin.experimentalSuggestChain) {
      try {
        // await window.fin.experimentalSuggestChain({
        //   chainId: 'pacific-1',
        //   chainName: 'Sei Mainnet',
        //   addressPrefix: 'sei',
        //   rpcUrl: 'https://sei-rpc.polkachu.com/',
        //   httpUrl: 'https://sei-api.polkachu.com/',
        //   feeToken: 'usei',
        //   stakingToken: 'usei',
        //   coinMap: {
        //     usei: { denom: 'SEI', fractionalDigits: 6 }
        //   },
        //   gasPrice: 0.025,
        //   fees: {
        //     upload: 1500000,
        //     init: 500000,
        //     exec: 200000
        //   }
        // })

        await window.fin.enable(NETWORK)
        const offlineSigner = window.fin.getOfflineSigner(NETWORK)
        const accounts = await offlineSigner.getAccounts()
        if (Array.isArray(accounts) && accounts.length > 0) {
          account.value = accounts[0].address || ''
          store.dispatch('user/setAccount', accounts[0].address || '')
          store.dispatch('user/setWallet', 'fin')
          dialogVisible.value = false
        }
      } catch (e: any) {
        console.log(e)
        if (e && typeof e === 'object') {
          if (e.message) {
            ElMessage.error(e.message)
          }
        } else {
          ElMessage.error('Please create or login your fin account')
        }
      }
    } else {
      ElMessage.error('Please use the recent version of fin extension')
    }
  }
}

const connectCompassWallet = async () => {
  // Getting the market summary from the Sei dex module
  if (!window.compass || !window.compass.getOfflineSigner) {
    ElMessageBox.confirm('Please install compass extension. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb',
        '_blank'
      )
    })
  } else {
    if (window.compass.experimentalSuggestChain) {
      try {
        // await window.compass.experimentalSuggestChain({
        //   chainId: 'pacific-1',
        //   chainName: 'Sei Mainnet',
        //   addressPrefix: 'sei',
        //   rpcUrl: 'https://sei-rpc.polkachu.com/',
        //   httpUrl: 'https://sei-api.polkachu.com/',
        //   feeToken: 'usei',
        //   stakingToken: 'usei',
        //   coinMap: {
        //     usei: { denom: 'SEI', fractionalDigits: 6 }
        //   },
        //   gasPrice: 0.025,
        //   fees: {
        //     upload: 1500000,
        //     init: 500000,
        //     exec: 200000
        //   }
        // })

        await window.compass.enable(NETWORK)
        const offlineSigner = window.compass.getOfflineSigner(NETWORK)
        const accounts = await offlineSigner.getAccounts()
        if (Array.isArray(accounts) && accounts.length > 0) {
          account.value = accounts[0].address || ''
          store.dispatch('user/setAccount', accounts[0].address || '')
          store.dispatch('user/setWallet', 'compass')
          dialogVisible.value = false
        }
      } catch {
        ElMessage.error('Please create or login your compass account')
      }
    } else {
      ElMessage.error('Please use the recent version of compass extension')
    }
  }
}

const connectWallet = async () => {
  if (!window.getOfflineSigner || !window.keplr) {
    ElMessageBox.confirm('Please install keplr extension. Continue?', 'Warning', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap',
        '_blank'
      )
    })
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        // await window.keplr.experimentalSuggestChain({
        //   chainId: 'pacific-1',
        //   chainName: 'Sei Mainnet',
        //   addressPrefix: 'sei',
        //   rpcUrl: 'https://sei-rpc.polkachu.com/',
        //   httpUrl: 'https://sei-api.polkachu.com/',
        //   feeToken: 'usei',
        //   stakingToken: 'usei',
        //   coinMap: {
        //     usei: { denom: 'SEI', fractionalDigits: 6 }
        //   },
        //   gasPrice: 0.025,
        //   fees: {
        //     upload: 1500000,
        //     init: 500000,
        //     exec: 200000
        //   }
        // })

        await window.keplr.enable(NETWORK)
        const offlineSigner = window.getOfflineSigner(NETWORK)
        const accounts = await offlineSigner.getAccounts()
        if (Array.isArray(accounts) && accounts.length > 0) {
          account.value = accounts[0].address || ''
          store.dispatch('user/setAccount', accounts[0].address || '')
          dialogVisible.value = false
        }
      } catch {
        ElMessage.error('Failed to suggest the chain')
      }
    } else {
      ElMessage.error('Please use the recent version of keplr extension')
    }
  }
}

const goToFucent = () => {
  window.open('https://atlantic-2.app.sei.io/faucet', '_blank')
}

const { toClipboard } = clipboard3()

const copy = async () => {
  try {
    await toClipboard(account.value)
    ElMessage.success('Copied success')
  } catch (error) {
    ElMessage.error('Copied error')
  }
}

const goTo = (url: string, name: string) => {
  activeName.value = name
  router.push(url)
}

onMounted(() => {
  // const app = new Application(bgCanvas.value as unknown as HTMLCanvasElement)
  // setTimeout(() => {
  //   app.load('https://prod.spline.design/CqM7xfAE839sC9mD/scene.splinecode').then(() => {
  //     hideLoading.value = true
  //   })
  // }, 3000);
  setTimeout(() => {
    hideLoading.value = true
  }, 3000)
  document.body.style.setProperty('--el-menu-active-color', '#FFF')
  document.body.style.setProperty('--el-text-color-placeholder', 'rgba(255, 255, 255, 0.8)')
})

</script>

<template>
  <div class="appDiv">
    <div class="loading" v-if="!hideLoading">
      <AudioLoading style="height: 100%" />
    </div>
    <!-- <div class="topTip" v-if="account">You are on Sei testnet</div> -->
    <div class="header">
      <div class="front">
        <div class="logo-text">
          SEI-20
        </div>
        <!-- <img src="./assets/images/logo.svg" class="brand-logo" @click="backHome" /> -->
        <div class="menu">
          <el-menu
            :default-active="activeName"
            class="el-menu-header"
            mode="horizontal"
            :ellipsis="false"
            active-text-color="#FFC700"
            text-color="rgba(255, 255, 255, 0.9)"
          >
            <el-menu-item index="mint" @click="goTo('/mint', 'mint')">Mint</el-menu-item>
            <el-menu-item>
              <div class="comingMenuItem">
                <div class="comingMenuItemName">Holders</div>
                <div class="comingMenuItemTip">Coming Soon</div>
              </div>
            </el-menu-item>
            <el-menu-item>
              <div class="comingMenuItem">
                <div class="comingMenuItemName">Market</div>
                <div class="comingMenuItemTip">Coming Soon</div>
              </div>
            </el-menu-item>
            <el-menu-item>
              <div class="comingMenuItem">
                <div class="comingMenuItemName">Explorer</div>
                <div class="comingMenuItemTip">Coming Soon</div>
              </div>
            </el-menu-item>
            <el-menu-item>
              <div class="comingMenuItem">
                <div class="comingMenuItemName">Assets</div>
                <div class="comingMenuItemTip">Coming Soon</div>
              </div>
            </el-menu-item>
            <!-- <el-menu-item index="doc">
              <a target="_blank" href="https://sei-20.gitbook.io/sei-20/" style="text-decoration: none;">Doc</a>
            </el-menu-item> -->
          </el-menu>
        </div>
      </div>
      <!-- <div class="fucent" @click="goToFucent">Faucet</div> -->
      <!-- <div class="" style="width: 140px; margin-right: 10px;">
        <el-select v-model="network" class="m-2" placeholder="Select" size="large" effect="light">
          <el-option
            label="Sei testnet"
            value="atlantic-2"
          />
          <el-option
            label="Sei mainnet"
            value="pacific-1"
          />
        </el-select>
      </div> -->
      <div class="account" v-if="account">
        <el-icon><wallet /></el-icon>
        <div style="cursor: pointer" @click="openAccountSetting">
          {{ account.substr(0, 5) }}...{{ account.substr(account.length - 6, 6) }}
        </div>
      </div>
      <div class="connect" @click="openConnectWallet" v-if="!account">Connect</div>
    </div>
    <!-- <canvas ref="bgCanvas" class="bgCanvas"></canvas> -->
    <RouterView :hideLoading="hideLoading" :openConnectWallet="openConnectWallet" />
    <div class="footer">
      <div class="footer-logo">
        @ 2023 sei20.xyz
      </div>
      <!-- <div class="footer-resources">
        <div>
          <a
            target="_blank"
            style="color: rgba(255, 255, 255, 0.9); text-decoration: none"
            >Doc</a
          >
        </div>
      </div> -->
    </div>
    <el-dialog v-model="dialogVisible" title="Choose" width="400" :append-to-body="true" class="connect-wallet-dialog">
      <div>
        <div class="wallet-select-item" @click="connectCompassWallet">
          <img src="./assets/images/compass.jpg" class="wallet-image" />
          <div class="wallet-name">Compass</div>
        </div>
        <!-- <div class="wallet-select-item" @click="connectFinWallet">
          <img src="./assets/images/fin.jpg" class="wallet-image" />
          <div class="wallet-name">Fin</div>
        </div> -->
        <!-- <div class="wallet-select-item" @click="connectWallet">
          <img src="./assets/images/keplr.jpg" class="wallet-image" />
          <div class="wallet-name">Keplr</div>
        </div> -->
      </div>
    </el-dialog>
    <el-dialog
      v-model="dialogAccountVisible"
      width="3.41rem"
      :append-to-body="true"
      class="account-dialog"
    >
      <div style="text-align: center">
        <div class="">
          <img src="./assets/images/avatar.png" class="avatar-image" />
        </div>
        <div class="avatar-account">
          {{ account.substr(0, 5) }}...{{ account.substr(account.length - 6, 6) }}
        </div>
        <div class="copy-address">
          <div @click="copy" class="copy-icon">
            <el-icon><CopyDocument /></el-icon>
            Copy Address
          </div>
          <div style="display: flex; align-items: center; justify-content: center">
            <a
              :href="`https://www.seiscan.app/${NETWORK}/accounts/${account}/overview`"
              target="_blank"
              style="color: #00b2ff; text-decoration: none"
              ><el-icon><Monitor /></el-icon>View on Seican</a
            >
          </div>
        </div>
        <div>
          <div @click="disconnect" class="logout-button">Logout</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.appDiv {
  width: 100%;
  height: 100%;
  position: relative;
  /* background: url('./assets/images/background.svg') 100% 100% no-repeat; */
  overflow: auto;
}

.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 2;
}

.bgCanvas {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 1;
}

.header {
  padding: 20px 284px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-family: Outfit;
  pointer-events: fill;
  position: relative;
}

.connect {
  width: 159.13px;
  height: 40.457px;
  border-radius: 7px;
  background: #ffc700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  user-select: none;
}

.account {
  width: 183px;
  height: 39px;
  border-radius: 7px;
  background: #ffc700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  user-select: none;
}
.account {
  font-size: 14px;
}

.divide {
  width: 1px;
  height: 9px;
  background: white;
  margin-right: 32px;
  margin-left: 32px;
}

/** fit mobile */
.brand-logo {
  width: 89px;
  height: 37px;
  cursor: pointer;
}
.menu {
  display: none;
  position: absolute;
  top: 90px;
  left: 0;
}
.el-menu-header {
  flex-direction: column;
}

.slogan {
  display: none;
  position: absolute;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  line-height: 100%; /* 20px */
  transform: rotate(-90deg);
  right: 50px;
  top: calc(50vh - 80px);
}

.logo-text{
  font-size: 32px;
  font-weight: bold;
}

@media (min-width: 640px) {
  .front {
    display: flex;
    align-items: center;
    flex: 1;
  }
  .brand-logo {
    margin-right: 37.6px;
  }
  .menu {
    display: flex;
    position: static;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  .el-menu-header {
    flex-direction: row;
  }
  .mainTitle {
    font-size: 96px;
  }
  .mainTitle::after {
    font-size: 96px;
  }
  .typing {
    font-size: 48px;
  }
  .slogan {
    display: block;
  }
}

.wallet-select-item {
  margin: 20px;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(229, 239, 255, 0.38);
  cursor: pointer;
  user-select: none;
}

.wallet-image {
  width: 50px;
  height: 50px;
  border-radius: 4px;
}
.wallet-name {
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.footer {
  padding: 24px 60px;
  color: rgba(255, 255, 255, 0.9);
  font-family: Outfit;
  font-size: 20px;
  display: flex;
  align-items: flex-start;
  pointer-events: fill;
  border-top: 2px solid rgba(255, 255, 255, 0.4);
  justify-content: space-between;
}

.footer-logo {
  margin-right: 110px;
}

.footer-link {
  margin-right: 163px;
}

.footer-resources {
  margin-right: 163px;
}

.contact-icon {
  width: 24px;
  height: 24px;
  margin-right: 24px;
}

.fucent {
  display: inline-flex;
  padding: 8px 23px 12px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.3);
  margin-right: 23px;
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(24px);
  cursor: pointer;
  color: white;
  font-size: 16px;
  user-select: none;
}
.comingMenuItem {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: rgba(255, 255, 255, 0.4);
}
.comingMenuItemName {
  line-height: 20px;
}
.comingMenuItemTip {
  font-size: 12px;
  line-height: 14px;
}

.avatar-image {
  width: 88px;
  height: 88px;
}

.avatar-account {
  font-size: 38px;
  color: black;
}

.copy-address {
  color: #00b2ff;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 11px;
  margin-bottom: 25px;
}

.copy-icon {
  margin-right: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.logout-button {
  border-radius: 14px;
  border: 1px solid #000;
  display: flex;
  width: 211px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
.topTip {
  background: linear-gradient(90deg, #ffc700 0%, #00c2ff 48.96%, #001fff 100%);
  height: 14px;
  text-align: center;
  font-size: 12px;
  color: black;
  line-height: 14px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

/* .lp-menu-select {
  padding: 14px 28px;
} */

.lp-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  cursor: pointer;
  user-select: none;
}

.lp-menu-item-title {
  color: #000;
  font-family: Outfit;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 3px;
}
.lp-menu-item-content {
  color: rgba(0, 0, 0, 0.4);
  font-family: Outfit;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.lp-menu-item-icon{
  font-size: 7px;
}

.menu-pools-logo{
  width: 25px;
  height: 20px;
  margin-right: 10px;
}
.menu-my-pools-logo {
  width: 19.5px;
  height: 16px;
  margin-right: 13px;
}
</style>
