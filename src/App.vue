<template>
  <div class="app-wrapper">
    <el-header class="app-header">
      <header-bar></header-bar>
    </el-header>
    <div class="contentBody">
      <col-two :l-width="'17em'" r-height="100%">
        <div slot="left"  style="height: 100%;background: #1c1c1c;overflow: hidden;">
          <div class="searchBox">
            <el-input placeholder="输入关键字搜索" v-model="searchTxt" class="input-with-select" size="small" :clearable="true">
             <!-- <el-button slot="append" icon="el-icon-search" size="small" @click="search"></el-button>-->
            </el-input>
          </div>
          <el-scrollbar style="height:calc(100% + 14px);">
            <side-menu :search-txt="searchTxt"></side-menu>
          </el-scrollbar>
        </div>
        <div slot="right" style="height: 100%;overflow: auto;">
          <div class="app-main" style="height: 100%;overflow: auto;">
            <router-view :key="key"></router-view>
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
      searchTxt: ''
    }
  },
  methods: {
    search () {
      alert(this.searchTxt)
    }
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
  }
  .contentBody{
    width:100%;
    height: calc(100% - 60px);
  }
  .searchBox{
    box-sizing: border-box;
    padding: 5px 5px;
  }
</style>
