<template>
  <div>

    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号" readonly>
        <el-input v-model="ruleForm.id" readonly></el-input>
      </el-form-item>
      <el-form-item label="类别编号" readonly>
        <el-input v-model="ruleForm.typeid" readonly></el-input>
      </el-form-item>
      <el-form-item label="设备名称" readonly>
        <el-input v-model="ruleForm.devicename" readonly></el-input>
      </el-form-item>
      <el-form-item label="规格" readonly>
        <el-input v-model="ruleForm.devicenorms" readonly></el-input>
      </el-form-item>
      <el-form-item label="描述" >
        <el-input v-model="ruleForm.devicedescribe" readonly></el-input>
      </el-form-item>
      <el-form-item label="设备编码" >
        <el-input v-model="ruleForm.deviceno" readonly></el-input>
      </el-form-item>
      <el-form-item label="设备状态" >
        <el-select v-model="ruleForm.devicestatus" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <!--        <el-select v-model="ruleForm.devicestatus" placeholder="请选择">-->
        <!--          <el-option v-for="item in ruleForm.devicestatuslist" :value="item.value" :label="item.label"></el-option>-->
        <!--        </el-select>-->
        <!--        <el-input v-model="ruleForm.devicestatus"></el-input>-->
      </el-form-item>
      <el-form-item label="租用状态" >
        <el-select v-model="ruleForm.rentstatus" placeholder="请选择">
          <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <!--        <el-select v-model="ruleForm.rentstatus" placeholder="请选择">-->
        <!--          <el-option v-for="item in ruleForm.rentstatuslist" :value="item.value" :label="item.label"></el-option>-->
        <!--        </el-select>-->
        <!--        <el-input v-model="ruleForm.rentstatus"></el-input>-->
      </el-form-item>
      <el-form-item label="所属工厂" >
        <el-input v-model="ruleForm.factoryid" readonly></el-input>
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
      options: [
      {
        value:'0',
        label:'关闭',
      },
        {
          value:'1',
          label:'生产中',
        },
        {
          value:'2',
          label:'闲置中',
        },
        {
          value:'3',
          label:'故障'
        },],
      options1: [{
        value:'0',
        label:'自用设备'
      },
        {
          value: '1',
          label: '租用设备'
        },
        {
          value: '2',
          label: '空闲'
        }],
      value: '',
      ruleForm: {
        id: '',
        typeid: '',
        devicename: '',
        devicenorms: '',
        devicedescribe: '',
        deviceno: '',
        devicestatus: '',
        rentstatus: '',
        factoryid: '',
        devicestatuslist:[
          {
            value:'0',
            label:'关闭',
          },
          {
            value:'1',
            label:'生产中',
          },
          {
            value:'2',
            label:'闲置中',
          },
          {
            value:'3',
            label:'故障'
          },
        ],
        rentstatuslist:[
          {
            value:'0',
            label:'自用设备'
          },
          {
            value: '1',
            label: '租用设备'
          },
          {
            value: '2',
            label: '空闲'
          }
        ]

      },
      rules: null
    };
  },
  created() {
    const _this = this;
    console.log(_this.$route.query.login_name)
    axios.get("http://localhost:8181/device/findDeviceById/"+_this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data
    })
  },
  methods: {
    back() {
      this.$router.push({
        path:'/FactoryManage',
        query:{
          login_name : this.$route.query.login_name
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this
          axios.put("http://localhost:8181/device/update",this.ruleForm).then(function (resp) {
            _this.$alert('《'+_this.ruleForm.devicename+'》修改成功！','消息',{
              confirmButtonText : '确定',
              callback: action => {
                _this.$router.push({
                  path:'/FactoryManage',
                  query:{
                    login_name : _this.$route.query.login_name
                  }
                })
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