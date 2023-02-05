// 텍스트 타이핑 효과는 다시 호출할 일이 없는 코드이다.
// 따라서, 즉시 실행 함수 형태로 코드를 정리한다.

(function () {
  // span 요소 노드 가져오기
  const spanEl = document.querySelector("main h2 span");

  // 화면에 표시할 문장 배열
  const textArr = ["Front-End Developer", "Android Developer"];

  // 배열의 인덱스 초깃값
  let index = 0;

  // 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤, 문자 단위로 쪼개 배열로 만들기
  let currentText = textArr[index].split("");

  function writeText() {
    spanEl.textContent += currentText.shift();

    if (currentText.length !== 0) {
      // currentText 배열의 길이가 0이 아니라면 -> 아직 모두 출력하지 않은 상태
      setTimeout(writeText, Math.floor(Math.random() * 100)); // 랜덤 초마다 writeText() 함수 호출
    } else {
      // currentText 배열이 비었을 때(문자열을 모두 출력했을 때)
      currentText = spanEl.textContent.split(""); // 출력했던 문자열을 다시 담고
      setTimeout(deleteText, 3000); // 3초 후 삭제한다.
    }
  }

  function deleteText() {
    currentText.pop(); // currentText에 담긴 마지막 요소를 제거
    spanEl.textContent = currentText.join(""); // currenText에 담겨있는 문자들을 하나의 문자열로 합친 후 화면에 보여주기
    if (currentText.length !== 0) {
      setTimeout(deleteText, Math.floor(Math.random() * 100));
    } else {
      index = (index + 1) % textArr.length;
      currentText = textArr[index].split("");
      writeText();
    }
  }

  writeText();
})();

// 웹 브라우저의 스크롤이 내려갔는지 확인하여 클래스 추가하기
const headerEl = document.querySelector("header");
const vh = document.documentElement.clientHeight - headerEl.clientHeight;

window.addEventListener("scroll", () => {
  const browserScrollY = window.pageYOffset;

  if (browserScrollY > 0) {
    // 스크롤되었다면
    headerEl.classList.add("active"); // 클래스 추가

    if (browserScrollY > vh) {
      headerEl.classList.add("shadow");
    }

    if (browserScrollY <= vh) {
      headerEl.classList.remove("shadow");
    }
  } else {
    headerEl.classList.remove("active"); // 클래스 삭제
  }
});

// 애니메이션 스크롤 이동
const animationMove = (selector) => {
  // selector 매개변수로 이동할 대상 요소 노드 가져오기
  const targetEl = document.querySelector(selector);
  // 현재 웹 브라우저의 스크롤 정보(y값)
  const browserScrollY = window.pageYOffset;
  // 이동할 대상의 위치(y값)
  const targetScrollY = targetEl.getBoundingClientRect().top + browserScrollY;
  // 스크롤 이동
  window.scrollTo({ top: targetScrollY, behavior: "smooth" });
};

// 스크롤 이벤트 연결
const scrollMoveEl = document.querySelectorAll("[data-animation-scroll='true'");
for (let i = 0; i < scrollMoveEl.length; i++) {
  scrollMoveEl[i].addEventListener("click", function (e) {
    const target = this.dataset.target;
    animationMove(target);
  });
}

/* 버블 넣기 */
const root = document.querySelector("#bubble");
let innerHeight = document.getElementById("about").clientHeight;
let innerWidth = document.getElementById("about").clientWidth;

// 화면 너비 변경이 감지되었을 때
window.onresize = function () {
  setBubbleBackgroundSize();
};

function setBubbleBackgroundSize() {
  console.log("화면 너비 변경됨");
  innerHeight = document.getElementById("about").clientHeight;
  innerWidth = document.getElementById("about").clientWidth;
  console.log(innerHeight, innerWidth);
}

class Bubble {
  constructor() {
    this.bubbleSpan = undefined;
    this.handleNewBubble(); // 새로운 버블 생성
    this.color = this.randomColor(); // 배경색상 랜덤으로 설정
    // this.color = "red";

    // 버블의 크기 세팅
    this.height = this.randomNumber(60, 20); // 버블 크기는 20~60px
    this.width = this.height;

    this.posY = this.randomNumber(innerHeight, 20);
    this.posX = this.randomNumber(innerWidth - 2 * this.width, 20);

    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";

    this.bubbleEnd.call(this.bubbleSpan, this.randomNumber(6000, 3000)); // 버블 삭제는 3~6초가 걸림
  }

  // DOM에 새로운 버블을 그린다.
  handleNewBubble() {
    this.bubbleSpan = document.createElement("span");
    this.bubbleSpan.classList.add("bubble");
    root.append(this.bubbleSpan);
    this.handlePosition();
  }

  // 버블 여러개의 위치를 핸들링하는 함수
  handlePosition() {
    // 생성자에서 랜덤으로 지정된 배경색, 크기로 설정
    this.bubbleSpan.style.backgroundColor = this.color;
    this.bubbleSpan.style.height = this.height + "px";
    this.bubbleSpan.style.width = this.height + "px";

    // 버블을 그릴 위치를 구한다.
    this.posX = this.randomNumber(innerWidth - 2 * this.width, 20);
    this.posY = this.randomNumber(innerHeight - this.height, 20);

    // 위에서 구한 위치로 이동시키기
    this.bubbleSpan.style.top = this.posY + "px";
    this.bubbleSpan.style.left = this.posX + "px";

    // 랜덤한 시간마다 다시 포지셔닝한다.
    const randomSec = this.randomNumber(5000, 3500);
    setTimeout(this.handlePosition.bind(this), randomSec); // re-position
  }

  bubbleEnd(removingTime = 0) {
    setTimeout(
      () => {
        requestAnimationFrame(() => this.classList.add("bubble--bust"));
      },
      removingTime === 0 ? removingTime : removingTime - 100
    );

    setTimeout(() => {
      requestAnimationFrame(() => this.remove());
      requestAnimationFrame(() => new Bubble());
    }, removingTime);
  }

  randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  randomColor() {
    return `rgba(
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)},
        ${this.randomNumber(0, 255)}, 
        ${this.randomNumber(0.1, 1)})`;
  }
}

setInterval(function () {
  requestAnimationFrame(() => new Bubble());
}, 3000);
