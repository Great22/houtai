<template>
      <div>
 <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->

    <el-card>
        <!-- 警告区域 -->
     <el-alert
    title="注意：只允许为第三级分类设置相关参数！"
    type="warning"  :closable="false"  show-icon>
  </el-alert>
   <el-row  class="cat_opt">
       <el-col>
           <span>选择商品分类：</span>
           <!-- 选择商品分类的级联选择框 -->
             <el-cascader
    v-model="selectCatekeys"
    :options="cateList"
    :props="cateProps"
    @change="handleChange"></el-cascader>
       </el-col>
   </el-row>
  <!-- 选择商品分类区域 -->
   <el-tabs v-model="activeName" @tab-click="handleTabsClick">
       <!-- 添加动态参数的面板 -->
    <el-tab-pane label="动态参数" name="many">
              <el-button  type="primary" size="mini" @click="addDialogVisible=true">添加参数</el-button>
   <el-table border stripe :data="cateList" class="paramsTable">
    <el-table-column type="expand" >
      <template  slot-scope="scope">
  <el-tag
    v-for="(item,key) in scope.row.cate_vals"
    :key="key"
    closable
    @close="handleClose(scope.row,key)"
  >{{item}}</el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  ></el-input>

  <!-- 添加的按钮 -->
  <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
  <span>{{scope.row.inputVisible}}</span>
</template>
    </el-table-column>
    <el-table-column type="index"  type-text="#"></el-table-column>
    <el-table-column label="参数名称" prop="cate_name"></el-table-column>
    <el-table-column label="操作">
      <template  slot-scope="scope">
  <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope)">编辑</el-button>

  <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeParams(scope.row)">删除</el-button>
      </template>

    </el-table-column>
  </el-table>
    </el-tab-pane>
    <el-tab-pane label="静态属性" name="only">
        <el-button type="primary" size="mini" @click="addDialogVisible=true" >添加属性</el-button>
    </el-tab-pane>
  </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
<el-dialog
  :title="'添加'+titleText"
  :visible.sync="addDialogVisible"
  width="50%" @close="addDialogClosed">
  <el-form :model="addForm" :rules="addFormRules" 
  ref="addFormRef" label-width="100px">
  <el-form-item :label="titleText" prop="name">
    <el-input v-model="addForm.name"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
</el-dialog>
<!-- 修改参数的对话框 -->
<el-dialog
  :title="'修改'+titleText"  
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed">
  <el-form :model="editForm" :rules="editFormRules" 
  ref="editFormRef" label-width="100px">
  <el-form-item :label="titleText" prop="name">
    <el-input v-model="editForm.name"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams">确 定</el-button>
  </span>
</el-dialog>
     </div>
</template>

<script>
export default {
  data() {
    return {
      selectCatekeys: [],
      cateList: [
        {
          cate_id: 1,
          cate_name: "大家电",
          cate_delete: false,
          cate_level: 0,
          cate_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能"
        },
        {
          cate_id: 52,
          cate_name: "热门推荐",
          cate_delete: false,
          cate_level: 1,
          cate_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能"
        },
        {
          cate_id: 70,
          cate_name: "海外购",
          cate_delete: false,
          cate_level: 0,
          cate_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能"
        },
        {
          cate_id: 172,
          cate_name: "SF房产",
          cate_delete: false,
          cate_level: 2,
          cate_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能"
        },
        {
          cate_id: 174,
          cate_name: "手机相机",
          cate_delete: false,
          cate_level: 0,
          cate_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能"
        }
      ],
      cateProps: {
        value: "cate_id",
        label: "cate_name",
        children: "children"
      },
      activeName: "many",
      //控制添加参数的对话框的显示隐藏
      addDialogVisible: false,
      //添加参数的表单
      addForm: {
        name: ""
      },
      addFormRules: {
        name: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      editDialogVisible: false,
      editForm: {
        name: ""
      },
      editFormRules: {
        name: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      deleteKey: null,
      editKey: null,
      inputValue: "",
      inputVisible: false
    }
  },
  created() {
    // this.getCateList()
    this.setData()
  },
  computed: {
    isBtnDiabled() {
      if (this.selectCatekeys.length !== 3) {
        return true
      }
      return true
    },
    cateId() {
      if (this.selectCatekeys.lengt === 3) {
        return this.selectCatekeys[2]
      }
      return null
    },
    titleText() {
      if (this.activeName == "many") {
        return "动态参数"
      }

      return "静态属性"
    }
  },
  methods: {
    //删除对应的参数可选项
    handleClose(row, i) {
      // console.log(row, i)
      row.cate_vals.splice(i, 1)
    },
    //文本框  失去焦点  或按下enter 键的事件
    handleInputConfirm() {
      console.log("ok")
    },
    showInput(row) {
      console.log(row)
      //不知道为什么不起作用？
      // row.inputVisible = true
      // console.log(this.setData())
      // $nextTick   当页面上元素重新渲染后，才会调用的方法
      // this.$nextTick(_ => {
      //   this.$refs.saveTagInput.$refs.input.focus()
      // })
    },
    setData() {
      this.cateList.forEach(item => {
        item.cate_vals = item.cate_vals ? item.cate_vals.split(" ") : []
      })
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    //修改按钮的事件处理
    showEditDialog(scope) {
      this.editDialogVisible = true
      //console.log(scope.row.cate_name)
      this.editForm.name = scope.row.cate_name
    },
    //修改对话框  的确认
    editParams() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        // console.log(this.editForm.name)
        this.cateList.forEach((value, key) => {
          if (value.cate_name == this.editForm.name) {
            this.editKey = key
          }
        })

        this.cateList[this.editKey].cate_name = this.editForm.name

        this.editDialogVisible = false
      })
    },
    //删除按钮的操作
    async removeParams(row) {
      const confirmResults = await this.$confirm(
        "此操作将永久删除该参数, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err)
      if (confirmResults !== "confirm") {
        return this.$message.info("已取消删除操作")
      }
      //删除的操作如下   存在真实数据时候
      // const { data: res } = await this.$http.delete("url")
      // if (res.meta.status != 200) {
      //   return this.$message.error("删除参数失败")
      // }
      // this.$message.success("删除数据失败")
      // this.getCateList()
      this.cateList.forEach((value, key) => {
        if (value.cate_name == row.cate_name) {
          this.deleteKey = key
        }
      })
      console.log(this.deleteKey)
      this.cateList = this.DeleteArray(this.cateList, this.deleteKey)
      this.$message({
        type: "success",
        message: "删除成功",
        duration: 1500
      })
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
    //添加对话框的重置
    addDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    async addParams() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return

        // 存在真实数据  如下操作
        // const {data:res}=await this.$http.post("url")
        // if(res.meta.status!==200){
        //   return  this.$message.error("添加数据失败")
        // }
        this.addDialogVisible = false
      })
    },
    handleTabsClick() {
      console.log(this.activeName)
      this.getParamsData()
    },
    //   级联选择框变化会调用此函数
    // 只允许选择三级数据
    handleChange() {
      this.getParamsData()
    },
    async getParamsData() {
      if (this.length !== 3) {
        this.selectCatekeys = []
        return
      }
      //根据所选分类的ID和当前的面板，获取对应的数据
      // const { data: res } = await this.$http.get("url")
      // if (res.meta.status !== 200) {
      //   return this.$message.error("获取数据失败")
      // }
    },
    async getCateList() {
      const { data: res } = await this.$http.get("categories")

      if (res.meta.status !== 200) {
        return this.$message({
          type: "error",
          message: "获取数据失败"
        })
      }
    }
  }
}
</script>

<style   scoped>
.el-card {
  margin-top: 15px;
}
.cat_opt {
  margin: 15px 0;
}
.paramsTable {
  margin-top: 10px;
}
.el-tag {
  margin: 10px;
}
.input-new-tag {
  width: 120px;
}
</style>