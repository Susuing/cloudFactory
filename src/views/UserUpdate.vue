<template>
  <div>

    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号" prop="name">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="region">
        <el-input v-model="ruleForm.login_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="region">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="region">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="region">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="region">
        <el-input v-model="ruleForm.roleid" readonly></el-input>
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
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '不可以修改', trigger: 'click' }
        ]
      }
    };
  },
  created() {
    const _this = this;
    axios.get("http://localhost:8181/user/findById/"+this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data
    })
  },
  methods: {
    back() {
      this.$router.push("/UserManage")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          axios.put("http://localhost:8181/user/update",this.ruleForm).then(function (resp) {
            if (resp.data == "success"){
              _this.$alert('《'+_this.ruleForm.user_name+'》修改成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push("/UserManage")
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