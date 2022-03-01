<template>
  <div>
    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="类型名称">
        <el-input v-model="ruleForm.typename"></el-input>
      </el-form-item>
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
        login_name: '',
        password: '',
        user_name: '',
        mobile: '',
        roleid: ''
      },
      rules: {
        password: [
          { required:true, min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '不可以为空', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/DeviceTypeManage")
    },
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8181/deviceType/save",this.ruleForm).then(function (resp) {
            if (resp.data == "success"){
              _this.$alert('《'+_this.ruleForm.typename+'》添加成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push("/DeviceTypeManage")
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