<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格在此处 -->
      <tree-table
        class="tree_table"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cate_delete" style="color:lightgreen"></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cate_level==0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cate_level==1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->

        <template slot-scope="scope" slot="opt">
          <el-button icon="el-icon-edit" type="primary" size="mini" @click="editCate(scope.row)">编辑</el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            @click="removeItem(scope.row)"
          >删除</el-button>
        </template>
      </tree-table>

      <!-- 分页区域 -->
      <el-pagination
        v-show="cateList.length>0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      @close="addCateDialogClosed"
      :visible.sync="addCateDialogVisible"
      width="50%"
    >
      <!-- 添加分类的表单 -->
      <el-form :model="addCateForm" :rules="addCateRules" ref="addCateRules" label-width="100px">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="addCateForm.cate_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- options用来指定数据源 -->
          <!-- props用来指定配置对象 -->
          <el-cascader
            v-model="selectKeys"
            :options="parentCateList"
            expand-trigger="hover"
            :props="cascaderProps"
            @change="parentCateChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑分类"
      @close="editCateDialogClosed"
      :visible.sync="editCateDialogVisible"
      width="50%"
    >
      <el-form :model="editCateForm" :rules="editCateRules" ref="editCate" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="editCateForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCateConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>    


<script>
export default {
  data() {
    return {
      currentPage4: "",
      // 查询条件
      queryInfo: { type: 3, pagenum: 1, pagesize: 5 },
      // 商品分类的数据列表，默认为空
      cateList: [
        { cate_id: 1, cate_name: "大家电", cate_delete: false, cate_level: 0 },
        {
          cate_id: 52,
          cate_name: "热门推荐",
          cate_delete: false,
          cate_level: 1
        },
        { cate_id: 70, cate_name: "海外购", cate_delete: false, cate_level: 0 },
        {
          cate_id: 172,
          cate_name: "SF房产",
          cate_delete: false,
          cate_level: 2
        },
        {
          cate_id: 174,
          cate_name: "手机相机",
          cate_delete: false,
          cate_level: 0
        }
      ],
      total: 30,
      columns: [
        {
          label: "分类名称",
          prop: "cate_name"
        },
        {
          label: "是否有效",
          //prop: "cate_delete",
          type: "template",
          template: "isok"
        },
        {
          label: "排序",
          //prop: "cate_delete",
          type: "template",
          template: "order"
        },
        {
          label: "操作",
          type: "template",
          template: "opt"
        }
      ],
      addCateDialogVisible: false,
      // 添加分类表单的对象
      addCateForm: {
        cate_name: "",
        cate_id: 0,
        cate_level: 0
      },
      addCateRules: {
        cate_name: [
          { required: true, message: "分类名称不能为空", trigger: "blur" }
        ]
      },
      parentCateList: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: "value",
        label: "label",
        children: "children"
      },
      //选中的父级分类的数据id,被绑定的必须为数组
      selectKeys: [],
      editCateForm: {
        name: ""
      },
      editCateRules: {
        name: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      editCateDialogVisible: false,
      deleteKey: 0
    }
  },
  created() {
    // this.getCategories()
  },
  methods: {
    editCate(item) {
      this.editCateDialogVisible = true
    },
    editCateDialogClosed() {
      this.editCateDialogVisible = false
      this.editCateForm = {}
    },
    editCateConfirm() {
      this.$refs.editCate.validate(valid => {
        if (!valid) return
        this.editCateDialogVisible = false
      })
    },
    async removeItem(item) {
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

      this.cateList.forEach((value, key) => {
        if (value.cate_name == item.cate_name) {
          this.deleteKey = key
        }
      })

      //伪数据的操作  简单操作
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
    addCate() {
      this.$refs.addCateRules.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post("url")
        if (res.meta.status !== 201) {
          return this.$message.error("添加分类失败")
        }
        this.$message.success("添加分类成功")
        this.getCategories()
        this.addCateDialogVisible = false
      })
    },
    //选中项发生变化的事件
    parentCateChange() {
      console.log(this.selectKeys)
      if (this.selectKeys.length > 0) {
        this.addCateForm.cate_name = this.selectKeys[this.selectKeys.length - 1]
        this.addCateForm.cate_level = this.selectKeys.length
        return
      } else {
        this.addCateForm.cate_id = 0
        this.addCateForm.cate_level = 0
      }
    },
    addCateDialogClosed() {
      this.$refs.addCateRules.resetFields()
      this.selectKeys = []
      this.addCateForm.cate_level = 0
      this.addCateForm.cate_id = 0
    },
    //获取父级分类的数据
    async getParentList() {
      const { data: res } = await this.$http.get("url")
      if (res.meta.status != 200) {
        return this.$message.error("获取父级分类数据失败")
      }
    },
    showAddCateDialog() {
      //先获取父级分类的数据在展示对话框
      // this.getParentList()
      this.addCateDialogVisible = true
    },
    async getCategories() {
      const { data: res } = await this.$http.get("categories")
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据失败")
      }
    },
    // 分页的操作 监听每页的数据条数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      //this.getCategories()
    },
    //监听pagenum
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      //this.getCategories()
    }
  }
}
</script>
<style scoped>
.el-card {
  margin-top: 15px;
}
.tree_table {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
