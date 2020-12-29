<template>
  <div class="app-wrapper">
    <el-header class="app-header">
      <header-bar></header-bar>
    </el-header>
    <div class="contentBody">
      <col-two :l-width="'17em'">
        <div slot="left"  style="height: 100%;background: #1c1c1c;overflow: hidden;">
          <el-scrollbar style="height:calc(100% + 14px);">
            <side-menu></side-menu>
          </el-scrollbar>
        </div>
        <div slot="right">
          <div class="app-main" >
            <el-scrollbar style="height:100%">
              <router-view :key="key"></router-view>
            </el-scrollbar>
          </div>
        </div>
      </col-two>
    </div>
  </div>
</template>
<script>
import HeaderBar from './components/HeaderBar'
import SideMenu from './components/SideMenu'
import ColTwo from './components/col-two'
export default {
  components: {
    ColTwo,
    HeaderBar,
    SideMenu
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    key () {
      return this.$route.fullPath
    }
  },
  mounted () {
  }
}
</script>
<style>
  .app-header{
    height: 60px;
    overflow: hidden;
  }
  .app-wrapper{
    height: 100%;
    width: 100%;
  }
  .app-sider{
    position: fixed;
    left: 0;
    overflow: hidden;
    top: 70px;
    bottom: 0;
    height: 100%;
    background-color: #1c1c1c;
    color: white;
    margin-left: 8px;
  }
  .app-main {
    width: 100%;
    top: 70px;
    left: 232px;
    /* height: 100%; */
    bottom: 0;
    right: 10px;
    overflow: hidden;
  }
  .contentBody{
    width:100%;
    height: calc(100% - 60px);
  }
</style>
