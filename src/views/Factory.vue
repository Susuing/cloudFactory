<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="工厂id"
          width="200">
      </el-table-column>
      <el-table-column
          prop="factoryname"
          label="工厂名称"
          width="200">
      </el-table-column>
      <el-table-column
          prop="introduction"
          label="工厂介绍"
          width="240">
      </el-table-column>
      <el-table-column
          prop="userid"
          label="管理员id"
          width="240">
      </el-table-column>
      <el-table-column
          prop="status"
          label="工厂状态"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="240">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle ></el-button>
          <el-button @click="deleteFactory(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
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

<script>
export default {
  methods: {
    edit(row){
      this.$router.push({
        path:'/FactoryUpdate',
        query:{
          id : row.id
        }
      })
    },
    deleteFactory(row){
      const _this = this;
      axios.delete("http://localhost:8181/factory/deleteById/"+row.id).then(function (resp) {
        _this.$alert('恭喜删除成功！','消息',{
          confirmButtonText : '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    change(row){
      const _this = this
      axios.put('http://localhost:8181/factory/update',row).then(function (resp){
        if(resp.data == 'success'){
          _this.$alert('《'+row.factoryname+'》修改成功', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload()
            }
          });
        }

      })
    },
    page(currentPage){
      const _this = this
      axios.get('http://localhost:8181/factory/findAll/'+currentPage+'/2').then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/factory/findAll/1/2').then(function (resp){
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements
    })
  },

  data() {
    return {
      total: null,
      tableData: null
    }
  }
}
</script>