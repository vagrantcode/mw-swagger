<template>
  <div class="testBox">
    <div>
      <el-form ref="formModel" :label-position="labelPosition" :model="formModel" label-width="160px" >
        <el-form-item
          size="default" v-for="(param, index) in formModel.params"
          :label="param.name"
          :key="param.name"
          :prop="'params.'+index +'.value'"
          :rules="{
                                required: param.required,
                                message: param.name +'必填',
                                trigger: ['blur', 'change']
                              }">
          <el-input v-model="param.value"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(param,index) in formModel.bodies"
          :label="param.name"
          :key="param.name"
          :prop="'bodies.'+index +'.value'"
          v-if="formModel.params.length<=0"
          :rules="{
                             validator:checkJson,
                                trigger: ['blur', 'change']
                              }"
        >
          <el-input type="textarea" v-model="param.value" autosize ></el-input>
          <!--<div>{{JSON.stringify(param)}}</div>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">测一测</el-button>
        </el-form-item>
      </el-form>
      <div style="position: relative;box-sizing: border-box;padding:  10px 0">
        <hr style="display: inline-block;vertical-align: middle;width: 100%;">
        <span class="headerTitle">请求结果</span>
      </div>
      <json-view :json="JSON.parse(format(testResult))||{}" ></json-view>
    </div>
  </div>
</template>

<script>
import {formatObject, deepCopy} from '../util'
import {test} from '../api'
import JsonView from './JsonView'
function isJSON (str) {
  if (typeof str === 'string') {
    try {
      let obj = JSON.parse(str)
      if (typeof obj === 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.log('error：' + str + '!!!' + e)
      return false
    }
  }
  console.log('It is not a string!')
}

export default {
  components: {JsonView},
  props: {
    operation: Object
  },

  data () {
    return {
      labelPosition: 'left',
      formModel: {
        params: [],
        bodies: []
      },
      testResult: {}
    }
  },
  methods: {
    checkJson (rule, value, callback) {
      if (!value) {
        return callback(new Error('body不能传空'))
      }
      if (!isJSON(value)) {
        callback(new Error('请输入正确的json数据'))
      } else {
        callback()
      }
    },

    onSubmit () {
      console.log(this.formModel)
      this.$refs['formModel'].validate((valid) => {
        if (valid) {
          let headers = {}
          let params = {}
          let data = {}
          this.formModel.params.forEach(function (param) {
            if (param.in === 'header') {
              headers[param.name] = param.value
            } else if (param.in === 'query') {
              params[param.name] = param.value
            }
          })
          this.formModel.bodies.forEach(function (param) {
            data = JSON.parse(param.value)
          })
          test(this.operation.method, this.operation.path, headers, params, data).then(data => {
            this.testResult = data.data
          })
        } else {
          return false
        }
      })
    },
    format (obj) {
      return formatObject(obj)
    }
  },
  computed: {},
  created () {
  },
  mounted () {
    if (this.operation.parameters) {
      this.operation.parameters.forEach((param) => {
        let model = deepCopy(param)
        if (param.in === 'header' || param.in === 'query') {
          model.value = model.default
          this.formModel.params.push(model)
        } else {
          this.formModel.bodies.push(model)
          this.formModel.bodies.forEach(item => {
            if (item.schema.$ref) {
              for (let e in item.schema.$ref.properties) {
                item.schema.$ref.properties[e] = item.schema.$ref.properties[e].example
              }
              item.value = JSON.stringify(item.schema.$ref.properties, null, 4) || '{}'
            } else {
              item.value = '{}'
            }
          })
        }
      })
    }
    this.testResult = {}
  }
}
</script>
<style scoped>
  .resultBox {
    background: white;
    padding: 5px 15px;
    box-sizing: border-box;
  }

  .testBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
    height: 100%;
    overflow: auto;
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
