<template>
  <div>
    <el-button type="warning" round @click="addMyDeivce()">增加设备</el-button>
    <el-button type="success" round @click="rentDeivce()">租用设备</el-button>
    <br><br>
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
          prop="typeid"
          label="类别编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="devicename"
          label="设备名称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="devicenorms"
          label="规格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="devicedescribe"
          label="描述"
          width="120">
      </el-table-column>
      <el-table-column
          prop="deviceno"
          label="设备编码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="devicestatus"
          label="设备状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="rentstatus"
          label="租用状态"
          width="120">
      </el-table-column>
      <el-table-column
          prop="factoryid"
          label="所属工厂"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="240">
        <template slot-scope="scope">
          <el-button  @click="toggle(scope.row)" type="success" icon="el-icon-check" circle></el-button>
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <!--          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>-->
          <el-button @click="deleteDevice(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
          <!--          <el-button @click="deleteDevice(scope.row)" type="text" size="small">删除</el-button>-->
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-pagination-->
    <!--        background-->
    <!--        layout="prev, pager, next"-->
    <!--        page-size="2"-->
    <!--        :total="3"-->
    <!--        @current-change="page" style="position: absolute;left: 1250px;top: 350px">-->
    <!--    </el-pagination>-->
  </div>
</template>

<script>
export default {
  methods: {
    rentDeivce(){
      this.$router.push({
        path:'/RentDevice',
        query:{
          login_name: this.$route.query.login_name
        }
      })
    },
    toggle(row){
      const _this = this
      console.log(row)
      axios.put("http://localhost:8181/device/updateStatus/",row).then(function (resp) {
        console.log(resp.data)
        _this.$alert('《'+row.devicename+'》修改成功！','消息',{
          confirmButtonText : '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })

    },
    addMyDeivce(){
      this.$router.push({
        path:'/MyDeviceAdd',
        query:{
          login_name: this.$route.query.login_name
        }
      })
    },
    deleteDevice(row) {
      const _this = this;
      axios.delete("http://localhost:8181/device/deleteById/"+row.id).then(function (resp) {
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
        path:'/MyDeviceUpdate',
        query:{
          id : row.id,
          login_name: this.$route.query.login_name
        }
      })
    },
    // page(currentPage){
    //   const _this = this
    //   axios.get("http://localhost:8181/device/findAllDeviceById/"+currentPage+"/2").then(function (resp) {
    //     _this.tableData = resp.data
    //     _this.total = resp.data.totalElements
    //   })
    // }
  },
  created(){
    const _this = this
    var login_name = sessionStorage.getItem("login_name")
    axios.get("http://localhost:8181/device/findMyDevice/"+login_name).then(function (resp) {
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