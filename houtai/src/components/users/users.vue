<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索添加 -->
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" width="50px"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="mail" width="200px"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope)"
            ></el-button>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- //分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[1, 2, 5,10]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
      <el-form :model="addForm" :rules="addRules" ref="addFormrEF" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="addForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClose">
      <el-form :model="editForm" :rules="editRules" ref="editRuleForm" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="editForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- //分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRuleDalogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <div>
        <p>当前的用户：{{userinfo.username}}</p>
        <p>当前的角色：{{userinfo.role_name}}</p>
        <p>
          分配新角色：
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="(item,i) in roleList" :key="i" :label="item" :value="item"></el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRuleDalogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRuleInfo(userinfo)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data: function() {
    var checkMail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }

      cb(new Error("邮箱格式错误"))
    }
    //验证邮箱   自定义
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error("手机格式错误"))
    }

    //验证邮箱   自定义
    return {
      userlist: [
        {
          username: "索飞1",
          mail: "1522495621@qq.com",
          mobile: "18292039437",
          role_name: "超级管理员",
          status: true
        },
        {
          username: "帅哥",
          mail: "1522495621@qq.com",
          mobile: "18292039437",
          role_name: "超级管理员",
          status: false
        },
        {
          username: "索123",
          mail: "1522495621@qq.com",
          mobile: "18292039437",
          role_name: "管理员",
          status: false
        },
        {
          username: "索good",
          mail: "1522495621@qq.com",
          mobile: "18292039437",
          role_name: "普通管理者",
          status: false
        }
      ],
      //获取用户列表的参数
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 2
      },
      total: 0,
      addDialogVisible: false,
      //添加用户  的操作信息
      editDialogVisible: false,
      //修改用户的操作
      editForm: {},
      addForm: {
        username: "",
        password: "",
        mail: "",
        mobile: ""
      },
      editRules: {
        mail: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkMail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      //添加表单的验证   对象
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "用户名在3到6位之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 10, message: "密码在8到10位之间", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkMail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入联系方式", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      //设置角色权限的对话框的显示条件
      setRuleDalogVisible: false,
      //需要被分配角色的用户信息
      userinfo: {},
      roleList: ["主管", "测试角色", "DSDT", "TEST", "索飞"],
      //已经选定的角色值
      selectedRoleId: ""
    }
  },
  created() {
    this.total = this.userlist.length
  },
  methods: {
    //点击按钮，分配角色
    async saveRuleInfo(info) {
      //  console.log(info)
      if (!this.selectedRoleId) {
        return this.$message({
          type: "error",
          message: "请选择要分配的角色"
        })
      }
      // 伪数据的改变
      this.userlist.filter((item, key) => {
        if (item.username == info.username) {
          item.role_name = this.selectedRoleId
        }
      })
      // const { data: res } = await this.$http.post("urlAddress")
      // if (!res.meta.status == 200) {
      //   return this.$message.error("更新角色失败")
      // }
      this.$message.success("更新角色成功")
      // this.getUsersList()

      this.setRuleDalogVisible = false
    },
    //更新角色对话框关闭
    editDialogClosed() {
      this.selectedRoleId = ""
      this.userinfo = {}
    },
    async setRole(userinfo) {
      // console.log(userinfo)
      this.userinfo = userinfo
      //展示对话框之前，获取所有权限角色列表数据
      // const { data: res } = await this.$http.get("role")
      // if (res.meta.status !== 200) {
      //   return this.$message.error("请求数据失败")
      // }
      //this.roleList = res.data
      this.setRuleDalogVisible = true
    },
    //根据id删除某个数据
    async removeUserById(id) {
      // console.log(id)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示消息",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(error => error)
      //确认返回comfirm 字符串   取消返回cancel字符串
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除操作")
      }
      console.log("确认删除操作")

      // const { data: res } = await this.$http.delete("user" + id)
      // if (res.meta.status !== 200) {
      //   return this.$messge.error("删除失败")
      // }
      console.log(id.$index)
      //伪数据的操作  简单操作
      this.userlist = this.DeleteArray(this.userlist, id.$index)
      this.$message({
        type: "success",
        message: "删除成功",
        duration: 1500
      })
      //this.getUsersList()
    },
    DeleteArray(array, index) {
      var temp = array[index] //获取当前数组元素
      for (var i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1]
      }
      array[i] = temp //数组下标最后一个替换成之前获取的
      array.pop() //删除最后一个下标
      return array
    },
    //修改表单的重置
    editDialogClose() {
      this.$refs.editRuleForm.resetFields()
    },
    //编辑表单  提交前预验证
    editUserInfo() {
      this.$refs.editRuleForm.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post("user" + this.editForm.id, {
          mail: this.editForm.mail,
          mobile: this.editForm.mobile
        })
        if (res.meta.status != 200) {
          return this.$message.error("更新用户数据失败")
        }
        //成功修改   关闭对话框
        this.editDialogVisible = false
        //刷新当前数据列表
        this.getUsersList()
        //提示信息  成功
        this.$message({
          type: succcess,
          duration: 1000,
          message: "修改数据成功"
        })
      })
    },
    //展示编辑用户的对话框
    async showEditDialog(id) {
      //id就是id  如果有数据的话
      // const { data: res } = await this.$http.get("user" + id)
      // if (res.meta.status != 200) {
      //   return
      // }
      // this.editForm=res.meta.data
      // console.log(id.row)

      this.editForm = id.row
      this.editDialogVisible = true
      //此处原本需要请求数据
    },
    addDialogClose() {
      console.log(0)
      this.$refs.addFormrEF.resetFields()
    },
    async getUsersList() {
      this.$http.get("users", { params: this.queryInfo }).then(res => {
        if (!res.res.meta.status == "200") {
          return this.$message.error("获取用户数据失败")
        }
        this.userlist = res.res.data
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getUsersList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getUsersList()
    },
    async userStatusChange(userinfo) {
      //switch开关状态改变
      console.log(userinfo)
      const { data: res } = this.$http.put(
        `users/${userinfo.id}/state/${userinfo.status}`
      )
      if (res.data.status !== 200) {
        userinfo.status = !userinfo.status
        return this.$message.error("更新用户状态失败")
      }
      this.$message.success("更新用户状态成功")
    },
    addUser() {
      this.$refs.addFormrEF.validator(async valid => {
        if (!valid) return
        //真正添加用户  发起请求的操作

        const { data: res } = await this.$http.post("user", this.addForm)
        if (res.meta.status != 201) {
          this.$message.error("添加新用户失败")
        }
        this.$message.success("添加新用户成功")
        //隐藏添加用户的对话框
        this.addDialogVisible = false
        //重新更新用户列表
        this.getUsersList()
      })
    }
  }
}
</script>

<style   scoped>
.el-breadcrumb {
  font-size: 12px;
  margin-bottom: 15px;
}
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
}

.el-table {
  margin-top: 15px;
}
</style>