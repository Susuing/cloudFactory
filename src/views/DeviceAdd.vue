<template>
  <div>
    <el-form style="width: 60%;padding-left: 310px" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="编号">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="设备类别"  >
        <el-select v-model="ruleForm.typeid" placeholder="请选择">
          <el-option v-for="item in ruleForm.typelist" :value="item.id" :label="item.typename"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="ruleForm.devicename"></el-input>
      </el-form-item>
      <el-form-item label="规格">
        <el-input v-model="ruleForm.devicenorms"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="ruleForm.devicedescribe"></el-input>
      </el-form-item>
      <el-form-item label="设备编码">
        <el-input v-model="ruleForm.deviceno"></el-input>
      </el-form-item>
      <el-form-item label="设备状态">
        <el-select v-model="ruleForm.devicestatus" placeholder="请选择">
          <el-option
              v-for="item in ruleForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <!--        <el-input v-model="ruleForm.devicestatus"></el-input>-->
      </el-form-item>
      <el-form-item label="租用状态">
        <el-select v-model="ruleForm.rentstatus" placeholder="请选择">
          <el-option
              v-for="item in ruleForm.options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属工厂">
        <el-select v-model="ruleForm.factoryid" placeholder="请选择">
          <el-option v-for="item in ruleForm.factorylist" :value="item.id" :label="item.factoryname"></el-option>
        </el-select>
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
        typeid: '',
        devicename: '',
        devicenorms: '',
        devicedescribe: '',
        deviceno: '',
        devicestatus: '',
        rentstatus: '',
        factoryid: '',
        typelist:[],
        factorylist:[
          {
            id:'3',
            factoryname:'oppo',
          },
          {
            id:'5',
            factoryname:'华为',
          },
        ],
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
          }]

      },
    };
  },
  created(){
    const _this = this
    console.log(this.ruleForm.factorylist)
    axios.get("http://localhost:8181/deviceType/findAllDeviceType").then(function (resp) {
      _this.ruleForm.typelist = resp.data
    })
    axios.get("http://localhost:8181/factory/findAllFactory").then(function (resp) {
      _this.ruleForm.factorylist = resp.data
      console.log(_this.ruleForm.factorylist)
    })
  },
  methods: {
    back() {
      this.$router.push("/DeviceManage")
    },
    submitForm(formName) {
      const _this = this;
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8181/device/save",this.ruleForm).then(function (resp) {
            if (resp.data == "success"){
              _this.$alert('《'+_this.ruleForm.devicename+'》添加成功','消息',{
                confirmButtonText : '确定',
                callback: action => {
                  _this.$router.push("/DeviceManage")
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