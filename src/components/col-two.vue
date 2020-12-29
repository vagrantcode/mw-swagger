<template>
  <div class="col-two-box">
    <div class="col-1" :style="{width:lWidth}">
      <div class="col-1-content">
        <slot name="left"> </slot>
      </div>

    </div>
    <div class="col-1-bar" >
      <div style="clear: both;"></div>
    </div>
    <div class="col-2"  :style="{width:rWidth,left:lWidth,height:rHeight}">
      <slot name="right"></slot>
    </div>
    <div style="clear: right;"></div>
  </div>
</template>

<script>
export default {
  name: 'col-two',
  props: {
    lWidth: String,
    border: Boolean,
    rHeight: String
  },
  computed: {
    rWidth: function () {
      return `calc(100% - ${this.lWidth})`
    }
  }
}
</script>

<style scoped>
  .col-two-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-top: 1px solid #a0a0a0;
    box-sizing: border-box;
  }
  .col-1{
    float: left;
    height: 100%;
    overflow: hidden;
  }
  .col-1-content{
    width: calc(100% + 14px);
    height: 100%;
    overflow-y:scroll ;
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .col-1-bar{
    width: 1px;
    float: left;
    display: none;
  }
  .col-2{
    float: right;
    margin-bottom: -99999px;
    padding-bottom: 99999px;
  }
  @media screen and (max-width:800px){
    .col-1-bar{
      display: block;
      cursor: pointer;
    }
    .col-1-bar:hover{

    }
    .col-two-box{
      position: relative;
    }
    .col-1{
      display: none;
      position: absolute;
      left: 0;
    }
  }
</style>
