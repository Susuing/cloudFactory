<template>
  <div>

    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号">
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="类别编号">
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
      ruleForm: null,
      rules: null
    };
  },
  created() {
    const _this = this;
    axios.get("http://localhost:8181/deviceType/findById/"+this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data
    })
  },
  methods: {
    back() {
      this.$router.push("/DeviceTypeManage")
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          axios.put("http://localhost:8181/deviceType/update",this.ruleForm).then(function (resp) {
            _this.$alert('《'+_this.ruleForm.typename+'》修改成功！','消息',{
              confirmButtonText : '确定',
              callback: action => {
                _this.$router.push("/DeviceTypeManage")
              }
            })
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