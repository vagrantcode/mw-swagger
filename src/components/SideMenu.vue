<template>
    <el-menu  style="height: 100%;" @select="handleSelect" background-color="#1c1c1c" text-color="#fff"
             active-text-color="#ffd04b">
      <el-submenu v-for="item in getTags" :key="item.name" :index="item.name">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span :title="item.description">{{item.name||item.description}}</span>
        </template>
        <el-menu-item v-for="operation in item.operations" :index="operation.operationId" :key="operation.operationId">
          <i v-bind:class="[{'el-icon-location': operation.method === 'post'}, {'el-icon-info': operation.method === 'get'},{'el-icon-delete':operation.method!='post'&&operation.method!='get'}]"></i>
          <span slot="title">{{operation.summary}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
  },
  data () {
    return {
    }
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
    })
  },
  created () {
  },
  mounted () {
    console.log(this.getTags)
  }
}
</script>
