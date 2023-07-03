// 基本设置
export const configSetting = (Shape) => {
  return {
    grid: true,
    autoResize: true,
    translating: { restrict: true },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: {
        name: 'normal',
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
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
    onToolItemCreated({ tool }) {
      const handle = tool
      const options = handle.options
      if (options && options.index % 2 === 1) {
        tool.setAttrs({ fill: 'red' })
      }
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
    resizing: true,
    rotating: true,
    selecting: {
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
    },
    snapline: true,
    keyboard: true,
    clipboard: true
  }
}

// 节点预设类型 （0椭圆形: defaultOval, 1方形: defaultSquare, 2圆角矩形: defaultYSquare, 3菱形: defaultRhombus, 4平行四边形: defaultRhomboid, 5圆形: defaultCircle, 6图片: otherImage)
export const configNodeShape = (type) => {
  /**
   * 
   *  加入data里面的标识type是为了方便编辑的时候找到相对应的类型进行不同的编辑处理
   *  另外获取初始对应的设置
  */
  const nodeShapeList = [
    {
      label: "图片",
      data: {
        type: 'otherImage'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#5F95FF',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: 'https://gw.alipayobjects.com/zos/bmw-prod/2010ac9f-40e7-49d4-8c4a-4fcf2f83033b.svg',
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '图片'
        },
      },
    },
    {
      label: "DC交换机",
      data: {
        type: 'exchangeDC'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/1.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: 'DC交换机',
          y:"3.3em"
        },
      },
    },
    {
      label: "25G接入交换机",
      data: {
        type: 'exchange25G'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/1.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '25G接入交换机',
          y:"3.3em"
        },
      },
    },
    {
      label: "万兆接入交换机",
      data: {
        type: 'exchangeWanzhao'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/1.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '万兆接入交换机',
          y:"3.3em"
        },
      },
    },{
      label: "管理交换机",
      data: {
        type: 'exchangeGuanli'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/1.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '管理交换机',
          y:"3.3em"
        },
      },
    },
    {
      label: "LVS服务器",
      data: {
        type: 'serverLVS'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/2.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: 'LVS服务器',
          y:"3.3em"
        },
      },
    }
    ,
    {
      label: "管理服务器",
      data: {
        type: 'serverGuanli'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/2.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '管理服务器',
          y:"3.3em"
        },
      },
    },
    {
      label: "4U缓存服务器-鲲鹏",
      data: {
        type: 'server4U'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/2.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '4U缓存服务器-鲲鹏',
          y:"3.3em"
        },
      },
    },
    {
      label: "直播缓存服务器",
      data: {
        type: 'serverZhibo'
      },
      shape: 'rect',
      width: 80,
      height: 80,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#fff',
          fill: '#fff',
        },
        image: {
          width: 80,
          height: 80,
          refX: 0,
          refY: 0,
          xlinkHref: require("@/assets/2.png"),
        },
        label: {
          fontSize: 14,
          fill: '#333',
          text: '直播缓存服务器',
          y:"3.3em"
        },
      },
    }
  ]
  if (type) {
    const obj = nodeShapeList.find(item => { return item.data.type === type })
    return obj || nodeShapeList
  }
  return nodeShapeList
}

// 节点连接装设置
export const configNodePorts = () => {
  return {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ]
  }
}

// 连线 label 设置
export const configEdgeLabel = (labelText, fontColor, fill, stroke) => {
  if (!labelText) return { attrs: { labelText: { text: '' }, labelBody: { fill: '', stroke: '' } } }
  return {
    markup: [
      {
        tagName: 'rect',
        selector: 'labelBody',
      },
      {
        tagName: 'text',
        selector: 'labelText',
      },
    ],
    attrs: {
      labelText: {
        text: labelText || '',
        fill: fontColor || '#333',
        textAnchor: 'middle',
        textVerticalAnchor: 'middle',
      },
      labelBody: {
        ref: 'labelText',
        refX: -8,
        refY: -5,
        refWidth: '100%',
        refHeight: '100%',
        refWidth2: 16,
        refHeight2: 10,
        stroke: stroke || '#555',
        fill: fill || '#fff',
        strokeWidth: 2,
        rx: 5,
        ry: 5,
      },
    }
  }
}

// 键盘事件
export const graphBindKey = (graph) => {
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })
  //undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })
  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
      graph.select(nodes)
    }
  })
  //delete
  /*
  graph.bindKey('delete', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })
  */
  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom()
    if (zoom < 1.5) {
      graph.zoom(0.1)
    }
  })
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom()
    if (zoom > 0.5) {
      graph.zoom(-0.1)
    }
  })
  return graph
}