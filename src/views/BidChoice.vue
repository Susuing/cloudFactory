<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="id"
          width="150">
      </el-table-column>
      <el-table-column
          prop="orderid"
          label="订单id"
          width="120">
      </el-table-column>
      <el-table-column
          prop="factoryid"
          label="竞标工厂"
          width="120">
      </el-table-column>
      <el-table-column
          prop="bidprice"
          label="竞标价格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="bidstatus"
          label="竞标状态"
          width="300">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="240">
        <template slot-scope="scope">
          <el-button @click="choose(scope.row)" type="primary" size="small">选标</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>

</style>
<script>
export default {
  methods: {
    choose(row){
      const _this = this
      axios.post("http://localhost:8181/order/update/"+row.orderid+"/"+row.factoryid).then(function (resp){
        alert("1")
      })

      axios.put("http://localhost:8181/bid/update",row).then(function (resp){
        if(resp.data == 'success'){
          _this.$alert('选标成功', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.push('/myOrder');
            }
          })
        }
      })
    }
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/bid/findByOrderid/"+_this.$route.query.id).then(function (resp){
      _this.tableData = resp.data
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