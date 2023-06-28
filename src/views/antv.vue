<template>
  <div class="all">
    <div class="antv-content">
      <div class="antv-menu">
        <h3> 设备列表 </h3>
        <ul class="menu-list">
          <!-- <li draggable="true" @drag="menuDrag('defaultOval')"> <i class="icon-oval"></i> <strong>椭圆形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('defaultSquare')"><i class="icon-square"></i><strong>矩形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('defaultYSquare')"><i class="icon-ysquare"></i><strong>圆角矩形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('defaultRhombus')"><i class="icon-rhombus"></i><strong>菱形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('defaultRhomboid')"><i class="icon-rhomboid"></i><strong>平行四边形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('defaultCircle')"><i class="icon-circle"></i><strong>圆形</strong></li> -->
          <!-- <li draggable="true" @drag="menuDrag('otherImage')"><i class="el-icon-picture"></i><strong>图片</strong></li> -->
          <li draggable="true" @drag="menuDrag('exchange')"><img src="@/assets/1.png"><strong>交换机</strong></li>
          <li draggable="true" @drag="menuDrag('server')"><img src="@/assets/2.png"><strong>服务器</strong></li>
        </ul>
        <div class="wrapper-btn" v-if="isChange">
          <el-button type="success" @click="handlerSend">保存当前方案</el-button>
        </div>
      </div>
      <div class="antv-wrapper">
        <div class="wrapper-canvas" id="wrapper" @drop="drop($event)" @dragover.prevent></div>
        <div class="wrapper-tips">
          <div class="wrapper-tips-item">
            <el-switch v-model="isPortsShow" @change="changePortsShow"></el-switch>
            <span>链接桩常显</span>
          </div>
        </div>
      </div>
      <div v-if="editDrawer" class="edit-main">
        <div class="edit-main-title">
          <h3>{{editTitle}} </h3>
          <i class="el-icon-close" @click="closeEditForm"></i>
        </div>
        <div v-if="editTitle === '编辑节点'" class="form-main">
          <el-form ref="nodeForm" :model="form" label-width="80px">
            <el-form-item label="节点文本">
              <el-input v-model="form.labelText" size="small" @input="changeNode('labelText', form.labelText)"></el-input>
            </el-form-item>
            <el-form-item label="字体大小">
              <el-input v-model="form.fontSize" size="small" @input="changeNode('fontSize', form.fontSize)"></el-input>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="form.fontFill" @change="changeNode('fontFill', form.fontFill)"></el-color-picker>
            </el-form-item>
            <el-form-item label="节点背景">
              <el-color-picker v-model="form.fill" @change="changeNode('fill', form.fill)"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框颜色">
              <el-color-picker v-model="form.stroke" @change="changeNode('stroke', form.stroke)"></el-color-picker>
            </el-form-item>
             <div class="see-box">
                <h5>预览</h5>
                <div class="see-item" :style="{ 'background': form.fill, 'color': form.fontFill, 'border-color': form.stroke, 'font-size': form.fontSize + 'px' }">{{form.labelText}}</div>
              </div>
          </el-form>
        </div>
        <div v-if="editTitle === '编辑图片节点'" class="form-main">
          <el-form ref="imageForm" :model="form" label-width="80px">
            <el-form-item label="节点文本">
              <el-input v-model="form.labelText" size="small" @input="changeImageNode('labelText', form.labelText)"></el-input>
            </el-form-item>
            <el-form-item label="字体颜色">
              <el-color-picker v-model="form.labelFill" @change="changeImageNode('labelFill', form.labelFill)"></el-color-picker>
            </el-form-item>
            <el-form-item label="节点背景">
              <el-color-picker v-model="form.fill" @change="changeImageNode('fill', form.fill)"></el-color-picker>
            </el-form-item>
            <el-form-item label="图片地址">
              <el-input v-model="form.xlinkHref" size="small" placeholder="图片地址" @input="changeImageNode('xlinkHref', form.xlinkHref)"></el-input>
              <el-image :src="form.xlinkHref" style="width: 80px; height: 80px; background: #f2f2f2" fit="fill"></el-image>
            </el-form-item>
            <el-form-item label="图片尺寸">
              <span style="font-size: 14px; padding-right: 5px; color: #888;">宽</span><el-input-number v-model="form.width" :min="0" label="宽" size="mini" @change="changeImageNode('width', form.width)"></el-input-number>
              <span style="font-size: 14px; padding-right: 5px; color: #888;">高</span><el-input-number v-model="form.height" :min="0" label="高" size="mini" @change="changeImageNode('height', form.height)"></el-input-number>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="editTitle === '编辑连线'" class="form-main">
          <el-form ref="edgeForm" :model="form" label-width="80px">
            <el-form-item label="标签内容">
              <el-input v-model="form.label" size="small" placeholder="标签文字，空则没有" @input="changeEdgeLabel(form.label, labelForm.fontColor, labelForm.fill, labelForm.stroke)"></el-input>
              <div v-if="form.label" class="label-style">
                <p>字体颜色：<el-color-picker v-model="labelForm.fontColor" size="mini" @change="changeEdgeLabel(form.label, labelForm.fontColor, labelForm.fill, labelForm.stroke)"></el-color-picker></p>
                <p>背景颜色：<el-color-picker v-model="labelForm.fill" size="mini" @change="changeEdgeLabel(form.label, labelForm.fontColor, labelForm.fill, labelForm.stroke)"></el-color-picker></p>
                <p>描边颜色：<el-color-picker v-model="labelForm.stroke" size="mini" @change="changeEdgeLabel(form.label, labelForm.fontColor, labelForm.fill, labelForm.stroke)"></el-color-picker></p>
              </div>
            </el-form-item>
            <el-form-item label="线条颜色">
              <el-color-picker v-model="form.stroke" size="small" @change="changeEdgeStroke"></el-color-picker>
            </el-form-item>
            <el-form-item label="线条样式">
              <el-select v-model="form.connector" size="small" placeholder="请选择" @change="changeEdgeConnector">
                <el-option label="直角" value="normal"></el-option>
                <el-option label="圆角" value="rounded"></el-option>
                <el-option label="平滑" value="smooth"></el-option>
                <el-option label="跳线(两线交叉)" value="jumpover"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线条宽度">
              <el-input-number v-model="form.strokeWidth" size="small" @change="changeEdgeStrokeWidth" :min="2" :step="2" :max="6" label="线条宽度"></el-input-number>
            </el-form-item>
            <el-form-item label="双向箭头">
              <el-switch v-model="form.isArrows" @change="changeEdgeArrows"></el-switch>
            </el-form-item>
            <el-form-item label="流动线条">
              <el-switch v-model="form.isAnit" @change="changeEdgeAnit"></el-switch>
            </el-form-item>
            <el-form-item label="调整线条">
              <el-switch v-model="form.isTools" @change="changeEdgeTools"></el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="edit-btn">
          <el-button type="danger" @click="handlerDel" style="width:100%">删除此{{editTitle === '编辑节点' ? '节点' : '连线'}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Graph, Shape } from '@antv/x6'
  import { chartData } from '@/utils/data'
  import { configSetting, configNodeShape, configNodePorts, configEdgeLabel, graphBindKey } from '@/utils/antvSetting'
  export default {
    name: "AntV6X",
    data() {
      return {
        graph: null,
        isChange: false,
        isPortsShow: false,
        menuItem: '',
        selectCell: '',
        editDrawer: false,
        editTitle: '',
        form:{},
        labelForm: {
          fontColor: '#333',
          fill: '#FFF',
          stroke: '#CACACA'
        },
        chartData: [{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"f165c785-646a-4a9e-82da-2f8d56511d8b","zIndex":0,"source":{"cell":"46f22918-8c82-4297-9963-509bce2959d5","port":"479aa8c0-3be4-4fd5-a630-6fad347597e1"},"target":{"cell":"5d35ea86-acca-4226-95fb-fb81002c21ae","port":"a5cefdea-e3d2-4ba8-8c5d-b91a39d8dbd1"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"60590637-3eca-442c-a480-730cbe788a53","zIndex":0,"source":{"cell":"46f22918-8c82-4297-9963-509bce2959d5","port":"479aa8c0-3be4-4fd5-a630-6fad347597e1"},"target":{"cell":"0e33cc55-8aaa-4852-bf4c-82ce18ce4adb","port":"d2d5cbbd-6f2b-4510-b1f9-4da71e42002c"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"94008e4a-b01d-4191-a6da-67a59136bd77","zIndex":0,"source":{"cell":"46f22918-8c82-4297-9963-509bce2959d5","port":"479aa8c0-3be4-4fd5-a630-6fad347597e1"},"target":{"cell":"e10530a3-3e1e-445f-905b-e9dc37448cb4","port":"0aa6cf4a-5580-430a-9c21-4210d0a93f3e"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"8f3139b4-2ac5-4bc3-b93a-0d945922d1c5","zIndex":0,"source":{"cell":"5d35ea86-acca-4226-95fb-fb81002c21ae","port":"43e6c5cc-fb96-4eca-8a54-a97e5b4926f7"},"target":{"cell":"23bfc0e3-9394-4d98-801f-4777face50d3","port":"2f79e94a-d1d0-4288-96bd-362fb136c761"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"13b56529-444a-4105-871b-ca172fde4fad","zIndex":0,"source":{"cell":"5d35ea86-acca-4226-95fb-fb81002c21ae","port":"43e6c5cc-fb96-4eca-8a54-a97e5b4926f7"},"target":{"cell":"613457c1-f959-4f6f-874f-c26db55c29ee","port":"7610f3c7-2538-4f02-a3cd-7154b66a222a"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"14d072dc-05c4-49ee-bf24-5629a7aea32e","zIndex":0,"source":{"cell":"0e33cc55-8aaa-4852-bf4c-82ce18ce4adb","port":"10060548-6c85-4994-b563-c6bf1bc65439"},"target":{"cell":"9dc2b2f0-8970-4be6-9fc5-9e4a39e7c986","port":"3257bb20-af80-457a-9814-ed694fd7b213"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"2211a5ed-a16f-417b-b443-d8f5f6c04927","zIndex":0,"source":{"cell":"0e33cc55-8aaa-4852-bf4c-82ce18ce4adb","port":"10060548-6c85-4994-b563-c6bf1bc65439"},"target":{"cell":"0a032291-0ce7-46e9-bc71-2ac5817ec2f7","port":"75401440-b6c7-4057-8d12-9ee6c19fb2b6"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"15307f3a-1ad4-4ba7-9fe4-2094ca979eb4","zIndex":0,"source":{"cell":"e10530a3-3e1e-445f-905b-e9dc37448cb4","port":"d75e02bc-63fe-4e18-8a7c-b9e44adbf493"},"target":{"cell":"d1c7ef8b-84d6-4e61-8d17-26e811da91c6","port":"d2dd86c8-c608-41b2-a0d5-79d1fba2f3a5"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"2c41d49b-8b2a-4f0a-a18c-60754c8e6a8e","zIndex":0,"source":{"cell":"e10530a3-3e1e-445f-905b-e9dc37448cb4","port":"d75e02bc-63fe-4e18-8a7c-b9e44adbf493"},"target":{"cell":"2583922d-f9c4-4bc0-86d0-8ef2764bb40c","port":"7f45c901-6976-44f0-b618-08605a270a0d"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"cd63e0b6-f5d1-4e24-8ba0-7c8518ef4697","zIndex":0,"source":{"cell":"23bfc0e3-9394-4d98-801f-4777face50d3","port":"a1d31842-ecbf-4432-b684-264e1b2fea4d"},"target":{"cell":"f4d040d9-2123-42ce-94ca-b5fadac950db","port":"fe08fe51-396f-47a2-a05c-f64e2847fe0a"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"23c91ecb-5937-4086-a0ed-f86cd779df9a","zIndex":0,"source":{"cell":"613457c1-f959-4f6f-874f-c26db55c29ee","port":"69ad00be-98a7-4ce6-8e82-3e3a70652019"},"target":{"cell":"f4d040d9-2123-42ce-94ca-b5fadac950db","port":"fe08fe51-396f-47a2-a05c-f64e2847fe0a"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"1f55470a-fcce-4b97-968e-685aa74244c3","zIndex":0,"source":{"cell":"9dc2b2f0-8970-4be6-9fc5-9e4a39e7c986","port":"8697af5c-9538-4b03-9819-e0510a5e86fe"},"target":{"cell":"f4d040d9-2123-42ce-94ca-b5fadac950db","port":"fe08fe51-396f-47a2-a05c-f64e2847fe0a"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"3030698c-0935-4ac0-b8a4-a8a7783c8231","zIndex":0,"source":{"cell":"0a032291-0ce7-46e9-bc71-2ac5817ec2f7","port":"28be9b1c-d8bb-475b-a71a-6804d93ed16b"},"target":{"cell":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","port":"10876425-3584-4338-be2c-2beb7b0e68c5"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"c46170cc-7faa-44cc-b075-53b79dd6d805","zIndex":0,"source":{"cell":"d1c7ef8b-84d6-4e61-8d17-26e811da91c6","port":"34844f1e-8816-4580-92df-55532aa6a161"},"target":{"cell":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","port":"10876425-3584-4338-be2c-2beb7b0e68c5"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"ebcbcfed-500b-4c8d-9695-036eae15aeb9","zIndex":0,"source":{"cell":"2583922d-f9c4-4bc0-86d0-8ef2764bb40c","port":"edc2590e-f4ff-4b75-9d45-78751dd1235a"},"target":{"cell":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","port":"10876425-3584-4338-be2c-2beb7b0e68c5"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"ceb39673-10b9-4294-9d72-fd1e1f9b5a61","zIndex":0,"source":{"cell":"f4d040d9-2123-42ce-94ca-b5fadac950db","port":"765214b9-d5e0-44d8-ab93-9ca0797fe71b"},"target":{"cell":"4c54119a-0490-4997-919a-1360408c2e70","port":"29691cab-d2fd-4679-94f4-bb2b2d6a5d7f"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"87bce413-d30a-4935-985f-cb12f626641e","zIndex":0,"source":{"cell":"f4d040d9-2123-42ce-94ca-b5fadac950db","port":"765214b9-d5e0-44d8-ab93-9ca0797fe71b"},"target":{"cell":"b9ba04e6-e90e-4ae9-9e04-ce6c53f4e3d2","port":"46278bb9-e302-4809-9d0b-c5059cd31f88"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"3234a17e-76ee-4887-88a2-18eb8641b15f","zIndex":0,"source":{"cell":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","port":"2e9c79d5-0a24-4262-9e81-6fc9bc0f7551"},"target":{"cell":"33cdc090-c250-494a-83e4-638c15ff1634","port":"5891b15d-4dc9-44e1-a80e-925af9dac2af"}},{"shape":"edge","attrs":{"line":{"stroke":"#A2B1C3","targetMarker":{"name":"block","width":12,"height":8}}},"id":"07d09dd9-be39-480f-a156-c45e341e1bf8","zIndex":0,"source":{"cell":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","port":"2e9c79d5-0a24-4262-9e81-6fc9bc0f7551"},"target":{"cell":"bf58c260-33b0-4a8a-b86a-83908c5fb3b9","port":"43cce789-6d31-47fb-a0b5-b6b8beadbd29"}},{"position":{"x":490,"y":6},"size":{"width":80,"height":80},"attrs":{"text":{"text":"交换机"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/1.e507ae2f.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"46f22918-8c82-4297-9963-509bce2959d5","data":{"type":"exchange"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"cac6d18a-a2a3-4357-9473-9a447f628972"},{"group":"right","id":"04e0ae8a-18a6-44ae-8372-c440a5129bdb"},{"group":"bottom","id":"479aa8c0-3be4-4fd5-a630-6fad347597e1"},{"group":"left","id":"85496fe3-3224-453a-a95e-2c232423d39d"}]},"zIndex":1},{"position":{"x":203,"y":139},"size":{"width":80,"height":80},"attrs":{"text":{"text":"交换机"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/1.e507ae2f.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"5d35ea86-acca-4226-95fb-fb81002c21ae","data":{"type":"exchange"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"a5cefdea-e3d2-4ba8-8c5d-b91a39d8dbd1"},{"group":"right","id":"0d6b2b19-14bf-4eae-b826-42be071767c4"},{"group":"bottom","id":"43e6c5cc-fb96-4eca-8a54-a97e5b4926f7"},{"group":"left","id":"bea95247-e524-42f2-b206-2bec45b28b4b"}]},"zIndex":2},{"position":{"x":490,"y":139},"size":{"width":80,"height":80},"attrs":{"text":{"text":"交换机"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/1.e507ae2f.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"0e33cc55-8aaa-4852-bf4c-82ce18ce4adb","data":{"type":"exchange"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"d2d5cbbd-6f2b-4510-b1f9-4da71e42002c"},{"group":"right","id":"89e02d06-6e76-4008-a6f3-51f36871d696"},{"group":"bottom","id":"10060548-6c85-4994-b563-c6bf1bc65439"},{"group":"left","id":"f26e6768-1828-49fc-8e42-a77c44544a02"}]},"zIndex":3},{"position":{"x":802,"y":139},"size":{"width":80,"height":80},"attrs":{"text":{"text":"交换机"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/1.e507ae2f.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"e10530a3-3e1e-445f-905b-e9dc37448cb4","data":{"type":"exchange"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"0aa6cf4a-5580-430a-9c21-4210d0a93f3e"},{"group":"right","id":"0c599540-3810-4162-9f8e-2937e97ee562"},{"group":"bottom","id":"d75e02bc-63fe-4e18-8a7c-b9e44adbf493"},{"group":"left","id":"ccc1e28d-d30d-4224-bc2f-bf9922be29a8"}]},"zIndex":4},{"position":{"x":123,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"23bfc0e3-9394-4d98-801f-4777face50d3","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"2f79e94a-d1d0-4288-96bd-362fb136c761"},{"group":"right","id":"c0e3821e-4571-4b54-a222-8e047d4ea357"},{"group":"bottom","id":"a1d31842-ecbf-4432-b684-264e1b2fea4d"},{"group":"left","id":"67cbbd2b-fd08-4f05-a3fd-7a83f4f2759d"}]},"zIndex":5},{"position":{"x":265,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"613457c1-f959-4f6f-874f-c26db55c29ee","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"7610f3c7-2538-4f02-a3cd-7154b66a222a"},{"group":"right","id":"1094b589-4e6b-4a36-895a-ea482b7b8285"},{"group":"bottom","id":"69ad00be-98a7-4ce6-8e82-3e3a70652019"},{"group":"left","id":"9c974832-76f2-4773-b845-5a0d4bcd8f7d"}]},"zIndex":6},{"position":{"x":410,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"9dc2b2f0-8970-4be6-9fc5-9e4a39e7c986","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"3257bb20-af80-457a-9814-ed694fd7b213"},{"group":"right","id":"59380a00-9b48-4bc1-85dc-78a7c1df517b"},{"group":"bottom","id":"8697af5c-9538-4b03-9819-e0510a5e86fe"},{"group":"left","id":"bcc95a2b-1da4-49fe-86e9-f4a2ba67107c"}]},"zIndex":7},{"position":{"x":566,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"0a032291-0ce7-46e9-bc71-2ac5817ec2f7","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"75401440-b6c7-4057-8d12-9ee6c19fb2b6"},{"group":"right","id":"70c74fc7-1d6e-4ba3-8c1a-103f5950f5ae"},{"group":"bottom","id":"28be9b1c-d8bb-475b-a71a-6804d93ed16b"},{"group":"left","id":"a23b28b9-5fcf-4107-98bd-3d65e6530850"}]},"zIndex":8},{"position":{"x":872,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"2583922d-f9c4-4bc0-86d0-8ef2764bb40c","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"7f45c901-6976-44f0-b618-08605a270a0d"},{"group":"right","id":"e0753ae0-6fbf-44ad-a299-abdc5dc6ec7c"},{"group":"bottom","id":"edc2590e-f4ff-4b75-9d45-78751dd1235a"},{"group":"left","id":"60b8c4cd-d17f-4d87-a594-a871ddc3ca29"}]},"zIndex":9},{"position":{"x":265,"y":427},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"f4d040d9-2123-42ce-94ca-b5fadac950db","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"fe08fe51-396f-47a2-a05c-f64e2847fe0a"},{"group":"right","id":"dead8fe2-d520-41ef-89a8-bff49861fb00"},{"group":"bottom","id":"765214b9-d5e0-44d8-ab93-9ca0797fe71b"},{"group":"left","id":"edbd20fe-fbc1-40dd-b606-603b2c1105ac"}]},"zIndex":10},{"position":{"x":722,"y":427},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"12061c28-a7b0-46ca-bd55-ef7201a8a0f9","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"10876425-3584-4338-be2c-2beb7b0e68c5"},{"group":"right","id":"ba89133d-926b-46a8-8fa8-6af7908f754f"},{"group":"bottom","id":"2e9c79d5-0a24-4262-9e81-6fc9bc0f7551"},{"group":"left","id":"ed80184e-56db-4a57-93ee-1e8c1ca509e5"}]},"zIndex":11},{"position":{"x":163,"y":576},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"4c54119a-0490-4997-919a-1360408c2e70","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"29691cab-d2fd-4679-94f4-bb2b2d6a5d7f"},{"group":"right","id":"eb347a53-1e6e-4108-b769-73aa594cdefa"},{"group":"bottom","id":"ecff05d0-5190-4e5e-bc8e-2c9c8401c17d"},{"group":"left","id":"caac82df-1b25-4ac2-acea-ff35f1de6763"}]},"zIndex":12},{"position":{"x":359,"y":573},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"b9ba04e6-e90e-4ae9-9e04-ce6c53f4e3d2","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"46278bb9-e302-4809-9d0b-c5059cd31f88"},{"group":"right","id":"ee76a411-41ee-4e30-95d4-24703d74fc5b"},{"group":"bottom","id":"4b4b3d85-8294-4c7f-8908-7989a111f080"},{"group":"left","id":"0c383fd2-eb70-4fad-b783-0d9282210b4c"}]},"zIndex":13},{"position":{"x":616,"y":570},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"33cdc090-c250-494a-83e4-638c15ff1634","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"5891b15d-4dc9-44e1-a80e-925af9dac2af"},{"group":"right","id":"3596ff71-de1f-458b-96dc-3f087ff0e53e"},{"group":"bottom","id":"34f97ba9-9cbe-4c83-ae5c-d63fa46ffbf1"},{"group":"left","id":"fe7bb437-3159-495b-a00a-87c95f429128"}]},"zIndex":14},{"position":{"x":832,"y":576},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"bf58c260-33b0-4a8a-b86a-83908c5fb3b9","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"43cce789-6d31-47fb-a0b5-b6b8beadbd29"},{"group":"right","id":"d63d68b1-ab94-4ce0-a6ae-09bd79594550"},{"group":"bottom","id":"f93fd5c9-9fac-47b1-b36c-eca71dda2a03"},{"group":"left","id":"3eba1a86-7f28-499f-a9c4-48d83f816626"}]},"zIndex":15},{"position":{"x":722,"y":280},"size":{"width":80,"height":80},"attrs":{"text":{"text":"服务器"},"body":{"stroke":"#fff","fill":"#fff"},"image":{"width":80,"height":80,"refX":0,"refY":0,"xlinkHref":"img/2.b96395e6.png"},"label":{"fontSize":14,"fill":"#333","text":""}},"visible":true,"shape":"rect","id":"d1c7ef8b-84d6-4e61-8d17-26e811da91c6","data":{"type":"server"},"markup":[{"tagName":"rect","selector":"body"},{"tagName":"image"},{"tagName":"text","selector":"label"}],"ports":{"items":[{"group":"top","id":"d2dd86c8-c608-41b2-a0d5-79d1fba2f3a5"},{"group":"right","id":"a32666d4-16b8-4b7e-aab0-6f6d59989b07"},{"group":"bottom","id":"34844f1e-8816-4580-92df-55532aa6a161"},{"group":"left","id":"c5022715-8c7d-4eac-a01b-3477c825c826"}]},"zIndex":16}]
      }
    },
    created() {
    },
    watch:{
      value:{
        handler: function(){
          if(this.graph){
            this.isChange = false
            this.isPortsShow = false
            this.menuItem = ''
            this.selectCell = ''
            this.editDrawer = false
            this.graph.dispose()
            this.initGraph()
          }
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {
      this.initGraph()
      // this.getNewChartData()
    },
    beforeDestroy() {
      this.graph.dispose()
    },
    methods: {
      getNewChartData(){
        console.log(this.chartData)
        this.chartData.forEach((item, index)=>{
          console.log(index, item)
        })
      },
      // 链接桩的显示与隐藏，主要是照顾菱形
      changePortsShow(val){
        const container = document.getElementById('wrapper')
        const ports = container.querySelectorAll('.x6-port-body')
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = val ? 'visible' : 'hidden'
        }
      },
      // 初始化渲染画布
      initGraph(){
        const graph = new Graph({
          container: document.getElementById('wrapper'),
          ...configSetting(Shape)
        })
        // 画布事件
        graph.on('node:mouseenter', () => {
          this.changePortsShow(true)
        })
        graph.on('node:mouseleave', () => {
          if(this.isPortsShow) return
          this.changePortsShow(false)
        })
        // 点击编辑
        graph.on('cell:click', ({ cell }) => {
          this.editForm(cell)
        })
        // 画布键盘事件
        graphBindKey(graph)
        // 删除
        graph.bindKey(['delete','backspace'], () => {
          this.handlerDel()
        })
        // 赋值
        this.graph = graph
        // 返现方法
        const resArr = chartData
        // 导出的时候删除了链接桩设置加回来
        const portsGroups = configNodePorts().groups
        if(resArr.length){
          const jsonTemp = resArr.map(item=>{
            if(item.ports) item.ports.groups = portsGroups 
            return item
          })
          graph.fromJSON(jsonTemp)
        }
        // 画布有变化
        graph.on('cell:changed', () => { 
          this.isChangeValue()
        })
      },
      // 画布是否有变动
      isChangeValue(){
        if(!this.isChange) {
          this.isChange = true
          this.$emit('cellChanged', true)
        }
      },
      menuDrag(type){
        this.menuItem = configNodeShape(type)
      },
      drop(event){
        const nodeItem = {
          ...this.menuItem,
          x: event.offsetX - (this.menuItem.width / 2),
          y: event.offsetY - (this.menuItem.height / 2),
          ports: configNodePorts()
        }
        // 创建节点
        this.graph.addNode(nodeItem)
        this.isChangeValue()
      },
      editForm(cell){
        if(this.selectCell) this.selectCell.removeTools() // 删除修改线的工具
        this.selectCell = cell
        // 编辑node节点
        if(cell.isNode() && cell.data.type && cell.data.type.includes('default')){
          this.editTitle = '编辑节点'
          const body = cell.attrs.body || cell.attrs.rect || cell.attrs.polygon || cell.attrs.circle
          this.form = {
            labelText: cell.attrs.label.text || '',
            fontSize: cell.attrs.label.fontSize || 14,
            fontFill: cell.attrs.label.fill || '',
            fill: body.fill|| '',
            stroke: body.stroke || ''
          }
          return this.editDrawer = true
        }
        // 编辑图片节点
        if(cell.isNode() && cell.data.type && (cell.data.type === 'otherImage' || cell.data.type === 'exchange' || cell.data.type === 'server')){
          this.editTitle = '编辑图片节点'
          const attrs = cell.attrs || { body:{fill: ''}, label: {text: '', fill: ''}, image:{xlinkHref: '', height:  80, width: 80} }
          this.form = {
            fill: attrs.body.fill,
            labelText: attrs.label.text,
            labelFill: attrs.label.fill,
            height: (attrs.image && attrs.image.height) || 80,
            width: (attrs.image && attrs.image.width) || 80,
            xlinkHref: (attrs.xlinkHref && attrs.image.xlinkHref) || 'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg'
          }
          return this.editDrawer = true
        }
        // 编辑线
        if(!cell.isNode() && cell.shape === 'edge'){
          this.editTitle = '编辑连线'
          this.form = {
            label: (cell.labels && cell.labels[0]) ? cell.labels[0].attrs.labelText.text : '',
            stroke: cell.attrs.line.stroke || '',
            connector: 'rounded',
            strokeWidth: cell.attrs.line.strokeWidth || '',
            isArrows: cell.attrs.line.sourceMarker ? true : false,
            isAnit: cell.attrs.line.strokeDasharray ? true : false,
            isTools: false
          }
          // 看是否有label
          const edgeCellLabel = cell.labels && cell.labels[0] && cell.labels[0].attrs || false
          if(this.form.label && edgeCellLabel){
            this.labelForm = {
              fontColor: edgeCellLabel.labelText.fill || '#333',
              fill: edgeCellLabel.labelBody.fill || '#fff',
              stroke: edgeCellLabel.labelBody.stroke || '#CACACA'
            }
          } else {
            this.labelForm = { fontColor: '#333', fill: '#FFF', stroke: '#CACACA' }
          }
          return this.editDrawer = true
        }
      },
      closeEditForm(){
        this.editDrawer = false
        if(this.selectCell) this.selectCell.removeTools()
      },
      // 修改一般节点
      changeNode(type, value){
        switch (type) {
          case 'labelText':
            this.selectCell.attr('label/text', value)
            break;
          case 'fontSize':
            this.selectCell.attr('label/fontSize', value)
            break;
          case 'fontFill':
            this.selectCell.attr('label/fill', value)
            break;
          case 'fill':
            this.selectCell.attr('body/fill', value)
            break;
          case 'stroke':
            this.selectCell.attr('body/stroke', value)
            break;
        }
      },
      // 修改图片节点
      changeImageNode(type, value){
        switch (type) {
          case 'labelText':
            this.selectCell.attr('label/text', value)
            break;
          case 'labelFill':
            this.selectCell.attr('label/fill', value)
            break;
          case 'fill':
            this.selectCell.attr('body/fill', value)
            break;
          case 'xlinkHref':
            this.selectCell.attr('image/xlinkHref', value)
            break;
          case 'height':
            this.selectCell.attr('image/height', value)
            break;
          case 'width':
            this.selectCell.attr('image/width', value)
            break;
        }
      },
      // 修改边label属性
      changeEdgeLabel(label, fontColor, fill, stroke){
        this.selectCell.setLabels([configEdgeLabel(label, fontColor, fill, stroke)])
        if(!label) this.labelForm = { fontColor: '#333', fill: '#FFF', stroke: '#CACACA' }
      },
      // 修改边的颜色
      changeEdgeStroke(val){
        this.selectCell.attr('line/stroke', val)
      },
      // 边的样式
      changeEdgeConnector(val){
        switch (val) {
          case 'normal':
            this.selectCell.setConnector(val)
          break;
          case 'smooth':
            this.selectCell.setConnector(val)
          break;
            case 'rounded':
            this.selectCell.setConnector(val, { radius: 20 })
          break;
            case 'jumpover':
            this.selectCell.setConnector(val, { radius: 20 })
          break;
        }
      },
      // 边的宽度
      changeEdgeStrokeWidth(val){
        if(this.form.isArrows){
          this.selectCell.attr({
            line: {
              strokeWidth: val,
              sourceMarker: {
                width: 12 * (val / 2) || 12,
                height: 8 * (val / 2) || 8
              },
              targetMarker: {
                width: 12 * (val / 2) || 12,
                height: 8 * (val / 2) || 8
              }
            }
          })

        } else {
          this.selectCell.attr({
            line: {
              strokeWidth: val,
              targetMarker: {
                width: 12 * (val / 2) || 12,
                height: 8 * (val / 2) || 8
              }
            }
          })
        }
        
      },
      // 边的箭头
      changeEdgeArrows(val){
        if(val){
          this.selectCell.attr({
            line: {
              sourceMarker: {
                name: 'block',
                width: 12 * (this.form.strokeWidth / 2) || 12,
                height: 8 * (this.form.strokeWidth / 2) || 8
              },
              targetMarker: {
                name: 'block',
                width: 12 * (this.form.strokeWidth / 2) || 12,
                height: 8 * (this.form.strokeWidth / 2) || 8
              },
            }
          })
        } else {
          this.selectCell.attr({
            line: {
              sourceMarker: '',
              targetMarker: {
                name: 'block',
                size: 10 * (this.form.strokeWidth / 2) || 10
              },
            }
          })
        }
      },
      // 边的添加蚂蚁线
      changeEdgeAnit(val){
        if(val){
          this.selectCell.attr({
            line: {
              strokeDasharray: 5,
              style: {
                animation: 'ant-line 30s infinite linear',
              }
            }
          })
        } else {
          this.selectCell.attr({
            line: {
              strokeDasharray: 0,
              style: {
                animation: '',
              }
            }
          })
        }
      },
      // 给线添加调节工具
      changeEdgeTools(val){
        if(val) this.selectCell.addTools(['vertices', 'segments'])
        else this.selectCell.removeTools()
      },
      // 删除节点
      handlerDel(){
        this.$confirm(`此操作将永久删除此${this.editTitle === '编辑节点' ? '节点' : '连线'}, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const cells = this.graph.getSelectedCells()
          if (cells.length) {
            this.graph.removeCells(cells)
            this.form = {}
            this.editDrawer = false
            this.$message({type: 'success',message: '删除成功!'})
          }
        }).catch(() => {})
      },
      // 导出
      handlerSend(){
        // 我在这里删除了链接桩的设置，和工具（为了减少数据），反显的时候要把删除的链接桩加回来
        const {cells: jsonArr} = this.graph.toJSON()
        const tempGroupJson = jsonArr.map(item=>{
          if(item.ports && item.ports.groups) delete item.ports.groups
          if(item.tools) delete item.tools
          return item
        })
        if(this.selectCell){
          this.selectCell.removeTools()
          this.selectCell = ''
        }
        this.$emit('finish', JSON.stringify(tempGroupJson))
        localStorage.setItem('chartData', JSON.stringify(tempGroupJson))
        console.log(JSON.stringify(tempGroupJson))
        this.$message({
          type: 'success',
          message: '保存成功,  3 秒后进入预览页面'
        })
        setTimeout(()=>{
          this.$router.push({
            path: '/antvShow'
          })
        }, 3000)
      },
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
.all{
  border-radius: 8px;
  overflow: hidden;
}
.antv-content{
  background: #fff;
  display: flex;
  overflow: hidden;
  position: relative;
  .antv-menu{
    width: 200px;
    border-right: 1px solid #d5d5d5;
    padding: 10px;
    h3{
      padding: 10px;
    };
    li{
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #555;
      background: #fff;
      margin: 5px 10px;
      font-size: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.5s ease;
      &:hover{
        box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.3);
      }
      i{
        font-size: 18px;
        margin-right: 10px;
      }
      strong{
        flex: 1;
      }
    }
    img{
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
  }
  .antv-wrapper{
    flex: 1;
    position: relative;
    .wrapper-canvas{
      position: relative;
      height: 100vh;
      min-height: 720px;
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
}
i.icon-oval{
    display: inline-block;
    width: 16px;
    height: 10px;
    border-radius: 10px;
    border: 2px solid #555;
}
i.icon-square{
    display: inline-block;
    width: 16px;
    height: 10px;
    border: 2px solid #555;
}
i.icon-ysquare{
   display: inline-block;
    width: 16px;
    height: 10px;
    border-radius: 4px;
    border: 2px solid #555;
}
i.icon-rhombus{
   display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #555;
    transform: rotate(45deg);
}
i.icon-rhomboid{
   display: inline-block;
    width: 10px;
    height: 10px;
    border: 2px solid #555;
    transform: skew(-30deg);
}
i.icon-circle{
   display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 16px;
    border: 2px solid #555;
}
.edit-main{
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 280px;
  border-left: 1px solid #f2f2f2;
  box-shadow: 0 -10px 10px rgba($color: #000000, $alpha: 0.3);
  padding: 20px;
  background: #fff;
  box-sizing: border-box;
  .edit-main-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3{
      flex: 1;
    }
    i{
      cursor: pointer;
      font-size: 20px;
      opacity: 0.7;
      &:hover{
        opacity: 1;
      }
    }
  }
  
  .form-main{
    padding: 20px 0;
    .label-style{
      background: #f2f2f2;
      padding: 0 10px;
      p{
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  }
  .edit-btn{
  }
  .see-box{
  padding: 20px;
    background: #f2f2f2;
    h5{
      padding-bottom: 10px;
    }
    .see-item{
      padding: 10px 30px;
      border: 2px solid #333;
      text-align: center;
    }
  }
}
.wrapper-btn{
  text-align: center;
  padding: 20px;
  button{
    width: 100%;
  }
}
</style>
