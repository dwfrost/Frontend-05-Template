const light = document.querySelector('#light')

const [greenCircle, yellowCircle, redCircle] = document.querySelectorAll(
  '.circle'
)

lightsWork()

async function lightsWork() {
  greenCircle.classList.add('green')
  await delay(1)
  greenCircle.classList.remove('green')
  yellowCircle.classList.add('yellow')
  await delay(1)
  yellowCircle.classList.remove('yellow')
  redCircle.classList.add('red')
  await delay(1)
  redCircle.classList.remove('red')
  lightsWork()
}

function delay(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}
