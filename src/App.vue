<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router'
import {
  Wallet,
  CopyDocument,
  Monitor,
  ArrowRight,
  HomeFilled,
  SwitchButton,
  Search,
  WalletFilled,
  CaretBottom,
  Menu,
  House,
  Document
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCosmWasmClient, getQueryClient } from '@sei-js/core'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import AudioLoading from './components/AudioLoading.vue'
import { NETWORK, REST_URL, RPC_URL } from './utils/config'
import BigNumber from 'bignumber.js'
import clipboard3 from 'vue-clipboard3'

const store = useStore()

const bgCanvas = ref(null)

const hideLoading = ref(false)

const activeName = ref('home')

const account = ref('')

const dialogAccountVisible = ref(false)

const dialogVisible = ref(false)

const router = useRouter()

watch(router.currentRoute, (newValue) => {
  activeName.value = newValue.name ? newValue.name.toString() : 'home'
})

const network = ref('atlantic-2')

const backHome = () => {
  router.push('/')
  activeName.value = 'home'
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
      type: 'warning',
    }).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/fin-wallet-for-sei/dbgnhckhnppddckangcjbkjnlddbjkna',
        '_blank',
      )
    })
  } else {
    if (window.fin.experimentalSuggestChain) {
      try {
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
    ElMessageBox.confirm(
      'Please install compass extension. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    ).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/compass-wallet-for-sei/anokgmphncpekkhclmingpimjmcooifb',
        '_blank',
      )
    })
  } else {
    if (window.compass.experimentalSuggestChain) {
      try {
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
    ElMessageBox.confirm(
      'Please install keplr extension. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    ).then(() => {
      window.open(
        'https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap',
        '_blank',
      )
    })
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
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
  document.body.style.setProperty(
    '--el-text-color-placeholder',
    'rgba(255, 255, 255, 0.8)',
  )
  document.body.style.setProperty('--el-color-primary', '#ff4011')
})

const isMobile = ref(false)

const result = window.matchMedia('only screen and (max-width: 575px)')
const cliWidth = document.documentElement.clientWidth
if (result.matches) {
  isMobile.value = true
  document.documentElement.style.fontSize = 100 * (cliWidth / 430) + 'px'
}
window.onresize = function () {
  const cliWidth = document.documentElement.clientWidth
  const result = window.matchMedia('only screen and (max-width: 575px)')
  if (result.matches) {
    document.documentElement.style.fontSize = 100 * (cliWidth / 430) + 'px'
    isMobile.value = true
  } else {
    isMobile.value = false
  }
}
</script>

<template>
  <div class="appDiv" :class="activeName === 'home' ? 'appDivBg' : ''">
    <div class="loading" v-if="!hideLoading">
      <AudioLoading style="height: 100%" />
    </div>
    <!-- <div class="topTip" v-if="account">You are on Sei testnet</div> -->
    <div class="header" v-if="!isMobile">
      <div class="front">
        <img
          src="./assets/images/logo.png"
          class="brand-logo"
          @click="backHome"
        />
        <div class="menu">
          <el-menu
            v-bind:default-active="activeName"
            class="el-menu-header"
            mode="horizontal"
            :ellipsis="false"
            active-text-color="#C5C5C5"
            text-color="#888888"
          >
            <div style="flex-grow: 1" />
            <el-menu-item
              index="explorer"
              @click="goTo('/explorer', 'explorer')"
              ><el-icon
                :style="activeName === 'explorer' ? 'color: #ff4011' : ''"
                ><Search /></el-icon
              >Explorer</el-menu-item
            >
            <!-- <el-menu-item index="Marketplace" @click="goTo('/mint', 'mint')"
              >Marketplace</el-menu-item
            > -->
            <el-menu-item>
              <div class="comingMenuItem">
                <div class="comingMenuItemName">Marketplace</div>
                <div class="comingMenuItemTip">Coming Soon</div>
              </div>
            </el-menu-item>
            <el-menu-item index="doc">
              <a
                target="_blank"
                href="https://sei-20.gitbook.io/sei-20/"
                style="text-decoration: none"
                >Doc</a
              >
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <el-dropdown v-if="account">
        <div class="account" style="outline: none">
          <div
            style="cursor: pointer; color: #f0f4f4; outline: none"
            class="accountText"
          >
            {{ account.substr(0, 5) }}...{{
              account.substr(account.length - 6, 6)
            }}
          </div>
          <el-icon><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="HomeFilled" @click="goTo('/my', 'My')"
              >My Assets</el-dropdown-item
            >
            <el-dropdown-item :icon="CopyDocument" @click="copy">
              Copy Address
            </el-dropdown-item>
            <el-dropdown-item :icon="SwitchButton" @click="disconnect"
              >Logout</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="connect" @click="openConnectWallet" v-if="!account">
        <el-icon style="color: rgba(255, 64, 17, 1)" class="connectIcon"
          ><WalletFilled
        /></el-icon>
        <div>Connect Wallet</div>
      </div>
    </div>
    <div class="headerMobile" v-else>
      <div>
        <img
          src="./assets/images/logo.png"
          class="brand-logo-mobile"
          @click="backHome"
        />
      </div>
      <div style="display: flex; align-items: center; justify-content: center">
        <div class="connectMobile" @click="openConnectWallet" v-if="!account">
          <el-icon style="color: rgba(255, 64, 17, 1)" class="connectIconMobile"
            ><WalletFilled
          /></el-icon>
        </div>
        <el-dropdown v-if="account">
          <div class="account" style="outline: none">
            <div
              style="cursor: pointer; color: #f0f4f4; outline: none"
              class="accountText"
            >
              {{ account.substr(0, 5) }}...{{
                account.substr(account.length - 6, 6)
              }}
            </div>
            <el-icon><CaretBottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="HomeFilled" @click="goTo('/my', 'My')"
                >My Assets</el-dropdown-item
              >
              <el-dropdown-item :icon="CopyDocument" @click="copy">
                Copy Address
              </el-dropdown-item>
              <el-dropdown-item :icon="SwitchButton" @click="disconnect"
                >Logout</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-dropdown>
          <div class="connectMobile">
            <el-icon style="color: #ffffff" class="connectIconMobile"
              ><Menu
            /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :icon="Search"
                @click="goTo('/explorer', 'explorer')"
                >Explorer</el-dropdown-item
              >
              <el-dropdown-item :icon="House"> Marketplace </el-dropdown-item>
              <el-dropdown-item :icon="Document"
                ><a
                  target="_blank"
                  href="https://sei-20.gitbook.io/sei-20/"
                  style="text-decoration: none;color: #ffffff"
                  >Doc</a
                ></el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <RouterView
      :hideLoading="hideLoading"
      :openConnectWallet="openConnectWallet"
      :isMobile="isMobile"
    />
    <div class="footer" v-if="!isMobile">
      <img
        src="./assets/images/background/footerBottom.png"
        class="footerBottom"
        v-if="activeName === 'home'"
      />
      <div class="footer-logo">© 2023 Sei20. All rights reserved.</div>
      <div>
        <div>
          <a
            href="https://twitter.com/Sei20_xyz"
            target="_blank"
            style="color: rgba(255, 255, 255, 0.9); text-decoration: none"
          >
            <img src="./assets/images/x.svg" class="xSvg" />
          </a>
        </div>
      </div>
    </div>
    <div class="footerMobile" v-else>
      <div class="footerMobileTwitter">
        <a
          href="https://twitter.com/Sei20_xyz"
          target="_blank"
          style="color: rgba(255, 255, 255, 0.9); text-decoration: none"
        >
          <img src="./assets/images/x.svg" class="xSvgMobile" />
        </a>
      </div>
      <div class="footer-logo">© 2023 Sei20. All rights reserved.</div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Choose"
      width="400"
      :append-to-body="true"
      class="connect-wallet-dialog"
    >
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
          {{ account.substr(0, 5) }}...{{
            account.substr(account.length - 6, 6)
          }}
        </div>
        <div class="copy-address">
          <div @click="copy" class="copy-icon">
            <el-icon><CopyDocument /></el-icon>
            Copy Address
          </div>
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
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
  overflow: auto;
}

.appDivBg {
  background: url('./assets/images/background/rightBottom.png') no-repeat;
  background-size: 722px 645px;
  background-position: right bottom;
}

.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  z-index: 10;
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
  margin: 0px 100px;
  padding: 19px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-family: Vegan Abattoir;
  pointer-events: fill;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.headerMobile {
  margin: 0px 24px;
  padding: 25px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-family: Vegan Abattoir;
  pointer-events: fill;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.connectMobile {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #f0f4f4;
  font-family: Space Grotesk;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  outline: none;
  margin-left: 16px;
}

.connect {
  width: 181.24px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #f0f4f4;
  font-family: Space Grotesk;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
}
.connectIcon {
  font-size: 18px;
  margin-right: 11px;
}

.connectIconMobile {
  font-size: 18px;
}

.account {
  width: 181.24px;
  height: 44px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f0f4f4;
  font-family: Space Grotesk;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  user-select: none;
}
.accountText {
  margin-right: 17px;
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
  width: 160.702px;
  height: 40px;
  cursor: pointer;
}

.brand-logo-mobile {
  width: 128.561px;
  height: 32px;
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

.logo-text {
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
  margin: 0px 100px;
  padding-top: 16px;
  padding-bottom: 25px;
  color: rgba(255, 255, 255, 0.9);
  font-family: Vegan Abattoir;
  display: flex;
  align-items: flex-start;
  pointer-events: fill;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}
.footerMobile {
  margin: 0px 24px;
  padding-top: 16px;
  padding-bottom: 25px;
  color: rgba(255, 255, 255, 0.9);
  font-family: Vegan Abattoir;
  display: flex;
  align-items: flex-start;
  pointer-events: fill;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  display: flex;
}
.footerMobileTwitter {
  position: absolute;
  left: 0px;
  top: -50px;
}

.xSvgMobile {
  width: 32px;
  height: 32px;
}

.footerBottom {
  position: absolute;
  bottom: 0px;
  left: 40%;
  width: 148px;
  height: 148px;
}

.footer-logo {
  color: #616161;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  font-family: Vegan Abattoir;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 3px;
}
.lp-menu-item-content {
  color: rgba(0, 0, 0, 0.4);
  font-family: Vegan Abattoir;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.lp-menu-item-icon {
  font-size: 7px;
}

.menu-pools-logo {
  width: 25px;
  height: 20px;
  margin-right: 10px;
}
.menu-my-pools-logo {
  width: 19.5px;
  height: 16px;
  margin-right: 13px;
}

.xSvg {
  width: 16px;
  height: 17px;
}
</style>
