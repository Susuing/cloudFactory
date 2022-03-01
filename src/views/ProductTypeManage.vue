<template>
  <div>
    <el-button type="warning" round @click="addProType()">添加产品类别</el-button>
    <br><br>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="id"
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
          <el-button @click="deleteType(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        page-size="2"
        :total="total"
        @current-change="page" style="position: absolute;left: 1250px;top: 400px">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    deleteType(row){
      const _this = this
      axios.delete('http://localhost:8181/proType/delete/'+row.id).then(function (resp){
        _this.$alert('《'+row.typename+'》删除成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edit(row) {
      this.$router.push({
        path: '/ProTypeUpdate',
        query: {
          id: row.id
        }
      });
    },
    addProType(){
      this.$router.push("/ProTypeAdd");
    },
    page(currentPage){
      const _this = this
      axios.get('http://localhost:8181/proType/findAll/'+currentPage+'/2').then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/proType/findAll/1/2').then(function (resp){
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