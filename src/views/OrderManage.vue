<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="orderno"
          label="订单编码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="productid"
          label="产品编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="ordernum"
          label="订购数量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="deaddate"
          label="交付日期"
          width="300">
      </el-table-column>
      <el-table-column
          prop="deliverDate"
          label="投标截止日期"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderStatus"
          label="订单状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="userid"
          label="用户编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="factoryid"
          label="中标工厂"
          width="120">
      </el-table-column>
      <el-table-column
          prop="receipt"
          label="收据"
          width="120">
      </el-table-column>
      <el-table-column
          prop="contact"
          label="合同"
          width="120">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址"
          width="120">
      </el-table-column>
<!--      <el-table-column-->
<!--          fixed="right"-->
<!--          label="操作"-->
<!--          width="240">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>-->
<!--          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="2"
        :total="10"
        @current-change="page" style="position: absolute;left: 1200px;top: 360px">
    </el-pagination>
  </div>
</template>

<style>

</style>
<script>
export default {
  methods: {
    page(currentPage){
      const _this = this
      axios.get("http://localhost:8181/order/findAllOrder/"+currentPage+"/2").then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/order/findAllOrder/1/2").then(function (resp) {
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements
    })
  },
  data() {
    return {
      total:null,
      tableData: null
    }
  }
}
</script>

<style scoped>

</style>