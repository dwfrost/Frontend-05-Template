import { TimeLine, Animation } from "./animation";

// 获取元素，添加动画
const timeline = new TimeLine();
window.tl = timeline;
const el = document.querySelector(".animation");
const template = (v) => `translateX(${v}px)`;
window.animation = new Animation(
  el.style,
  "transform",
  0,
  500,
  2000,
  1000,
  null,
  template
);
tl.add(animation);
tl.start();

const pauseEl = document.querySelector(".pause");
let flag = true;

pauseEl.addEventListener("click", () => {
  if (flag) {
    flag = false;
    pause();
  } else {
    resume();
  }
});

// 暂停动画
function pause() {
  tl.pause();
  pauseEl.innerHTML = "恢复";
}

// 恢复动画
function resume() {
  tl.resume();
  pauseEl.innerHTML = "暂停";
}
