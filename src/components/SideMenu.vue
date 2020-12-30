<template>
  <el-menu style="height: 100%;" @select="handleSelect" background-color="#1c1c1c" text-color="#fff"
           active-text-color="#ffd04b">
    <el-submenu v-for="item in showTags" :key="item.name" :index="item.name">
      <template slot="title">
        <i class="el-icon-menu"></i>
        <span :title="item.description">{{item.name||item.description}}</span>
      </template>
      <el-menu-item v-for="operation in item.operations" :index="operation.operationId" :key="operation.operationId">
        <i
          v-bind:class="[{'el-icon-location': operation.method === 'post'}, {'el-icon-info': operation.method === 'get'},{'el-icon-delete':operation.method!='post'&&operation.method!='get'}]"></i>
        <span slot="title">{{operation.summary}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  props: {
    searchTxt: String
  },
  data () {
    return {}
  },
  methods: {
    handleSelect (index, indexPath) {
      let param = Object.assign({}, this.$route.query)
      param['operationId'] = index
      param['t'] = new Date().getTime()
      this.$router.push({name: 'operation', query: param})
    }
  },
  computed: {
    ...mapGetters({
      getTags: 'tags'
    }),
    showTags () {
      if (this.searchTxt === null || this.searchTxt === '' || this.searchTxt === undefined) {
        return this.getTags
      } else {
        let tmp = []
        let _this = this
        this.getTags.forEach(item => {
          let found = false
          let operations = []
          item.operations.forEach(e => {
            if (e.summary.indexOf(_this.searchTxt) >= 0) {
              operations.push(e)
              found = true
            }
          })
          if (item.name.indexOf(this.searchTxt) >= 0 || found) {
            let _t = JSON.parse(JSON.stringify(item))
            if (found) {
              _t.operations = operations
            }
            tmp.push(_t)
          }
        })
        return tmp
      }
    }
  },
  created () {
  },
  mounted () {
    console.log(this.getTags)
  }
}
</script>
