<template>
  <div>
    <el-form  style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="id" prop="orderno" >
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="订单编号" prop="orderno" >
        <el-input v-model="ruleForm.orderno" readonly></el-input>
      </el-form-item>
      <el-form-item label="所需产品" prop="productid">
        <el-select v-model="ruleForm.productid" placeholder="请选择所需产品">
          <el-option v-for="item in ruleForm.proList" :value = "item.id" :label="item.productname"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品数量" prop="ordernum">
        <el-input v-model="ruleForm.ordernum"></el-input>
      </el-form-item>
      <div class="block" style="margin-left: 33px">
        <span class="demonstration" style="display: inline-block;margin-right: 30px">竞标截止日期</span>
        <el-date-picker
            v-model="ruleForm.deaddate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="block2" style="margin:20px 0 30px 33px">
        <span class="demonstration" style="display: inline-block;margin-right: 62px">交付日期</span>
        <el-date-picker
            v-model="ruleForm.deliverdate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
        </el-date-picker>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即新建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        ordernum: '',
        orderno: 'PRO',
        productid: '',
        proList:[],
        deaddate:'',
        deliverdate:'',
        id: '',
        userid:''
      },
      rules: {
        ordernum: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        // orderno: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        productid: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    const _this = this
    axios.get("http://localhost:8181/product/findAll").then(function (resp){
      _this.ruleForm.proList = resp.data
    })
    this.ruleForm.id = this.$route.query.id
    this.ruleForm.orderno = this.$route.query.orderno
    this.ruleForm.userid = this.$route.query.userid
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181/order/update',this.ruleForm).then(function (resp){
            if(resp.data == 'success'){
              _this.$alert('订单修改成功', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/MyOrder');
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