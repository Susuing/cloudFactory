<template>
  <div>
    <!--    <el-button type="warning" round @click="addMyDeivce()">增加设备</el-button>-->
    <!--    <el-button type="success" round @click="rentDeivce()">租用设备</el-button>-->
    <!--    <br><br>-->
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
          label="产品编码"
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
          width="120">
      </el-table-column>
      <el-table-column
          prop="deliverdate"
          label="投标截止日期"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderstatus"
          label="订单状态"
          :formatter="statusformat"
          width="120">
      </el-table-column>
      <el-table-column
          prop="userid"
          label="经销商"
          width="120">
      </el-table-column>
      <el-table-column
          prop="factoryid"
          label="所属工厂"
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
      <el-table-column
          fixed="right"
          label="操作"
          width="280">
        <template slot-scope="scope">
          <el-button @click="finish(scope.row)" type="primary">完工</el-button>
          <el-button @click="send(scope.row)" type="success">发货</el-button>
          <el-button @click="end(scope.row)" type="warning">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-pagination-->
<!--        background-->
<!--        layout="prev, pager, next"-->
<!--        page-size=2-->
<!--        :total="total"-->
<!--        @current-change="page" style="position: absolute;left: 1150px;top: 400px">-->
<!--    </el-pagination>-->
  </div>
</template>

<script>
export default {
  methods: {
    statusformat(row,column){
      if(row[column.property] === "1"){
        return "已保存"
      }
      if(row[column.property] === "2"){
        return "已发布"
      }
      if(row[column.property] === "3"){
        return "投标结束"
      }
      if(row[column.property] === "4"){
        return "已排产"
      }
      if(row[column.property] === "5"){
        return "已完工"
      }
      if(row[column.property] === "6"){
        return "已发货"
      }
      if(row[column.property] === "7"){
        return "已收货"
      }
      if(row[column.property] === "8"){
        return "已完成"
      }
      if(row[column.property] === "9"){
        return "已超时"
      }

    },
    finish(row){
      const _this = this
      var login_name = sessionStorage.getItem("login_name")
      if (row.orderstatus === '4'){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('已完工', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else {
        alert("不可竞标！")
      }
    },
    send(row){
      const _this = this
      var login_name = sessionStorage.getItem("login_name")
      if (row.orderstatus === '5'){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('已确认发货', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else {
        alert("不可竞标！")
      }
    },
    end(row){
      const _this = this
      var login_name = sessionStorage.getItem("login_name")
      if (row.orderstatus === '7'){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('已确完成', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else {
        alert("不可竞标！")
      }
    },
    // page(currentPage){
    //   const _this = this
    //   axios.get("http://localhost:8181/order/findAllOrder/"+currentPage+"/2").then(function (resp) {
    //     _this.tableData = resp.data.content
    //     _this.total = resp.data.totalElements
    //   })
    // }
  },
  created(){
    const _this = this
    var login_name = sessionStorage.getItem("login_name")
    axios.get("http://localhost:8181/order/findFinishOrder/"+login_name).then(function (resp) {
      console.log(resp.data)
      _this.tableData = resp.data
      // _this.total = resp.data.totalElements
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