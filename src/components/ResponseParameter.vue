<template>
  <div>
    <div style="position: relative;box-sizing: border-box;padding:  10px 0">
      <hr style="display: inline-block;vertical-align: middle;width: 100%;">
      <span class="headerTitle">响应</span>
    </div>
    <div>
      <p>响应类型：[ {{produces ? produces.join(', ') : ''}} ]</p>
    <!--  <div v-for="param in parameters" :key="param.description">
        <h5>Status {{param.status}} : {{param.description}}</h5>
        <pre>{{format(getRefObject(param))}}</pre>
      </div>-->
    </div>
  </div>
</template>

<script>
import { formatObject } from '../util'
import { mapGetters } from 'vuex'
export default {
  props: {
    parameters: Array,
    produces: Array
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapGetters({
      getDefinition: 'getDefinition',
      getDefinitions: 'getDefinitions'
    }),
    format (obj) {
      return formatObject(obj)
    },
    getRefObject (param) {
      if (param !== undefined) {
        if (param.schema !== undefined) {
          if (param.schema['$ref'] !== undefined) {
            let ref = param.schema['$ref']
            ref = ref.substring(14, ref.length)
            let definition = this.getDefinitions()
            return definition[ref]['properties']
          }
        }
      }
      return ''
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  }
}
</script>
<style scoped>
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
