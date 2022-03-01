<template>
  <div>
    <el-button type="warning" round @click="add()">增加设备类型</el-button>
    <br><br>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="450">
      </el-table-column>
      <el-table-column
          prop="typename"
          label="类别名称"
          width="450">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="360">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
<!--          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>-->
          <el-button @click="deleteDeviceType(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
<!--          <el-button @click="deleteDeviceType(scope.row)" type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>

        <el-pagination
            background
            layout="prev, pager, next"
            page-size="2"
            :total="3"
            @current-change="page" style="position: absolute;left: 1250px;top: 350px">
        </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    add() {
      this.$router.push('/DeviceTypeAdd')
    },
    deleteDeviceType(row) {
      const _this = this;
      axios.delete("http://localhost:8181/deviceType/deleteById/"+row.id).then(function (resp) {
        _this.$alert('恭喜删除成功！','消息',{
          confirmButtonText : '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edit(row) {
      this.$router.push({
        path:'/DeviceTypeUpdate',
        query:{
          id : row.id
        }
      })
    },
    page(currentPage){
      const _this = this
      axios.get("http://localhost:8181/deviceType/findAllDeviceType/"+currentPage+"/2").then(function (resp) {
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/deviceType/findAllDeviceType/1/2").then(function (resp) {
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