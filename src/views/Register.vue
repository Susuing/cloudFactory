<template>
  <div>
    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户编号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="login_name">
        <el-input v-model="ruleForm.login_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="user_name">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="ruleForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="roleid">
        <el-select v-model="ruleForm.roleid" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工厂编号" prop="facid">
        <el-input v-model="ruleForm.facid"></el-input>
      </el-form-item>
      <el-form-item label="工厂名称" prop="factoryname">
        <el-input v-model="ruleForm.factoryname"></el-input>
      </el-form-item>
      <el-form-item label="工厂介绍" prop="introduction">
        <el-input v-model="ruleForm.introduction"></el-input>
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
        roleid: '',
        facid:'',
        factoryname:'',
        introduction:''
      },
      rules: {
        id: [
          { required: true, message: '不可以为空', trigger: 'blur' }
        ],
        login_name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号', trigger: 'blur' }
        ],
        roleid: [
          { required: true, message: '请选择用户身份', trigger: 'blur' }
        ],
      },
      options: [ {
        value: '2',
        label: '云工厂'
      }, {
        value: '3',
        label: '经销商'
      }],
      value: ''
    };
  },
  methods: {
    back() {
      this.$router.push("/UserManage")
    },
    submitForm(formName) {
      const _this = this;
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8181/user/save",this.ruleForm).then(function (resp) {
            if (resp.data == "success"){
              _this.$alert('《'+_this.ruleForm.user_name+'》注册成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push("/")
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

