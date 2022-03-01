<template>
  <div>
    <el-form  style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <el-form-item label="编号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="产品类型名称" prop="typename">
        <el-input v-model="ruleForm.typename"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
      ruleForm:{
        typename: '',
      },
      rules: {
        id: [
          { required: true, message: '请输入产品类别编号', trigger: 'blur' },
        ],
        typetname: [
          { required: true, message: '请输入产品类别名称', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:8181/proType/save',this.ruleForm).then(function (resp){
            if(resp.data == 'success'){
              _this.$alert('《'+_this.ruleForm.typename+'》添加成功', '消息', {
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