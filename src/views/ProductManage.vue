<template>
  <div>
    <el-button type="warning" round @click="addPro()">添加产品</el-button>
    <br><br>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="id"
          width="180">
      </el-table-column>
      <el-table-column
          prop="typeid"
          label="产品类型"
          width="120">
      </el-table-column>
      <el-table-column
          prop="productname"
          label="产品名称"
          width="150">
      </el-table-column>
      <el-table-column
          prop="norms"
          label="规格"
          width="120">
      </el-table-column>
      <el-table-column
          prop="description"
          label="描述"
          width="300">
      </el-table-column>
      <el-table-column
          prop="productno"
          label="产品编码"
          width="240">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button @click="deleteProduct(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
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
    addPro(){
      this.$router.push('/ProductAdd')
    },
    deleteProduct(row){
      const _this = this
      axios.delete('http://localhost:8181/product/delete/'+row.id).then(function (resp){
        _this.$alert('《'+row.productname+'》删除成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        })
      })
    },
    edit(row) {
      this.$router.push({
        path: '/ProductUpdate',
        query: {
          id: row.id
        }
      });
    },
    page(currentPage){
      const _this = this
      axios.get('http://localhost:8181/product/findAll/'+currentPage+'/2').then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
      })
    }
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/product/findAll/1/2').then(function (resp){
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