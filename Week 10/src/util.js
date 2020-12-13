const css = require('css')

// 把css规则收集到一个数组
let rules = []

function match(element, selector) {
  // console.log('element', element)
  // console.log('selector', selector)
  if (!selector || !element.attributes) {
    return false
  }
  // 匹配id,class,标签选择器
  if (selector.charAt(0) === '#') {
    // console.log('element', element)
    // console.log('selector', selector)
    const attr = element.attributes.find((item) => item.name === 'id')
    // console.log('attr', attr)
    if (attr && attr.value === selector.replace('#', '')) {
      return true
    }
  } else if (selector.charAt(0) === '.') {
    const attr = element.attributes.find((item) => item.name === 'class')
    if (attr && attr.value === selector.replace('.', '')) {
      return true
    }
  } else {
    if (element.tagName === selector) {
      return true
    }
  }

  return false
}

function specificity(selector) {
  const p = [0, 0, 0, 0]
  const selectorParts = selector.split(' ')
  for (let part of selectorParts) {
    if (part.charAt(0) === '#') {
      p[1] += 1
    } else if (part.charAt(0) === '.') {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compare(sp1, sp2) {
  if (sp1[0] - sp2[0]) {
    return sp1[0] - sp2[0]
  }

  if (sp1[1] - sp2[1]) {
    return sp1[1] - sp2[1]
  }
  if (sp1[2] - sp2[2]) {
    return sp1[2] - sp2[2]
  }

  return sp1[3] - sp2[3]
}
module.exports = {
  // 添加CSS规则
  addCSSRules(text) {
    var ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
    // console.log('rules', JSON.stringify(rules))
    return rules
  },

  // 计算CSS
  computeCSS(element, stack) {
    // console.log('element', element)
    // console.log('stack', stack)
    const elements = stack.slice().reverse()

    if (!element.computedStyle) {
      element.computedStyle = {}
    }

    for (let rule of rules) {
      const selectorParts = rule.selectors[0].split(' ').reverse()
      if (!match(element, selectorParts[0])) {
        continue
      }

      let matched = false

      let j = 1

      // 遍历元素的父元素
      for (let i = 0; i < elements.length; i++) {
        // 父元素是否在选择器中匹配
        if (match(elements[i], selectorParts[j])) {
          j++
        }
      }

      // 都匹配到了，就置为true
      if (j >= selectorParts.length) {
        matched = true
      }
      if (matched) {
        const sp = specificity(rule.selectors[0])
        // 匹配上了，就加入computedStyle
        const { computedStyle } = element
        for (let declaration of rule.declarations) {
          if (!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {}
          }
          computedStyle[declaration.property].value = declaration.value

          // css选择器优先级
          if (!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].specificity = sp
          } else if (
            compare(computedStyle[declaration.property].specificity, sp) < 0
          ) {
            computedStyle[declaration.property].specificity = sp
          }
        }
      }
    }
    console.log('computedStyle', element.computedStyle)
  },
}
