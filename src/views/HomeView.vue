<script setup lang="ts">
import LineCombination from '../components/LineCombination.vue'
import WaveFont from '@/components/WaveFont.vue'
import TextAnimation from '@/components/TextAnimation.vue'
import BirdButton from '@/components/BirdButton.vue'
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import {
  getCosmWasmClient,
  getQueryClient,
  getSigningCosmWasmClient,
} from '@sei-js/core'
import { calculateFee } from '@cosmjs/stargate'
import { NETWORK, RPC_URL } from '../utils/config'
import { event } from 'vue-gtag'

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
    offlineSigner = window.compass.getOfflineSigner(NETWORK)
  } else {
    offlineSigner = window.fin.getOfflineSigner(NETWORK)
  }
  const msg = {
    p: 'sei-20',
    op: 'mint',
    tick: 'seis',
    amt: '1000',
  }
  const msg_base64 = btoa(`data:,${JSON.stringify(msg)}`)
  const fee = calculateFee(100000, '0.1usei')
  const signingCosmWasmClient = await getSigningCosmWasmClient(
    RPC_URL,
    offlineSigner,
  )
  event('mint')
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
    <div class="homeContent">
      <el-row>
        <el-col :span="6" class="leftPart">
          <div class="dataItem">
            <div class="dataItemContent">323567</div>
            <div class="dataItemTitle">Total transactions</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">5,742</div>
            <div class="dataItemTitle">Total holders</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">55</div>
            <div class="dataItemTitle">Total ticks</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">485,381 MNT</div>
            <div class="dataItemTitle">Total volume</div>
          </div>
        </el-col>
        <el-col :span="18" class="rightPart">
          <div class="homeTitle">The first sei-20 inscription</div>
          <div class="homeDesc">
            Discover a platform where advanced blockchain capabilities meet
            unparalleled ease of use. Our SEI Inscription Protocol provides a
            seamless blend of smooth interaction and professional trading
            experience, enabling users to permanently record a wide array of
            information on the blockchain with unmatched simplicity and
            efficiency.
          </div>
          <img src="../assets/images/start.png" class="startButton" />
        </el-col>
      </el-row>
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
              :href="`https://www.seiscan.app/${NETWORK}/txs/${mintResult.transaction}`"
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
            :href="`https://www.seiscan.app/${NETWORK}/txs/${mintResult.transaction}`"
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

<style scoped lang="scss">
.homeContent {
  margin: 0 auto;
  padding: 0px 100px;
  .leftPart {
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    min-height: calc(100vh - 160px);
    padding: 54px 0px 0px 8.72px;
    .dataItem {
      margin-bottom: 64px;
      .dataItemTitle {
        color: #616161;
        font-family: Space Grotesk;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
      .dataItemContent {
        color: #fff;
        font-family: Space Grotesk;
        font-size: 30px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  .rightPart {
    min-height: calc(100vh - 160px);
    padding: 38px 0px 0px 67px;
    .homeTitle {
      color: #fff;
      font-family: Space Grotesk;
      font-size: 100px;
      font-style: normal;
      font-weight: 400;
      line-height: 111%; /* 111px */
      text-transform: uppercase;
      margin-bottom: 24px;
    }
    .homeDesc {
      color: #fff;
      font-family: Space Grotesk;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 40px;
    }
    .startButton {
      width: 240px;
      height: 67px;
      border-radius: 66px;
      cursor: pointer;
      transition: .3s;
    }
    .startButton:hover {
        scale: 1.1;
    }
  }
}
</style>
