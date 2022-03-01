<template>
  <div>
    <el-form  style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="id" >
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="typename" >
        <el-input v-model="ruleForm.typename" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="backTo('ruleForm')">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id:'',
        typename:''
      },
      rules: {
        typename: [
          { required: true, message: '请输入产品类别名称', trigger: 'blur' },
        ]
      }
    };
  },
  created(){
    const _this = this
    axios.get('http://localhost:8181/proType/findById/'+this.$route.query.id).then(function (resp){
      console.log(resp.data);
      _this.ruleForm = resp.data;
    })
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/proType/update',this.ruleForm).then(function (resp){
            if(resp.data == 'success'){
              _this.$alert('《'+_this.ruleForm.typename+'》修改成功', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/ProductTypeManage');
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
    backTo(formName){
      this.$router.push('/ProductTypeManage')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>