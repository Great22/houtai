<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/imgs/pandaa.jpg" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
            <!-- 某班区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- index显示为路由地址  下面的 -->
            <el-menu-item
              :index="'/'+subItem.icon+''"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavStatus('/'+subItem.icon)"
            >
              <!--模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //侧栏是否折叠
      isCollapse: false,
      menuList: [
        {
          authName: "用户管理",
          id: 100,
          children: [
            {
              id: 110,
              authName: "用户列表",
              icon: "users"
            }
          ],
          icon: "users"
        },
        {
          authName: "权限管理",
          id: 101,
          children: [
            {
              id: 120,
              authName: "角色列表",
              icon: "rights"
            },
            {
              id: 121,
              authName: "权限列表",
              icon: "rights"
            }
          ],
          icon: "rights"
        },
        {
          authName: "商品管理",
          id: 102,
          children: [
            {
              id: 130,
              authName: "商品列表",
              icon: "goods"
            },
            {
              id: 131,
              authName: "商品列表1",
              icon: "goods"
            },
            {
              id: 132,
              authName: "分类参数",
              icon: "goods"
            }
          ],
          icon: "goods"
        },
        {
          authName: "订单管理",
          id: 103,
          children: [
            {
              id: 140,
              authName: "订单列表",
              icon: "orders"
            }
          ],
          icon: "orders"
        },
        {
          authName: "数据统计",
          id: 104,
          children: [
            {
              id: 150,
              authName: "统计列表",
              icon: "reports"
            }
          ],
          icon: "reports"
        }
      ],
      iconsObj: {
        "100": "iconfont icon-user",
        "101": "iconfont icon-tijikongjian",
        "102": "iconfont icon-shangpin",
        "103": "iconfont icon-danju",
        "104": "iconfont icon-baobiao"
      },
      // 被激活的地址
      activePath: ""
    }
  },
  created() {
    this.getMenuList() //加载之前就得有的数据
    this.activePath = window.sessionStorage.getItem("activePath")
    //设置激活的path
  },
  methods: {
    logout() {
      window.sessionStorage.clear() //清空token
      this.$router.push("/login") //重定向到login页面
    },
    toggleCollapse() {
      //点击按钮  折叠侧栏
      this.isCollapse = !this.isCollapse
    },
    saveNavStatus(activePath) {
      window.sessionStorage.setItem("activePath", activePath)
      this.activePath = activePath
    },
    getMenuList() {
      // const { data: res } = this.$http.get("menu")
      // if (!res.data.status == "200") return this.$message.error(res.data.msg)
      // this.menuList = res.data
      // 数据存在的话
    }
  }
}
</script>
<style  scoped>
.home-container {
  height: 100%;
}
.el-header {
  background: #374d31;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div img {
  width: 20%;
  border-radius: 50%;
  margin-right: 10px;
}
.el-aside {
  background: #333744;
}
.el-menu {
  border-right: none;
}
.el-main {
  background: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>