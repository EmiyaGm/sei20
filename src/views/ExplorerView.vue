<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'

const type = ref(0)

const changeType = (index: number) => {
  type.value = index
}

const tickName = ref('')

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
  <div class="explorerContent">
    <div class="title">The first sei-20 inscription</div>
    <div class="filterArea">
      <div class="typeSelect">
        <div
          class="typeItem"
          :class="type === 0 ? 'active' : ''"
          @click="changeType(0)"
        >
          All
        </div>
        <div
          class="typeItem"
          :class="type === 1 ? 'active' : ''"
          @click="changeType(1)"
        >
          In-Progress
        </div>
        <div
          class="typeItem"
          :class="type === 2 ? 'active' : ''"
          @click="changeType(2)"
        >
          Completed
        </div>
      </div>
      <div class="searchArea">
        <div>
          <el-input
            v-model="tickName"
            class="w-50 m-2"
            size="large"
            placeholder="Search Ticks"
            :suffix-icon="Search"
          />
        </div>
        <div class="deployButton">Deploy</div>
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

<style lang="scss" scoped>
.explorerContent {
  padding: 0px 100px;
  min-height: calc(100vh - 160px);
  .title {
    color: #fff;
    font-family: Space Grotesk;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 111%; /* 53.28px */
    text-transform: uppercase;
    padding-top: 90px;
    padding-bottom: 99px;
    text-align: center;
  }
  .filterArea {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 22px;
    .typeSelect {
      display: flex;
      align-items: center;
      justify-content: center;
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
    .searchArea {
      display: flex;
      align-items: center;
      justify-content: center;
      .deployButton {
        width: 124px;
        height: 48px;
        border-radius: 67px;
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
        margin-left: 16px;
        cursor: pointer;
      }
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
