<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level=='0'">一级</el-tag>
            <el-tag  type="succcess"   v-else-if="scope.row.level=='1'">二级</el-tag>
            <el-tag  type="warning" v-else>三级</el-tag>  
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightsList: [
        { authName: "商品管理", id: 101, path: "users", level: 0, pid: 0 },
        { authName: "商品管理", id: 102, path: "goods", level: 1, pid: 0 },
        { authName: "商品管理", id: 103, path: "rights", level: 2, pid: 0 },
        { authName: "商品管理", id: 104, path: "users", level: 1, pid: 0 },
        { authName: "商品管理", id: 105, path: "users", level: 1, pid: 0 },
        { authName: "商品管理", id: 106, path: "users", level: 3, pid: 0 }
      ]
    }
  },
  created() {
    //渲染权限列表的数据
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights")
      if (res.meta.status != 200) {
        return this.$messgae.error("获取权限数据失败")
      }

      this.rightsList = res.data
    }
  }
}
</script>

<style   scoped>
.el-card {
  margin-top: 15px;
}
</style>