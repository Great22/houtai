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

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable @clear="getGoodsList" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>

      <el-table :data="goodsList" border stripe class="table-el">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)" prop="goods_price" width="95px"></el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px"></el-table-column>
        <el-table-column label="添加时间" prop="add_time" width="140px">
          <template slot-scope="scope">{{scope.row.add_time|dateFormat}}</template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="removeById(scope.row.goods_id)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页结构 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5,10, 15, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageNum: 1,
        pageSize: 5
      },
      goodsList: [
        {
          goods_id: 144,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1714345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 145,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 146,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 147,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 148,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 149,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 150,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 151,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 153,
          goods_name:
            "PLAYYOUNG【高品质】外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        },
        {
          goods_id: 154,
          goods_name:
            "PLAYYOUNG外套男2019秋冬季新款潮流韩版男士连帽夹克帅气潮牌 灰色-春秋薄款（适合20°C以上）",
          goods_weight: 1,
          goods_price: 269,
          goods_number: 1,
          add_time: 1514345157,
          is_promote: false,
          upd_time: 1514345157,
          goods_state: null,
          hot_number: 0
        }
      ],
      total: 11,
      deleteKey: null
    }
  },
  created() {},
  methods: {
    goAddPage() {
      this.$router.push("/goods/add")
    },
    async removeById(id) {
      console.log(id)
      const confirmResult = await this.$confirm(
        "此操作将永久删除该商品, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        }
      ).catch(err => err)

      if (confirmResult !== "confirm") {
        this.$message.info("已取消删除操作")
      }
      this.goodsList.forEach((value, key) => {
        if (value.goods_id == id) {
          this.deleteKey = key
        }
      })

      this.goodsList = this.DeleteArray(this.goodsList, this.deleteKey)

      this.$message.success("删除成功！")
    },
    //删除某个数据  以i找数据
    DeleteArray(array, index) {
      var temp = array[index] //获取当前数组元素
      for (var i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1]
      }
      array[i] = temp //数组下标最后一个替换成之前获取的
      array.pop() //删除最后一个下标
      return array
    },
    async getGoodsList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error("获取数据失败")
      }
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
    },
    handleCurrentChange() {}
  }
}
</script>

<style   scoped>
.el-card {
  margin-top: 10px;
}
.table-el {
  margin-top: 10px;
}
</style>