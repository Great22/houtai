<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table :data="roleList" border stripe>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1,i1)  in scope.row.children"
              :key="item1.id"
              :class="['bdbottom',i1===0?'bdtop':'','vcenter']"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag closable @close="removeById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二三级权限 -->

              <el-col :span="19">
                <el-row
                  v-for="(item2,i2) in item1.children"
                  :key="item2.id"
                  :class="[i2===0?'':'bdtop','vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeById(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      type="warning"
                      closable
                      @close="removeById(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
            >分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-tree :data="rightsList" :props="treeProps" default-expand-all show-checkbox node-key="id"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有的角色列表
      roleList: [
        {
          authName: "自定义用户",
          roleDesc: "技术负责人",
          children: [
            {
              id: 101,
              authName: "商品管理",
              path: "goods",
              children: [
                {
                  id: 104,
                  authName: "商品列表",
                  path: "goods",
                  children: [
                    { id: 116, authName: "商品修改", path: "goods" },
                    { id: 117, authName: "商品修改", path: "goods" },
                    { id: 118, authName: "商品修改", path: "goods" }
                  ]
                },
                {
                  id: 1041,
                  authName: "商品列表",
                  path: "goods",
                  children: [
                    { id: 116, authName: "商品修改", path: "goods" },
                    { id: 117, authName: "商品修改", path: "goods" },
                    { id: 118, authName: "商品修改", path: "goods" }
                  ]
                },
                {
                  id: 115,
                  path: "params",
                  authName: "分类参数",
                  children: [
                    { id: 142, authName: "获取参数列表", path: "categories" },
                    { id: 143, authName: "获取参数列表", path: "categories" }
                  ]
                }
              ]
            }
          ]
        },
        {
          authName: "索飞",
          roleDesc: "负责人",
          children: [
            {
              id: 101,
              authName: "商品管理",
              path: "goods",
              children: [
                {
                  id: 104,
                  authName: "商品列表",
                  path: "goods",
                  children: [{ id: 116, authName: "商品修改", path: "goods" }]
                },
                {
                  id: 115,
                  path: "params",
                  authName: "分类参数",
                  children: [
                    { id: 142, authName: "获取参数列表", path: "categories" }
                  ]
                }
              ]
            }
          ]
        }
      ],
      setRightDialogVisible: false,
      rightsList: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      //树型控件的属性绑定对象
      treeProps: {
        label: "label",
        children: "children"
      }
    }
  },
  created() {
    this.getRoleList()
  },
  mounted() {},
  methods: {
    //迭代获取ID值
    getLeafKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      })
    },

    async getRoleList() {
      const { data: res } = await this.$http.get("roles")
      if (res.meta.status != 200) {
        return this.$message.error("获取角色数据失败")
      }
      this.roleList = res.data
    },
    //根据ID判断是否删除
    async removeById(role, item) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除文件，是否继续？",
        "提示",
        {
          confirmButtonText: "确认",
          cancelBUttonText: "取消",
          type: "warning"
        }
      ).catch(error => error)
      if (confirmResult !== "confirm") {
        return this.$message.error("取消了删除操作")
      }
      console.log("确认了删除")
      //真实数据的操作代码
      // const { data: res } = awaitthis.$http.delete(
      //   `/roles/${role.id}/rights/${id}`
      // )
      // if ((res.meta, status !== 200)) {
      //   return this.$message.error("删除数据失败")
      // }
      // //this.getRoleList() 会刷新数据  关上
      // role.children = res.data
      console.log(item)
    },
    async showSetRightDialog(item) {
      // //获取所有权限数据
      // const { data: res } = await this.$htpp.get("rights/tree")
      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取数据失败")
      // }
      // //获取到的权限数据保存到 rightList  里面
      // this.rightsList = res.data
      // this.rightsList=item
      console.log(this.rightsList)
      this.setRightDialogVisible = true
      console.log(item)
    }
  }
}
</script>

<style  scoped>
.el-table {
  margin-top: 15px;
}

.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>