<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  openConnectWallet: Function
  isMobile: Boolean
}>()

const goTo = (url: string) => {
  router.push(url)
}

const result = ref({
  code: 0,
  data: {
    total_transaction: 323567,
    total_holders: 5432,
    total_ticks: 23,
    total_volumn: 1000000, // 第一期为0
  },
  message: '', // 如果code不为0会返回错误信息。
})
</script>

<template>
  <div class="main">
    <div class="homeContent" v-if="!isMobile">
      <el-row>
        <el-col class="leftPart" :span="6">
          <div class="dataItem">
            <div class="dataItemContent">{{ result.data.total_transaction }}</div>
            <div class="dataItemTitle">Total transactions</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">{{ result.data.total_holders }}</div>
            <div class="dataItemTitle">Total holders</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">{{ result.data.total_ticks }}</div>
            <div class="dataItemTitle">Total ticks</div>
          </div>
          <div class="dataItem">
            <div class="dataItemContent">{{ result.data.total_volumn }} MNT</div>
            <div class="dataItemTitle">Total volume</div>
          </div>
        </el-col>
        <el-col :span="18" class="rightPart">
          <div class="homeTitle">
            <div>The first sei-20 inscription</div>
            <img
              src="../assets/images/background/titleLogo.png"
              class="titleLogo"
            />
            <img
              src="../assets/images/background/rightTop.png"
              class="rightTop"
            />
          </div>
          <div class="homeDesc">
            Discover a platform where advanced blockchain capabilities meet
            unparalleled ease of use. Our SEI Inscription Protocol provides a
            seamless blend of smooth interaction and professional trading
            experience, enabling users to permanently record a wide array of
            information on the blockchain with unmatched simplicity and
            efficiency.
          </div>
          <img
            src="../assets/images/start.png"
            class="startButton"
            @click="goTo('/explorer')"
          />
        </el-col>
      </el-row>
    </div>
    <div class="homeCotentMobile" v-else>
      <div class="homeTitle">The first sei-20 inscription</div>
      <div class="homeDesc">
        Discover a platform where advanced blockchain capabilities meet
        unparalleled ease of use. Our SEI Inscription Protocol provides a
        seamless blend of smooth interaction and professional trading
        experience, enabling users to permanently record a wide array of
        information on the blockchain with unmatched simplicity and efficiency.
      </div>
      <div>
        <img
          src="../assets/images/start.png"
          class="startButton"
          @click="goTo('/explorer')"
        />
      </div>
      <el-row>
        <el-col :span="12">
          <div class="dataItem">
            <div class="dataItemContent">323567</div>
            <div class="dataItemTitle">Total transactions</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dataItem">
            <div class="dataItemContent">5,742</div>
            <div class="dataItemTitle">Total holders</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dataItem">
            <div class="dataItemContent">55</div>
            <div class="dataItemTitle">Total ticks</div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="dataItem">
            <div class="dataItemContent">485,381 MNT</div>
            <div class="dataItemTitle">Total volume</div>
          </div>
        </el-col>
      </el-row>
    </div>
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
    background: url('../assets/images/background/leftPartBg.png') 100% 100%
      no-repeat;
    background-position: right bottom;
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
      position: relative;
      .titleLogo {
        position: absolute;
        width: 60px;
        height: 60px;
        right: -60px;
        top: -5px;
      }
      .rightTop {
        position: absolute;
        right: -100px;
        top: -65px;
        width: 102px;
        height: 70px;
      }
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
      transition: 0.3s;
    }
    .startButton:hover {
      scale: 1.1;
    }
  }
}

.homeCotentMobile {
  padding: 0px 24px;
  .dataItem {
    margin-bottom: 64px;
    .dataItemTitle {
      color: rgba(255, 255, 255, 0.5);
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
  .homeTitle {
    color: #fff;
    font-family: Space Grotesk;
    font-size: 100px;
    font-style: normal;
    font-weight: 400;
    line-height: 111%; /* 111px */
    text-transform: uppercase;
    margin-bottom: 24px;
    position: relative;
    word-break: break-all;
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
    transition: 0.3s;
    margin-bottom: 49px;
  }
}
</style>
