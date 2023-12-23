<script lang="ts" setup>
import {
  Refresh
} from '@element-plus/icons-vue'
import { ref } from 'vue'

const activeIndex = ref('Tokens')

const handleSelect = (key: string) => {
  activeIndex.value = key
}

const myTokens = ref([{}, {}, {}, {}])

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
</script>

<template>
  <div class="main">
    <div class="myContent">
      <div class="selectContent">
        <div class="selectMenu">
          <el-menu
            v-bind:default-active="activeIndex"
            mode="horizontal"
            class="el-menu-header"
            :ellipsis="false"
            active-text-color="#C5C5C5"
            text-color="#888888"
            @select="handleSelect"
          >
            <el-menu-item index="Tokens">Tokens</el-menu-item>
            <el-menu-item index="Transfers">Transfers</el-menu-item>
            <el-menu-item index="Mints">Mints</el-menu-item>
            <el-menu-item index="Deploys">Deploys</el-menu-item>
          </el-menu>
        </div>
        <div class="refreshButton">
          <el-icon><Refresh /></el-icon>
          Refresh
        </div>
      </div>
      <div v-if="activeIndex === 'Tokens'">
        <el-row :gutter="8">
          <el-col :span="6" v-for="(item, index) in myTokens" :key="index">
            <div class="tokenItem">
              <div class="tokenName">dino</div>
              <div class="tokenNumber">1,222,234</div>
              <div class="tokenMints">0 mints</div>
              <div class="divide"></div>
              <div class="tokenCode">#26179229</div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <div class="tokenButton">Transfer</div>
                <div class="tokenButton">List</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="activeIndex === 'Transfers'">
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
      <div v-if="activeIndex === 'Mints'">
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
      <div v-if="activeIndex === 'Deploys'">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.myContent {
  padding: 0px 100px;
  margin: 0 auto;
  .selectContent {
    padding-top: 34px;
    position: relative;
    display: flex;
    margin-bottom: 36px;
    .refreshButton {
      position: absolute;
      width: 113px;
      height: 32px;
      border-radius: 60px;
      border: 1.167px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #616161;
      text-align: center;
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      right: 0px;
      top: 50px;
      cursor: pointer;
    }
  }
  .tokenItem {
    min-height: 372px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 229, 243, 0.05);
    padding: 24px;
    .tokenName {
      color: #ff4011;
      text-align: center;
      font-family: Space Grotesk;
      font-size: 36px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }
    .tokenNumber {
      color: #fff;
      text-align: center;
      font-family: Space Grotesk;
      font-size: 32px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      margin-top: 37px;
      margin-bottom: 10px;
    }
    .tokenMints {
      color: #616161;
      text-align: center;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .divide {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin-top: 40px;
      margin-bottom: 36px;
    }
    .tokenCode {
      margin-bottom: 36px;
      color: #cecece;
      text-align: center;
      font-family: Inter;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
    .tokenButton {
      border-radius: 6px;
      border: 1px solid #ff4011;
      background: #ff4011;
      display: inline-flex;
      padding: 9px 28px 11px 27px;
      justify-content: center;
      align-items: center;
      color: #fff;
      text-align: center;
      font-family: Space Grotesk;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      cursor: pointer;
    }
  }

  .tableArea {
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(232, 229, 243, 0.05);
    padding: 0px 23px;
  }
  .paginationArea {
    margin-top: 16px;
  }
}
</style>
