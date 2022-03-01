<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 24px">租用设备</span>
        <el-button @click="back()" style="float: right; padding: 3px 0;font-size: 18px" type="text">返回</el-button>
      </div>
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
            width="120" >
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
            width="100">
          <template slot-scope="scope">
            <el-button  @click="rent(scope.row)" type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "RentDevice",
  methods:{
    back(){
      this.$router.push({
        path:'/FactoryManage',
        query:{
          login_name: this.$route.query.login_name
        }
      })
    },
    rent(row){
      const _this = this
      console.log(row)
      axios.get("http://localhost:8181/device/findRentMyDev/"+row.id+"/"+this.$route.query.login_name).then(function (resp) {
        if (resp.data === "success"){
          _this.$alert('《'+_this.tableData.devicename+'》租用成功','消息',{
            confirmButtonText : '确定',
            callback: action => {
              _this.$router.push({
                path:'/FactoryManage',
                query:{
                  login_name : _this.$route.query.login_name
                }
              })
            }
          })
        }else {
          _this.$alert('《'+_this.tableData.devicename+'》不可租用','消息')
        }
      })
    }
  },created(){
    const _this = this
    axios.get("http://localhost:8181/device/findRentDevice").then(function (resp) {
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

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 1250px;
  height: 600px;
  margin: 0 auto;
}
</style>