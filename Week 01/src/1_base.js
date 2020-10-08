const rootDom = document.querySelector('#root')

const pattern = [
  [2, 0, 0],
  [0, 1, 0],
  [0, 0, 0],
]

function show() {
  // 遍历，并渲染
  for (let i = 0; i < pattern.length; i++) {
    const innerArr = pattern[i]
    for (let j = 0; j < innerArr.length; j++) {
      console.log('inner-value', innerArr[j])
      const innerValue = innerArr[j]
      const innerText = innerValue === 2 ? '⭕' : innerValue === 1 ? '❌' : ''
      console.log(innerText)
      const innerBox = document.createElement('div')
      innerBox.classList.add('cell')
      innerBox.innerHTML = innerText
      rootDom.appendChild(innerBox)
    }
  }
}
