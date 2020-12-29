<template>
  <el-table
    :data="tableData"
    :show-header="false"
    size="small"
    border="true"
    style="width: 100%">
    <el-table-column
      prop="name"
      width="120">
      <template slot-scope="scope">
        <span style="font-weight: bold;color: black;">{{scope.row.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="value"
      >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'RequestBaseInfo',
  props: {operation: Object},
  data () {
    return {
      showMap: {
        consumes: '请求类型',
        summary: '摘要',
        path: '路径',
        produces: '返回类型'
      }
    }
  },
  computed: {
    tableData () {
      if (!this.operation) {
        return []
      }
      let data = []
      for (let i in this.operation) {
        if (this.showMap[i]) {
          data.push({
            name: this.showMap[i],
            value: this.operation[i]
          })
        }
      }
      return data
    }
  },
  mounted () {
    console.log(this.operation)
  }
}
</script>

<style scoped>

</style>
