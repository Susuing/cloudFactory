<template>
  <div>
    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="订单编号"  >
<!--        <el-select v-model="ruleForm.orderid" placeholder="请选择">-->
<!--          <el-option v-for="item in ruleForm.orderlist" :value="item.id" :label="item.id"></el-option>-->
<!--        </el-select>-->
        <el-input v-model="ruleForm.orderid"></el-input>
      </el-form-item>
      <el-form-item label="工厂编号"  >
        <el-select v-model="ruleForm.factoryid" placeholder="请选择">
          <el-option v-for="item in ruleForm.factorylist" :value="item.id" :label="item.factoryname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="投标价格">
        <el-input v-model="ruleForm.bidprice"></el-input>
      </el-form-item>
<!--      <el-form-item label="投标状态">-->
<!--        <el-input v-model="ruleForm.bidstatus" ></el-input>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        orderid: '',
        factoryid: '',
        bidprice:'',
        bidstatus:'',
        orderlist:[],
        factorylist:[],
      },
    };
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/order/findPutOrder").then(function (resp) {
      _this.ruleForm.orderlist = resp.data
    })
    axios.get("http://localhost:8181/factory/findMyFactory/"+_this.$route.query.login_name).then(function (resp) {
      _this.ruleForm.factorylist = resp.data
      console.log(resp.data)
    })
  },
  methods: {
    back() {
      this.$router.push({
        path:'/ReceiveOrder',
        query:{
          login_name: this.$route.query.login_name
        }
      })
    },
    submitForm(formName) {
      const _this = this;
      console.log(this.ruleForm)
      _this.ruleForm.orderid = _this.$route.query.id
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put("http://localhost:8181/order/updateOrderStatus/"+_this.$route.query.id).then(function (resp) {

          })

          axios.post("http://localhost:8181/bid/save",_this.ruleForm).then(function (resp) {
            if (resp.data === "success"){
              _this.$alert('投标成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push({
                    path:'/ReceiveOrder',
                    query:{
                      login_name : _this.$route.query.login_name
                    }
                  })
                }
              })

            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style scoped>

</style>