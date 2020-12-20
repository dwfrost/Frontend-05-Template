const { time } = require('console')

function layout(element) {
  if (!element.computedStyle) return

  // 样式预处理
  const elementStyle = getStyle(element)

  // 只处理flex布局
  if (elementStyle.display !== 'flex') return

  // 过滤出所有元素节点
  const items = element.children.filter((item) => item.type === 'element')
  items
    .sort((a, b) => (a.order || 0) - (b.order || 0))

    [('width', 'height')].forEach((size) => {
      if (elementStyle[size] === 'auto' || elementStyle[size] === '') {
        // 统一判断为null
        elementStyle[size] = null
      }
    })

  // 默认值设置
  if (!elementStyle.flexDirection || elementStyle.flexDirection === 'auto') {
    elementStyle.flexDirection = 'row'
  }
  if (!elementStyle.alignItems || elementStyle.alignItems === 'auto') {
    elementStyle.alignItems = 'strech'
  }
  if (!elementStyle.justifyContent || elementStyle.justifyContent === 'auto') {
    elementStyle.justifyContent = 'flex-start'
  }
  if (!elementStyle.flexWrap || elementStyle.flexWrap === 'auto') {
    elementStyle.flexWrap = 'nowrap'
  }
  if (!elementStyle.alignContent || elementStyle.alignContent === 'auto') {
    elementStyle.alignContent = 'strech'
  }

  let mainSize,
    mainStart,
    mainEnd,
    mainSign,
    mainBase,
    crossSize,
    crossStart,
    crossEnd,
    crossSign,
    crossBase
  if (elementStyle.flexDirection === 'row') {
    mainSize = 'width'
    mainStart = 'left'
    mainEnd = 'right'
    mainSign = +1 // 排列正反方向
    mainBase = 0 // 从哪里开始
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (elementStyle.flexDirection === 'row-reverse') {
    mainSize = 'width'
    mainStart = 'right'
    mainEnd = 'left'
    mainSign = -1
    mainBase = elementStyle.width
    crossSize = 'height'
    crossStart = 'top'
    crossEnd = 'bottom'
  }
  if (elementStyle.flexDirection === 'column') {
    mainSize = 'height'
    mainStart = 'top'
    mainEnd = 'bottom'
    mainSign = +1
    mainBase = 0
    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (elementStyle.flexDirection === 'column-reverse') {
    mainSize = 'height'
    mainStart = 'bottom'
    mainEnd = 'top'
    mainSign = -1
    mainBase = elementStyle.height
    crossSize = 'width'
    crossStart = 'left'
    crossEnd = 'right'
  }
  if (elementStyle.flexWrap === 'wrap-reverse') {
    let tmp = crossStart
    crossStart = crossEnd
    crossEnd = tmp
    crossSign = -1
  } else {
    crossSign = 1
    crossBase = 0
  }

  let isAutoMainSize = false
  if (!elementStyle[mainSize]) {
    elementStyle[mainSize] = 0

    // 看不懂 ??
    // for (let i = 0; i < items.length; i++) {
    //   const item =items[i]
    //   if(itemStyle){}
    // }
    isAutoMainSize = true
  }

  let flexLine = []
  let flexLines = [flexLine]

  // 计算主轴尺寸
  let mainSpace = elementStyle[mainSize] // 主轴剩余空间
  let crossSpace = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemStyle = getStyle(item)

    if (itemStyle[mainSize] === null) {
      itemStyle[mainSize] = 0
    }

    if (itemStyle.flex) {
      // 元素可伸缩，不换行
      flexLine.push(item)
    } else if (elementStyle.flexWrap === 'nowrap' && isAutoMainSize) {
      // 不换行
      mainSpace -= itemStyle[mainSize]
      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
        flexLine.push(item)
      }
    } else {
      // 换行
      if (itemStyle[mainSize] > elementStyle[mainSize]) {
        // 有些元素的尺寸比父元素主轴尺寸还大
        itemStyle[mainSize] = elementStyle[mainSize]
      }

      // 如果剩余的空间放不下一个元素了，就要换行
      if (mainSpace < itemStyle[mainSize]) {
        item.mainSpace = mainSpace
        item.crossSpace = crossSpace
        flexLine = [item]
        flexLines.push(flexLine)

        mainSpace = elementStyle[mainSize]
        crossSpace = 0
      } else {
        // 疑问??不会走到这里来吧
        flexLine.push(item)
      }

      if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== void 0) {
        crossSpace = Math.max(crossSpace, itemStyle[crossSize])
      }

      mainSpace -= itemStyle[mainSize]
    }
  }

  flexLine.mainSpace = mainSpace
  console.log('items', items)

  if (elementStyle.flexWrap === 'nowrap' || isAutoMainSize) {
    flexLine.crossSpace =
      elementStyle[crossSize] !== undefined
        ? elementStyle[crossSize]
        : crossSpace
  } else {
    flexLine.crossSpace = crossSpace
  }

  if (mainSpace < 0) {
    // 单行的情况
    const scale = elementStyle[mainSize] / (elementStyle[mainSize] - mainSpace)
    const currentMain = mainBase
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)
      if (itemStyle.flex) {
        // 不参与压缩
        itemStyle[mainSize] = 0
      }
      itemStyle[mainSize] = itemStyle[mainSize] * scale
      itemStyle[mainStart] = currentMain
      itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize]
      currentMain = itemStyle[mainEnd]
    }
  } else {
    // 多行逻辑
    flexLines.forEach((items) => {
      const { mainSpace } = items
      let flexTotal = 0

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        const itemStyle = getStyle(item)
        if (itemStyle.flex !== null || itemStyle.flex !== void 0) {
          flexTotal += itemStyle.flex
          continue
        }
      }

      if (flexTotal > 0) {
        // 有flex元素
        const currentMain = mainBase
        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          const itemStyle = getStyle(item)
          if (itemStyle.flex) {
            itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex
          }
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd]
        }
      } else {
        // 无flex元素，根据justifyContent分配
        let currentMain, step // 元素的间隔数量
        if (elementStyle.justifyContent === 'flex-start') {
          currentMain = mainBase
          step = 0
        }
        if (elementStyle.justifyContent === 'flex-end') {
          currentMain = mainSpace * mainSize + mainBase
          step = 0
        }
        if (elementStyle.justifyContent === 'center') {
          currentMain = (mainSpace / 2) * mainSize + mainBase
          step = 0
        }
        if (elementStyle.justifyContent === 'space-between') {
          currentMain = mainBase
          step = (mainSpace / (items.length - 1)) * mainSign
        }
        if (elementStyle.justifyContent === 'space-around') {
          step = (mainSpace / items.length) * mainSign
          currentMain = step / 2 + mainBase
        }

        for (let i = 0; i < items.length; i++) {
          const item = items[i]
          itemStyle[mainStart] = currentMain
          itemStyle[mainEnd] =
            itemStyle[mainStart] + mainSign * itemStyle[mainSize]
          currentMain = itemStyle[mainEnd] + step
        }
      }
    })
  }

  // 计算交叉轴尺寸
  let crossSpace
  if (!elementStyle[crossSize]) {
    crossSpace = 0
    elementStyle[crossSize] = 0
    for (let i = 0; i < flexLines.length; i++) {
      elementStyle[crossSize] =
        elementStyle[crossSize] + flexLines[i].crossSpace
    }
  } else {
    crossSpace = elementStyle[crossSize]
    for (let i = 0; i < flexLines.length; i++) {
      crossSpace -= flexLines[i].crossSpace
    }
  }

  if (elementStyle.flexWrap === 'wrap-reverse') {
    crossBase = elementStyle[crossSize]
  } else {
    crossBase = 0
  }

  let lineSize = elementStyle[crossSize] / flexLines.length
  let step
  if (elementStyle.alignContent === 'flex-start') {
    crossBase += 0 // ??
    step = 0
  }
  if (elementStyle.alignContent === 'flex-end') {
    crossBase += crossSign * crossSpace
    step = 0
  }
  if (elementStyle.alignContent === 'center') {
    crossBase += (crossSign * crossSpace) / 2
    step = 0
  }
  if (elementStyle.alignContent === 'space-between') {
    crossBase += 0
    step = crossSpace / (flexLines.length - 1)
  }
  if (elementStyle.alignContent === 'space-around') {
    step = crossSpace / flexLines.length
    crossBase += (crossSign * step) / 2
  }
  if (elementStyle.alignContent === 'stretch') {
    crossBase += 0
    step = 0
  }

  flexLines.forEach((items) => {
    let lineCrossSize =
      elementStyle.alignContent === 'stretch'
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      const itemStyle = getStyle(item)

      const align = itemStyle.alignSelf || elementStyle.alignItems

      if (itemStyle[crossSize] === null) {
        itemStyle[crossSize] = align === 'strech' ? lineCrossSize : 0
      }
      if (align === 'flex-start') {
        itemStyle[crossStart] = crossBase
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }
      if (align === 'flex-end') {
        itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize
        itemStyle[crossStart] =
          itemStyle[crossEnd] - crossSign * itemStyle[crossSize]
      }
      if (align === 'center') {
        itemStyle[crossStart] =
          crossBase + (crossSign * (lineCrossSize - itemStyle[crossSize])) / 2
        itemStyle[crossEnd] =
          itemStyle[crossStart] + crossSign * itemStyle[crossSize]
      }
      if (align === 'stretch') {
        itemStyle[crossStart] = crossBase
        // itemStyle[crossEnd]=crossBase+crossSign *
        // itemStyle[crossSize] =
      }
    }
    crossBase += crossSign * (lineCrossSize + step)
  })
}

function getStyle(element) {
  if (!element.style) {
    element.style = {}
  }

  for (let prop in element.computedStyle) {
    // const {value} = element.computedStyle

    element.style[prop] = element.computedStyle[prop].value

    if (element.style[prop].toString().match(/px$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }

    if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
      element.style[prop] = parseInt(element.style[prop])
    }
  }

  return element.style
}

module.exports = {
  layout,
}
