<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {
  getCosmWasmClient,
  getQueryClient,
  getSigningCosmWasmClient,
} from '@sei-js/core'
import { calculateFee } from '@cosmjs/stargate'
import { RPC_URL } from '../utils/config'

const props = defineProps<{
  openConnectWallet: Function
}>()

const store = useStore()

const address = computed(() => store.state.user.account)

const wallet = computed(() => store.state.user.wallet)

const canClick = ref(true)

const dialogMintResultVisible = ref(false)

const dialogMintResultLoadingVisible = ref(false)

const mintResult = reactive({
  result: 'loading',
  transaction: '',
})

const doMint = () => {
  if (canClick.value) {
    canClick.value = false
    testFunc()
  }
}

const errorTip = ref('')

const testFunc = async () => {
  let offlineSigner = null
  if (wallet.value === 'compass') {
    offlineSigner = window.compass.getOfflineSigner('atlantic-2')
  } else {
    offlineSigner = window.fin.getOfflineSigner('atlantic-2')
  }
  const msg = {
    data: {
      p: 'sei-20',
      op: 'mint',
      tick: 'seis',
      amt: '1000',
    },
  }
  const msg_base64 = btoa(JSON.stringify(msg))
  const fee = calculateFee(100000, '0.1usei')
  const signingCosmWasmClient = await getSigningCosmWasmClient(
    RPC_URL,
    offlineSigner,
  )
  const response = signingCosmWasmClient.sendTokens(
    address.value,
    address.value,
    [{ amount: '1', denom: 'usei' }],
    fee,
    msg_base64,
  )

  mintResult.result = 'loading'
  dialogMintResultLoadingVisible.value = true
  mintResult.transaction = ''
  response
    .then((res) => {
      mintResult.result = 'success'
      mintResult.transaction = res.transactionHash
      dialogMintResultLoadingVisible.value = false
      dialogMintResultVisible.value = true
      canClick.value = true
    })
    .catch((err) => {
      console.log(err)
      if (err.toString().indexOf('Transaction declined') !== -1) {
        mintResult.result = 'reject'
      } else if (err.toString().indexOf('Error when broadcasting tx') !== -1) {
        mintResult.result = 'error'
        const tx = err
          .toString()
          .match(/Error when broadcasting tx (\S*) at height/)[1]
        mintResult.transaction = tx
      } else if (typeof err === 'object' && Object.keys(err).length !== 0) {
        if (err.message) {
          if (err.message.indexOf('rejected the request') !== -1) {
            mintResult.result = 'reject'
          } else {
            mintResult.result = 'error'
            errorTip.value = err.message
          }
        } else {
          errorTip.value = 'Something wrong on'
          mintResult.result = 'error'
        }
      } else {
        mintResult.result = 'error'
      }
      dialogMintResultLoadingVisible.value = false
      dialogMintResultVisible.value = true
      canClick.value = true
    })
}

const connectWallet = () => {
  props.openConnectWallet()
}
</script>

<template>
  <div class="main">
    <div class="drawerContent">
      <div class="swapContent">
        <div v-if="address" class="swapButtonDiv">
          <div class="swapButton" @click="doMint">Mint</div>
        </div>
        <div v-else class="connectWallet" @click="connectWallet">
          <div style="display: flex; align-items: center">
            <div class="noAddressIcon">
              <el-icon><Wallet /></el-icon>
            </div>
            <div style="color: white">
              <div class="noAddressTipOne">Getting Started</div>
              <div class="noAddressTipTwo">
                Connect wallet to trade and explore more
              </div>
            </div>
          </div>
          <div class="noAddressArrow">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogMintResultLoadingVisible"
      width="1.94rem"
      :append-to-body="true"
      :close-on-click-modal="mintResult.result !== 'loading'"
      :close-on-press-escape="mintResult.result !== 'loading'"
      :show-close="false"
      class="swap-result-dialog"
    >
      <div style="color: black; font-weight: 700; text-align: center">
        <div class="resultLoadingDiv">
          <img
            src="../assets/images/loading.png"
            class="loading-animation resultLoadingImage"
          />
        </div>
        <div class="resultLoadingText">Minting</div>
        <div class="resultLoadingTip">Please sign in your wallet</div>
      </div>
    </el-dialog>
    <el-dialog
      v-model="dialogMintResultVisible"
      width="2.66rem"
      :append-to-body="true"
      :close-on-click-modal="mintResult.result !== 'loading'"
      :close-on-press-escape="mintResult.result !== 'loading'"
      :show-close="false"
      class="swap-result-dialog"
    >
      <div
        v-if="mintResult.result === 'success'"
        style="color: black; font-weight: 700; text-align: center"
      >
        <div>
          <div class="resultDiv">
            <img src="../assets/images/success.png" class="resultImage" />
          </div>
          <div class="resultText">Mint success</div>
          <div class="checkOn">
            Check on
            <a
              :href="`https://www.seiscan.app/atlantic-2/txs/${mintResult.transaction}`"
              target="_blank"
              >{{ mintResult.transaction }}</a
            >
          </div>
        </div>
      </div>
      <div
        v-else-if="mintResult.result === 'error'"
        style="color: black; font-weight: 700; text-align: center"
      >
        <div class="resultDiv">
          <img src="../assets/images/reject.svg" class="resultImageTwo" />
        </div>
        <div class="rejectTip">Request Rejected</div>
        <div class="checkOn">
          {{ errorTip }}
          <a
            :href="`https://www.seiscan.app/atlantic-2/txs/${mintResult.transaction}`"
            target="_blank"
            >{{ mintResult.transaction }}</a
          >
        </div>
        <div class="dissmissButton" @click="dialogMintResultVisible = false">
          Dismiss
        </div>
      </div>
      <div
        v-else-if="mintResult.result === 'reject'"
        style="color: black; font-weight: 700; text-align: center"
      >
        <div class="resultDiv">
          <img src="../assets/images/reject.svg" class="resultImageTwo" />
        </div>
        <div class="rejectTip">Request Rejected</div>
        <div class="resultLoadingTip">
          It seems like you denied the request on the wallet.
        </div>
        <div class="dissmissButton" @click="dialogMintResultVisible = false">
          Dismiss
        </div>
      </div>
      <div v-else style="color: black; font-weight: 700; text-align: center">
        <div class="resultDiv">
          <img
            src="../assets/images/loading.png"
            class="loading-animation resultImage"
          />
        </div>
        <div class="resultText">Minting...</div>
        <div class="resultTip">Please sign in your wallet</div>
        <!-- <div class="checkOn">30%-90% unused gas fees will be refunded automatically</div> -->
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.input-error {
  background: rgba(255, 106, 106, 0.2) !important;
}
.settingArea {
  padding: 32px 20px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0px 1px 20px 0px rgba(0, 0, 0, 0.13);
  backdrop-filter: blur(24px);
}
.settingAreaTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
}
.silppageTitle {
  color: #fff;
  font-size: 20px;
  display: flex;
  align-items: center;
}

.silppageContent {
  font-size: 14px;
}
.silppageIcon {
  width: 19.5px;
  height: 16px;
  margin-right: 15px;
}
.swapContentTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 18px;
}
.drawerContent {
  margin: 0 auto;
  width: 574px;
}

.el-icon--right {
  font-size: 14px;
}

.tab-area {
  display: flex;
  align-items: center;
  border-radius: 11px;
  border: 0.5px solid rgba(172, 206, 255, 0.6);
  padding: 0px 10px;
  justify-content: space-between;
}
.tab-item {
  width: 86px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s;
  color: #acceff;
  position: relative;
}

.tab-item:hover {
  background: rgba(255, 255, 255, 0.3);
}

.tab-item-input {
  height: 35px;
  width: 86px;
  background: transparent;
  outline: none;
  border-radius: 10px;
  color: black;
  border: none;
}

.tab-item-active {
  background: #e5edf9;
  color: black;
}

.tab-item-active > .tab-item-input {
  border: 0.5px solid rgba(172, 206, 255, 0.6);
}

.balanaButton {
  border: 1px solid #000;
  user-select: none;
  border-radius: 14px;
  backdrop-filter: blur(24px);
  font-size: 20px;
  font-weight: 600;
  height: 56px;
  width: 574px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  /* background: white; */
  color: #000;
}
.percentDiv {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>
