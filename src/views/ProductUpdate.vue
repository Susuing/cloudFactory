<template>
  <div>
    <el-form  style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="id" >
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="productname">
        <el-input v-model="ruleForm.productname"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="norms">
        <el-input v-model="ruleForm.norms"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="产品类别" prop="typeid">
        <el-select v-model="ruleForm.typeid" placeholder="请选择产品类别">
          <el-option v-for="item in ruleForm.typeList" :value = "item.id" :label="item.typename"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品编码" prop="productno">
        <el-input v-model="ruleForm.productno"></el-input>
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
    typeList: []
    return {
      ruleForm: {
        productname:'',
        norms: '',
        description: '',
        typeid:'',
        productno:'',
        typeList: []
      },
      rules: {
        productname: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        norms: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        productno: [
          { required: true, message: '请输入产品描述', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    const _this = this

    axios.get("http://localhost:8181/proType/findAll").then(function (resp){
      _this.ruleForm.typeList = resp.data
    })
    axios.get('http://localhost:8181/product/findById/'+this.$route.query.id).then(function (resp){
      _this.ruleForm.id = resp.data.id;
      _this.ruleForm.norms = resp.data.norms;
      _this.ruleForm.description = resp.data.description;
      _this.ruleForm.productname = resp.data.productname;
      _this.ruleForm.productno = resp.data.productno;
    })
  },
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/product/update',this.ruleForm).then(function (resp){
            if(resp.data == 'success'){
              _this.$alert('《'+_this.ruleForm.productname+'》修改成功', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/ProductManage');
                }
              })
            }else{
              alert("Gun")
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    backTo(formName){
      this.$router.push('/ProductManage')
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>