<template>
  <div>
    <div style="position: relative;box-sizing: border-box;padding:  10px 0">
      <hr style="display: inline-block;vertical-align: middle;width: 100%;">
      <span class="headerTitle">参数</span>
    </div>
    <div>
      <div v-if="headerAndQueryParameters.length > 0">
        <h5>Header/Query参数</h5>
        <el-table
          :data="headerAndQueryParameters"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="in"
            label="参数位置"
            width="100">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.in === 'header' ? 'danger' : 'primary'"
                disable-transitions>{{scope.row.in}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="参数名"
            width="150">
            <template slot-scope="scope">
              <strong v-if="scope.row.required">{{ scope.row.name}}</strong>
              {{ scope.row.required?'':scope.row.name}}
              <br/>
              <em>({{ scope.row.required? '必填' : '可选' }})</em>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="120">
            <template slot-scope="scope">
              {{scope.row.type}}
              <em v-if="scope.row.format">({{scope.row.format}})</em>
            </template>
          </el-table-column>
          <el-table-column
            prop="default"
            label="默认值"
            width="120">
          </el-table-column>
          <el-table-column
            prop="enum"
            label="可选值"
            width="180">
            <template slot-scope="scope">
              {{scope.row.enum ? scope.row.enum.join(', ') : ''}}
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
        </el-table>
      </div>
      <div v-if="bodyParameters.length > 0">
        <el-table
          :data="bodyParameters"
          border
          stripe
          :header-cell-style="{background:'#d4d7da',color:'#4a4a4a'}"
          style="width: 100%">
          <el-table-column
            prop="in"
            label="名称"
            width="120">
          </el-table-column>
          <el-table-column
            prop="required"
            label="必须"
            width="120">
            <template slot-scope="scope">
              <em>({{ scope.row.required? '必填' : '可选' }})</em>
            </template>
          </el-table-column>
          <el-table-column label="样例" >
            <template slot-scope="scope">
              <div style="max-height: 150px;overflow: auto;">
                <pre>{{bodyParam(scope.row.schema.$ref)}}</pre>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

import {formatObject} from '../util'
import {mapGetters} from 'vuex'

export default {
  props: {
    parameters: Array,
    consumes: Array
  },
  data () {
    return {}
  },
  methods: {
    ...mapGetters({
      getDefinition: 'getDefinition'
    }),
    format (obj) {
      return formatObject(obj)
    },
    bodyParam (obj) {
      if (obj.type === 'object') {
        let temp = {}
        for (let e in obj.properties) {
          temp[e] = obj.properties[e].example
        }
        return this.format(temp)
      } else {
        return this.format(obj)
      }
    }
  },
  computed: {
    headerAndQueryParameters: {
      get () {
        if (this.parameters) {
          return this.parameters.filter(param => param.in === 'header' || param.in === 'query').sort((a, b) => {
            // header优先展示，required优先展示
            return a.in === b.in ? (a.required ? 0 : 1) : (a.in === 'header' ? 0 : 1)
          })
        }
        return []
      }
    },
    bodyParameters: {
      get () {
        if (this.parameters) {
          return this.parameters.filter(param => param.in === 'body')
        }
        return []
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style>
  .parameters {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
  }

  .headerTitle {
    position: absolute;
    left: 1em;
    display: inline-block;
    height: 100%;
    top: 0;
    background: #fff;
    padding: 5px;
    box-sizing: border-box;
    line-height: calc(0.9em + 20px);
    font-weight: bold;
    color: #575658;
  }
</style>
