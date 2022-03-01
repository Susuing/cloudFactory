<template>
  <div>
    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号" >
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="工厂名称">
        <el-input v-model="ruleForm.factoryname"></el-input>
      </el-form-item>
      <el-form-item label="工厂介绍">
        <el-input v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="用户id">
        <el-input v-model="ruleForm.userid"></el-input>
      </el-form-item>
      <el-form-item label="工厂状态" >
        <el-input v-model="ruleForm.status"></el-input>
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
        factoryname: '',
        introduction: '',
        userid: '',
        status: '',
      },
    };
  },
  created() {
    const _this = this;
    axios.get("http://localhost:8181/factory/findById/"+_this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data
    })
  },
  methods: {
    back() {
      this.$router.push("/Factory")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          axios.put("http://localhost:8181/factory/updateInfo",_this.ruleForm).then(function (resp) {
            if (resp.data == "success"){
              _this.$alert('《'+_this.ruleForm.factoryname+'》修改成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push("/Factory")
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