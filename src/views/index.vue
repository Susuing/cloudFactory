<template>
      <el-container style="height: 700px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
<!--          :default-openeds="['0']"-->
          <el-menu router>
            <el-submenu index="1" v-for="(item,index) in $router.options.routes" :index="index+''" v-if="item.show">
              <template slot="title"><i class="el-icon-menu"></i>{{ item.name }}</template>
              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path"
               :class="$route.path==item2.path?'is-active':''">{{ item2.name }}</el-menu-item>
            </el-submenu>
          </el-menu>

        </el-aside>

        <el-container>
          <el-header style="text-align: right; font-size: 12px">
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px;font-size: 18px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><el-button type="text" @click="refresh()">刷新</el-button></el-dropdown-item>
                <el-dropdown-item><el-button type="text" @click="back()">返回</el-button></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span style="font-size: 18px;color: cornsilk">超级管理员</span>
          </el-header>

          <el-main>
              <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>
export default {
  name: "index",
  methods:{
    refresh(){
      this.$router.push('/UserManage')
    },
    back(){
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>