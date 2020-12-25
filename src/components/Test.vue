<template>
  <div>
    <h3>测试</h3>
    <div>
      <div class="left"></div>
      <el-form ref="formModel" :label-position="labelPosition" :model="formModel" label-width="160px">
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
        >
          <el-input type="textarea" v-model="param.value" autosize></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">测一测</el-button>
        </el-form-item>
      </el-form>
      <pre>{{format(testResult)}}</pre>
    </div>
  </div>
</template>

<script>
import {formatObject, deepCopy} from '../util'
import {test} from '../api'

export default {
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
            for (let e in item.schema.$ref.properties) {
              item.schema.$ref.properties[e] = item.schema.$ref.properties[e].example
            }
            item.value = JSON.stringify(item.schema.$ref.properties, null, 4)
          })
        }
      })
    }
    this.testResult = {}
  }
}
</script>
