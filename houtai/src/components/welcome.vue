<template>
  <div>
    <el-card>
      <span>{{msg}}</span>
      <el-row>
        <el-col :span="12">
          <el-calendar v-model="value"></el-calendar>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "过着和昨天完全相同的今天，却期待一个美好的明天，那是愚蠢的事情！",
      value:new Date()
    }
  }
}
</script>

<style   scoped>
</style>