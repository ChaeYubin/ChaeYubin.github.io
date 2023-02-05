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
