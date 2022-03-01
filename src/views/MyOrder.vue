<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderno"
          label="订单编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="productid"
          label="产品名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="ordernum"
          label="产品数量"
          width="120">
      </el-table-column>
      <el-table-column
          prop="orderstatus"
          label="订单状态"
          :formatter="statusformat"
          width="120">
      </el-table-column>
      <el-table-column
          prop="factoryid"
          label="中标工厂"
          width="280">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="500">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteOrder(scope.row)" type="danger" size="small">删除</el-button>
          <el-button @click="issue(scope.row)" type="success" size="small">发布</el-button>
          <el-button @click="bid(scope.row)" type="info" size="small">投标详情</el-button>
          <el-button @click="sure(scope.row)" type="warning" size="small">确认收货</el-button>
          <el-button @click="complete(scope.row)" type="success" size="small">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
export default {
  created() {
    const _this = this
    var login_name = sessionStorage.getItem("login_name")
    axios.get('http://localhost:8181/order/findByUserid/'+login_name).then(function (resp){
      _this.tableData = resp.data
    })
  },
  methods:{
    sure(row){
      const _this = this
      if(row.orderstatus === "6"){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('已确认收货', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else{
        alert("订单尚未发货")}
    },
    complete(row){
      const _this = this
      if(row.orderstatus === "7"){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('已完成', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else{
        alert("尚未确认收货")}
    },
    deleteOrder(row){
      const _this = this
      if(row.orderstatus === "1"){
        axios.delete("http://localhost:8181/order/delete/"+row.id).then(function (resp){
          _this.$alert('订单删除成功', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          })
        })

      }else{
        alert("订单未处于保存状态，无法删除")
      }
    },
    edit(row){
      if(row.orderstatus === "1"){
        this.$router.push({
          path: '/orderupdate',
          query: {
            id: row.id,
            orderno: row.orderno,
            userid: row.userid
          }
        });
      }else{
        alert("订单未处于保存状态，无法删除")
      }
    },
    bid(row){
      if(row.orderstatus === "3"){
        this.$router.push({
          path: '/BidChoice',
          query: {
            id: row.id
          }
        });
      }else{
        alert("订单不处于发布状态无法查看竞标情况")
      }
    },
    issue(row){
      const _this = this
      if(row.orderstatus === "1"){
        axios.post("http://localhost:8181/order/updateStatus",row).then(function (resp){
          if(resp.data === 'success'){
            _this.$alert('订单已发布', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload()
              }
            })
          }
        })
      }else{
        alert("订单不是保存状态，不能发布")
      }
    },
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

    }
  },
  data() {
    return {
      tableData: null
    }
  }
}
</script>