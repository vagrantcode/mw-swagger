<template>
  <el-card class="box-card">
    <div slot="header">
      <h3>{{info?info.title||'':''}}</h3>
      <p>{{info?info.description:''}}</p>
    </div>
    <div>
      <h5>域名：{{host}}</h5>
      <h5>基础路径：{{basePath}}</h5>
      <h5>版本号：{{info?info.version||'':''}}</h5>
      <h5>联系人：<a :href="info?info.contact.url:''">{{info?info.contact.name:''}}</a></h5>
      <h5>许可证：<a :href="info?info.license.url:''">{{info?info.license.name:''}}</a></h5>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      version: {}
    }
  },
  methods: {
  },
  computed: {
    ...mapGetters({
      info: 'getInfo',
      basePath: 'getBasePath',
      host: 'getHost'
    })
  },
  created () {
  },
  mounted () {
  }
}
</script>
