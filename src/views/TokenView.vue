<script lang="ts" setup>
import { Back } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const type = ref(0)

const router = useRouter()

const changeType = (index: number) => {
  type.value = index
}
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const currentPage = ref(0)

const handleSizeChange = () => {}

const handleCurrentChange = () => {}

const goBack = () => {
    router.go(-1)
}
</script>

<template>
  <div class="tokenContent">
    <div class="title">
      <div class="back" @click="goBack">
        <el-icon><Back /></el-icon>
      </div>
      <div class="token">dino</div>
      <div class="type">asc-20</div>
    </div>
    <div class="progress">
      <div></div>
      <div class="mintButton">Mint</div>
    </div>
    <div class="overview">
      <div class="overviewTitle">Overview</div>
      <div class="listItem">
        <div class="listItemTitle">Avascription ID</div>
        <div class="listItemContent">
          0xd2fe456a007c9f52be1dec34f639124f46930d7337d66e2203dfd60146eef72b
        </div>
      </div>
    </div>
    <div class="typeSelect">
      <div
        class="typeItem"
        :class="type === 0 ? 'active' : ''"
        @click="changeType(0)"
      >
        Holders
      </div>
      <div
        class="typeItem"
        :class="type === 1 ? 'active' : ''"
        @click="changeType(1)"
      >
        Transfers
      </div>
    </div>
    <div class="tableArea">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>
    <div class="paginationArea">
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tokenContent {
  padding: 0px 100px;
  min-height: calc(100vh - 160px);
  .title {
    display: flex;
    align-items: center;
    margin-top: 43px;
    .back {
      width: 40px;
      height: 28px;
      border-radius: 60px;
      border: 1.167px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      color: #616161;
      cursor: pointer;
    }
    .token {
      color: #ff4011;
      font-family: Space Grotesk;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-left: 14px;
      margin-right: 16px;
    }
    .type {
      width: 56px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #cecece;
      font-family: Inter;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
  }
  .progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 44px;
    .progressContent {
      flex: 1;
    }
    .mintButton {
      width: 124px;
      height: 48px;
      border-radius: 67px;
      border: 1.5px solid #ff4011;
      background: #ff4011;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      cursor: pointer;
    }
  }
  .overview {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 229, 243, 0.05);
    padding: 22px 24px;
    margin-bottom: 56px;
    .overviewTitle {
      color: #fff;
      font-family: Inter;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      padding-bottom: 21px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .listItem {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 21px 0px;
      .listItemTitle {
        color: #616161;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .listItemContent {
        color: #cecece;
        text-align: right;
        font-family: Inter;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }
  .typeSelect {
    display: flex;
    align-items: center;
    .typeItem {
      padding: 6px 20px;
      color: #616161;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 17px;
      border-radius: 66px;
      cursor: pointer;
    }
    .typeItem:hover {
      color: #888;
      background: #1c1c1c;
    }
    .active {
      background: #ff4011 !important;
      color: white !important;
    }
  }
  .tableArea {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 229, 243, 0.05);
    padding: 0px 23px;
    margin-top: 30px;
  }
  .paginationArea {
    margin-top: 16px;
  }
}
</style>
