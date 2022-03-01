<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
        <div class="title">东软智能制造平台</div>
        <el-form label-width="80px" :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-left: -50px">
          <el-form-item label="账号">
            <el-input placeholder="请输入账号" v-model="ruleForm.login_name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入密码" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div style="display: flex;justify-content:space-around">
          <el-button type="primary" @click="submitForm('ruleForm')" style="width: 120px;font-size: 18px;margin-left: 30px">登录</el-button>
          <el-button type="primary" @click="reg()" style="width: 120px;font-size: 18px">注册</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        login_name: '',
        password: ''
      },
      rules: null
    };
  },
  methods:{
    submitForm(formName){
      const _this = this;
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.get("http://localhost:8181/user/login/"+_this.ruleForm.login_name+"/"+_this.ruleForm.password).then(function (resp) {
            sessionStorage.setItem("login_name",_this.ruleForm.login_name)
            if (resp.data == "1"){
              _this.$router.push("/nav1")
            }else if(resp.data == "2"){
              _this.$router.push({
                path:'/CloudFactory',
                query:{
                  login_name : _this.ruleForm.login_name
                }
              })
            }else if (resp.data == "3"){
              _this.$router.push({
                path:'/Distributor',
                query:{
                  login_name : _this.ruleForm.login_name
                }
              })
            }else {
              console.log(resp.data)
              _this.$alert('密码错误请重新输入！', '错误', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/')
                }
              });
            }
          })
        } else {
          this.$alert('密码错误请重新输入！', '错误', {
            confirmButtonText: '确定',
            callback: action => {
              _this.$router.push('/login')
            }
          });
          return false;
        }
      });
    },
    reg(){
      this.$router.push("/register")
    }
  }
}
</script>

<style>
@import "../vendor/bootstrap/css/bootstrap.min.css";
@import "../fonts/font-awesome-4.7.0/css/font-awesome.min.css";
@import "../fonts/iconic/css/material-design-iconic-font.min.css";
@import "../css/main.css";
@import "../css/util.css";
  /*.wrapper{*/
  /*  width: 450px ;*/
  /*  height:240px;*/
  /*  position:absolute;*/
  /*  top:50%;*/
  /*  left:50%;*/
  /*  margin:-160px 0 0 -225px;*/
  /*}*/
.container-login100{
  background-image: url("../images/bg-01.jpg");
}
.wrap-login100{

}
.title{
  position:relative;
  top:50%;
  left:15%;
  margin:-30px -30px 30px 20px;
  font-size: 30px;
  color: #b54ad4;
  font-weight: bold;
}
</style>