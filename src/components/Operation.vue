<template>
  <div class="opBox">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane  name="first">
        <span slot="label" style="font-weight: bold;">
          <el-tag :type="type" >{{upperCase(operation.method)}}</el-tag>
          {{operation.path}}
        </span>
        <request-base-info :operation="operation"></request-base-info>
        <request-parameter :parameters="parameters" :consumes="operation.consumes"></request-parameter>
        <response-parameter :parameters="responses" :produces="operation.produces"></response-parameter>
      </el-tab-pane>
      <el-tab-pane name="second">
        <span slot="label" style="font-weight: bold;">
          测试
        </span>
        <test :operation="operation"></test>

      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import RequestPath from './RequestPath'
import RequestParameter from './RequestParameters'
import ResponseParameter from './ResponseParameter'
import Test from './Test'
import {formatObject, forEachValue} from '../util'
import {mapGetters} from 'vuex'
import RequestBaseInfo from './RequestBaseInfo'

export default {
  components: {
    RequestBaseInfo,
    RequestPath,
    RequestParameter,
    ResponseParameter,
    Test
    // Definition
  },
  props: {},
  data () {
    return {
      form: {},
      testResult: {},
      activeName: 'first'
    }
  },
  methods: {
    format (obj) {
      return formatObject(obj)
    },
    upperCase (method) {
      if (method) {
        return method.toUpperCase()
      }
      return ''
    },
    getOperation () {
      return this.$store.getters.getOperation(this.$route.query['operationId'])
    }
  },
  computed: {
    ...mapGetters({
      definitions: 'getDefinitions'
    }),
    operation: {
      get () {
        return this.getOperation()
      }
    },
    type: {
      get () {
        if (!this.operation.method) {
          return ''
        }
        let meth = this.operation.method.toUpperCase()
        if (meth === 'GET') {
          return ''
        } else if (meth === 'POST') {
          return 'success'
        } else if (meth === 'DELETE') {
          return 'danger'
        }
        return ''
      }
    },
    parameters: {
      get () {
        let operation = this.getOperation()
        if (operation && operation.parameters) {
          return operation.parameters
        }
        return []
      }
    },
    responses: {
      get () {
        let operation = this.getOperation()
        let arr = []
        if (operation && operation.responses) {
          let responses = operation.responses
          if (responses) {
            forEachValue(responses, (value, key) => {
              let obj = Object.assign({}, value)
              obj['status'] = key
              arr.push(obj)
            })
          }
        }
        return arr
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
  .opBox{
    width: 100%;
    height:100%;
    box-sizing: border-box;
    padding: 5px;
    margin: 0;
  }
</style>
