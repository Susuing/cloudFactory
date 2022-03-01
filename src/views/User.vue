<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>姓名</td>
        <td>手机号</td>
        <td>身份</td>
        <td>操作</td>
      </tr>
      <tr v-for="item in users">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.password}}</td>
        <td>{{ item.mobile}}</td>
        <td>{{ item.roleid}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      msg: 'hello',
      users: [{
        id:null,
        login_name:null,
        password:null,
        user_name:null,
        mobile:null,
        roleid:null
      }],
      create(){
        const _this = this
        axios.get("http://localhost:8181/user/findAllUser").then(function (resp) {
          console.log(resp.data)
          _this.users = resp.data
        })
      }
    }
  }

}
</script>

<style scoped>

</style>