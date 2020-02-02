<template>
  <div>
    <!-- 面包屑导航代码 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">订单管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->

    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border stripe class="table-el">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="pay_status">
          <template slot-scope="scope">
            <div>
              <el-tag type="success" v-if="scope.row.pay_status=='0'">已付款</el-tag>
              <el-tag type="danger" v-else>未付款</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time">
          <template slot-scope="scope">
            <div>{{scope.row.create_time|dateFormat}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <el-button icon="el-icon-edit" type="primary" size="mini" @click="showBox"></el-button>
              <el-button
                icon="el-icon-location"
                type="success"
                size="mini"
                @click="showProgressBox"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5,10,15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 展示显示地址的对话框 -->
    <el-dialog title="修改地址" :visible.sync="addressVisible" width="50%" @close="addressDialogClosed">
      <el-form
        :model="addressForm"
        :rules="addressFormrules"
        ref="addressFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import cityData from "./citydata"
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 10
      },
      total: 40,
      orderList: [
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 47,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        },
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 48,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        },
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 49,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        },
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 50,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        },
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 7,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        },
        {
          order_number: "itokcast-7gmhjikomnjl",
          order_price: 40,
          pay_status: "1",
          create_time: 191253620,
          updata_time: 191253620,
          is_send: "否",
          order_id: 47,
          user_id: 135,
          order_pay: "1",
          trade_no: ""
        }
      ],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: ""
      },
      addressFormrules: {
        address1: [
          {
            required: true,
            message: "请选择省市区/县",
            trigger: "blur"
          }
        ],
        address2: [
          {
            required: true,
            message: "请填写详细地址",
            trigger: "blur"
          }
        ]
      },
      cityData: cityData,
      progressVisible: false,
      progressInfo: [
        {
          time: "2019-12-31 14:07:40",
          ftime: "2019-12-31 14:07:40",
          location: "",
          context: "已签收  签收人：索飞 欢迎使用XX快递，期待再次为您服务"
        },
        {
          time: "2019-12-31 12:07:40",
          ftime: "2019-12-31 12:07:40",
          location: "",
          context:
            "陕西省西安市雁塔区科技四路南窑头社区  送件人：王大锤(18292041234) 正在为您配送"
        },
        {
          time: "2019-12-31 10:37:40",
          ftime: "2019-12-31 10:37:40",
          location: "",
          context: "快件已到科技四路"
        },
        {
          time: "2019-12-29 10:07:40",
          ftime: "2019-12-29 10:07:40",
          location: "",
          context: "快件已西安运转中心"
        },
         {
          time: "2019-12-29 00:07:40",
          ftime: "2019-12-29 00:07:40",
          location: "",
          context: "快件已装运至渭南市蒲城县公司"
        },
        {
          time: "2019-12-28 18:07:40",
          ftime: "2019-12-28 18:07:40",
          location: "",
          context: "陕西省渭南市蒲城县公司快件 王二锤(15592405300) 已收件"
        }
      ]
    }
  },
  created() {
    // this.getOrdersist()
  },
  methods: {
    //展示显示地址的对话框
    showBox() {
      this.addressVisible = true
    },
    //对话框关闭
    addressDialogClosed() {
      console.log(0)
      this.$refs.addressFormRef.resetFields()
    },
    async showProgressBox() {
      // const { data: res } = await this.$http.get("url")
      // if (res.mets.status !== 200) {
      //   return this.$message.error("或物流进度信息失败")
      // }

      this.progressVisible = true
    },
    async getOrdersist() {
      const { data: res } = await this.$http.get("url")
      if (res.meta.status !== 200) {
        return this.$message.error("获取订单列表数据失败！")
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
    }
  }
}
</script>

<style scoped>
/* @import "../../plugins/timeline/timeline.css";
@import "../../plugins/timeline-item/timeline-item.css"; */

.el-card {
  margin-top: 15px;
}
.table-el {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>