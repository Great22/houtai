<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">商品管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-alert title="添加商品的信息" type="info" :closable="false" show-icon center></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex -0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <!-- tab区域 -->
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input type="number" v-model="addForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input type="number" v-model="addForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input type="number" v-model="addForm.goods_number"></el-input>
            </el-form-item>
            <!-- 
            <el-form-item label="商品分类"  prop="">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>-->
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item) in manyTabData" :key="item.attr_id">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals " :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item v-for="item in onlyTabData" :key="item.attr_id" :label="item.attr_name">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="btnAdd" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="50%">
      <img width="100%" src="../../assets/imgs/pandaa.jpg" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      activeIndex: "0",
      addForm: {
        goods_name: "",
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品的详情描述
        goods_introduce: "",
        attrs: []
      },
      addFormRules: {
        goods_name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        goods_price: [
          { required: true, message: "商品价格不能为空", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "商品重量不能为空", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量不能为空", trigger: "blur" }
        ]
      },
      // 动态参数列表
      manyTabData: [
        {
          attr_id: 3077,
          attr_name: "版式",
          attr_write: "",
          attr_sel: "",
          attr_vals:
            "49吋4k超薄曲面 人工智能,55吋4k观影曲面 30核HDR,55吋4k超薄曲面 人工智能,65吋4k超薄曲面 人工智能",
          cate_id: "",
          cate_delete: ""
        },
        {
          attr_id: 123,
          attr_name: "颜色",
          attr_write: "",
          attr_sel: "",
          attr_vals: "黄色 黑色",
          cate_id: "",
          cate_delete: ""
        }
      ],
      onlyTabData: [
        {
          attr_id: 3068,
          attr_name: "主体-商品名称",
          attr_write: "manual",
          attr_sel: "",
          attr_vals: "TCL55A950C",
          cate_id: 6,
          cate_delete: null
        },
        {
          attr_id: 3069,
          attr_name: "显示-曲面",
          attr_write: "manual",
          attr_sel: "",
          attr_vals: "是",
          cate_id: 6,
          cate_delete: null
        },
        {
          attr_id: 3070,
          attr_name: "系统-智能电视",
          attr_write: "manual",
          attr_sel: "",
          attr_vals: "智能电视",
          cate_id: 6,
          cate_delete: null
        },
        {
          attr_id: 3071,
          attr_name: "外观-壁挂安装",
          attr_write: "manual",
          attr_sel: "",
          attr_vals: "支持",
          cate_id: 6,
          cate_delete: null
        }
      ],
      dialogVisible: false,
      dialogImageUrl: ""
    }
  },
  created() {
    this.setData()
  },
  methods: {
    //调教的按钮
    add() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) {
          return this.$message.error("请填写必要的表单项")
        }
        //其他操作  业务逻辑

        this.manyTabData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(" ")
          }

          this.addForm.attrs.push(newInfo)
        })
        //处理静态属性
        this.onlyTabData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        console.log(this.addForm.attrs)
      })
    },
    //处理图片预览
    handlePreview(file) {
      this.dialogImageUrl = "../../assets/imgs/" + file.name
      console.log(this.dialogImageUrl)
      this.dialogVisible = true
    },
    //移除图片的处理函数
    handleRemove(file) {
      console.log(file)
    },
    setData() {
      this.manyTabData.forEach(item => {
        item.attr_vals =
          item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ")
      })
    },
    //切换tab事件
    tabClick() {
      console.log(this.activeIndex)
    },
    // 获取所有数据的列表
    async getCatList() {
      const { data: res } = await this.$http.get("url")
      if (res.meta.status !== 200) {
      }
      return this.$message.error("获取数据失败！")
    },
    beforeTabLeave(activeName, oldActiveName) {
      // console.log(activeName, oldActiveName)
      // this.$refs.addFormRef.validate(valid => {
      //   console.log(valid)
      // })
      // if (this.activeIndex === "0") {
      //   this.$message.error("请选择商品分类！")
      //   return false
      // }
    }
  }
}
</script>

<style scoped>
.el-steps {
  margin: 15px 0;
}
.el-step_title {
  font-size: 13px;
}
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.btnAdd {
  margin-top: 15px;
}
</style>