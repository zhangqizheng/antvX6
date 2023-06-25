<template>
  <div class="antv-wrapper">
    <div class="goBack" @click="goBack()">
      <el-button type="primary" icon="el-icon-arrow-left">返回</el-button>
    </div>
    <div class="wrapper-canvas" id="wrapper"></div>
  </div>
</template>
<script>
  import { Graph, Shape } from '@antv/x6'
  import { chartData } from '@/utils/data'
  import { configNodePorts } from '@/utils/antvSetting'
  // 反显数据
  const resData = chartData
  export default {
    name: "jsplumb",
    data() {
      return {
        resData: []
      }
    },
    created() {
      this.resData = JSON.parse(localStorage.getItem('chartData')) ? JSON.parse(localStorage.getItem('chartData')) : resData
    },
    mounted () {
      this.initGraph()
    },
    methods: {
      // 初始化渲染画布
      initGraph(){
        const graph = new Graph({
          container: document.getElementById('wrapper'),
          grid: true,
          autoResize: true,
          interacting: false,
          connecting: {
            router: {
              name: 'manhattan',
              args: {
                padding: 1,
              },
            },
            connector: {
              name: 'rounded',
              args: {
                radius: 8,
              },
            },
            anchor: 'center',
            connectionPoint: 'anchor',
            allowBlank: false,
            snap: {
              radius: 20,
            },
            createEdge() {
              return new Shape.Edge({
                attrs: {
                  line: {
                    stroke: '#A2B1C3',
                    strokeWidth: 2,
                    targetMarker: {
                      name: 'block',
                      width: 12,
                      height: 8
                    },
                  },
                },
                zIndex: 0,
              })
            }
          },
        })
        // 返现方法
        const portsGroups = configNodePorts().groups
        if(this.resData.length){
          const jsonTemp = this.resData.map(item=>{
            if(item.ports) item.ports.groups = portsGroups 
            return item
          })
          graph.fromJSON(jsonTemp)
        }
        graph.centerContent()
      },
      goBack(){
        this.$router.push({
          path: '/'
        })
      }
    }
  }
</script>
<style lang="scss">
@keyframes ant-line {
  to {
      stroke-dashoffset: -1000
  }
}
</style>
<style lang="scss" scoped="scoped">
  .antv-wrapper{
    position: relative;
    height: 100vh;
    flex: 1;
    .goBack{
      position: absolute;
      left: 20px;
      top: 20px;
      cursor: pointer;
      z-index: 999;
    }
    .wrapper-canvas{
      height: 100%;
      width: 100%;
      position: relative;
    }
    .wrapper-tips{
      padding: 10px;
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      .wrapper-tips-item{
        span{
          padding-left: 10px;
          font-size: 12px;
        }
      }
    }
  }
</style>
