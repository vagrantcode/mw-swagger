<template>
  <el-card style="margin: 0;padding: 0;">
    <div slot="header">
      <h3 style="margin: 0;">{{operation.summary}}</h3>
      <p>{{operation.description}}</p>
    </div>
    <div>
      <div class="tips">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="测试" name="first">
            <request-path :method="operation.method" :path="operation.path"></request-path>
            <test :operation="operation"></test>
          </el-tab-pane>
          <el-tab-pane label="说明" name="second">
            <request-parameter :parameters="parameters" :consumes="operation.consumes"></request-parameter>
            <response-parameter :parameters="responses" :produces="operation.produces"></response-parameter>
          </el-tab-pane>
        </el-tabs>

      </div>

      <!--<definition v-for="(definition, key) in definitions" :definition="definition" :name="key" :key="key"></definition>-->
    </div>
  </el-card>
</template>

<script>
import RequestPath from './RequestPath'
import RequestParameter from './RequestParameters'
import ResponseParameter from './ResponseParameter'
import Test from './Test'
import {formatObject, forEachValue} from '../util'
import {mapGetters} from 'vuex'

export default {
  components: {
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
.tips{
  border-radius: 5px;
  background-color: #e6ddec;
  position: relative;
  left: -15px;
  top:-15px;
  padding: 15px;

}
</style>
