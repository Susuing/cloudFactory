<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 24px">订单排产</span>
        <el-button @click="back()" style="float: right; padding: 3px 0;font-size: 18px" type="text">返回</el-button>
      </div>
      <el-button type="success">+ 添加设备</el-button>

      <el-form style="width: 100%;margin-top: 30px;border: 3px solid pink;padding-top:20px;" :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="设备名称" style="width: 300px;display: inline-block">
            <el-select v-model="ruleForm.deviceid" placeholder="请选择">
              <el-option v-for="item in ruleForm.devicelist" :label="item.devicename" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="开始时间" style="width: 300px;display: inline-block">
          <el-date-picker
              v-model="ruleForm.begindate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" style="width: 300px;display: inline-block;margin-right: 100px">
          <el-date-picker
              v-model="ruleForm.enddate"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>

          <el-button @click="addScheduling()" type="primary">排产</el-button>

      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  methods:{
    addScheduling(){
      const _this = this
      _this.ruleForm.orderid = _this.$route.query.id
      console.log(_this.$route.query.id)
      axios.post("http://localhost:8181/order/scheduling/"+_this.$route.query.id).then(function (resp) {

      })
      axios.post("http://localhost:8181/scheduling/save",_this.ruleForm).then(function (resp) {
        if (resp !== "success"){
            _this.$alert('排产成功','消息',{
            confirmButtonText : '确定',
            callback: action => {
              window.location.reload()
            }
          })
        }else {
            console.log('error submit!!');
            return false;
        }
      })
    },
    back() {
      this.$router.push({
        path:'/ReceiveOrder',
        query:{
          login_name: this.$route.query.login_name
        }
      })
    },
  },
  created(){
    var login_name = sessionStorage.getItem("login_name")
    const _this = this
    axios.get("http://localhost:8181/device/findMyDevice/"+login_name).then(function (resp) {
      _this.ruleForm.devicelist = resp.data
      // console.log(_this.ruleForm.devicelist)
    })
  },
  data() {
    return {
      ruleForm: {
        orderid:'',
        deviceid:'',
        devicelist:[],
        begindate:'',
        enddate:''
      },
    }
  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 1250px;
  height: 600px;
  margin: 0 auto;
}
</style>