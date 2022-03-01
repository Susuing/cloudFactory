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
          prop="login_name"
          label="账号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="password"
          label="密码"
          width="120">
      </el-table-column>
      <el-table-column
          prop="user_name"
          label="姓名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="mobile"
          label="手机号"
          width="300">
      </el-table-column>
      <el-table-column
          prop="roleid"
          label="身份"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="240">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle ></el-button>
<!--          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>-->
          <el-button @click="deleteUser(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
<!--          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="2"
        :total="total"
        @current-change="page" style="position: absolute;left: 1250px;top: 350px">
    </el-pagination>
  </div>
</template>

<style>

</style>
<script>
export default {
  methods: {
    deleteUser(row) {
      const _this = this;
      axios.delete("http://localhost:8181/user/deleteById/"+row.id).then(function (resp) {
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
        path:'/UserUpdate',
        query:{
          id : row.id
        }
      })
    },
    page(currentPage){
      const _this = this
      axios.get("http://localhost:8181/user/findAllUser/"+currentPage+"/2").then(function (resp) {
        for (var i = 0; i < resp.data.content.length; i++) {
          if (resp.data.content[i].roleid == "1"){
            resp.data.content[i].roleid = '超级管理员'
          }else if (resp.data.content[i].roleid == "2"){
            resp.data.content[i].roleid = '云工厂'
          }else if (resp.data.content[i].roleid == "3"){
            resp.data.content[i].roleid = '经销商'
          }
        }
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/user/findAllUser/1/2").then(function (resp) {
      console.log(resp.data.content.length)
      for (var i = 0; i < resp.data.content.length; i++) {
          if (resp.data.content[i].roleid == "1"){
            resp.data.content[i].roleid = '超级管理员'
          }else if (resp.data.content[i].roleid == "2"){
            resp.data.content[i].roleid = '云工厂'
          }else if (resp.data.content[i].roleid == "3"){
            resp.data.content[i].roleid = '经销商'
          }
      }
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