"use strict";

// 마우스 커서 이모티콘 캐릭터로 변경
const mouseCursor = document.querySelector(".cursor");

window.addEventListener("scroll", getMousePositionScroll);
window.addEventListener("mousemove", getMousePosition);

let mouseX = 0;
let mouseY = 0;
let mouseClientY = 0;
let mousePageY = 0;
function getMousePositionScroll() {
  mouseY = document.documentElement.scrollTop + mouseClientY;
}

function getMousePosition(e) {
  mouseX = e.clientX + 50;
  mouseClientY = e.clientY + 50;
  mousePageY = e.pageY;

  getMousePositionScroll();
  // console.log('move : ' + mouseY);
}

function moveCursor() {
  const cursorStyle = getComputedStyle(mouseCursor);
  let m_x = parseInt(cursorStyle.left.replace("px", ""));
  let m_y = parseInt(cursorStyle.top.replace("px", ""));

  mouseCursor.style.left = Math.round(m_x + (mouseX - m_x) / 5) + "px";
  mouseCursor.style.top = Math.round(m_y + (mouseY - m_y) / 5) + "px";
}
setInterval("moveCursor()", 30);

// fixed 버튼 스크롤 탑으로 이동
const $btnScrollToTop = document.querySelector("#btnScrollToTop");
const $totop = document.querySelector(".detailContainer");
$btnScrollToTop.addEventListener("click", function () {
  // window.scrollTo(0,0);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

//감정 feelList clk클릭 이벤트 클릭시 이동하기
//토글 만들기
const $iClk = document.querySelectorAll(".clickE");

const $btnScrollToImotion = document.querySelectorAll(".im");

// const imgs = btnScrollToImotion.querySelectorAll('.btnScrollToImotion>img');

const $cursor1 = document.getElementById("cursor");
// console.log($cursor1);

$btnScrollToImotion.forEach((img, idx) => {
  //   console.log(img.src);
  img.addEventListener("click", (e) => {
    $cursor1.style.backgroundImage = `url(${e.target.src})`;
  });
});

// Swiper 배경 스와이퍼 처리

let swVisual = new Swiper(".swvisual", {
  effect: "fade",
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  navigation: {
    prevEl: ".swvisual-prev",
    nextEl: ".swvisual-next",
  },
});

// 반응형 리사이즈 사이즈 변경 태블릿 사이즈
function tabResize() {
  if (matchMedia("screen and (max-width: 834px)").matches) {
    // 834px 태블릿 사이즈 이하  AOS 애니메이션 삭제
    const $ul = document.querySelectorAll("ul");

    for (let i = 0; i < $ul.length; i++) {
      $ul[i].removeAttribute("data-aos");
    }
  }
}
tabResize();

//BEST , LIST 이미지 마우스 호버 이미지 변경
const $bestList = document.querySelector(".bestList");
const $productList = document.querySelector(".productList");
const $thumImg = document.createElement("IMG");

// jason 페치
fetch("json/best.json")
  .then((res) => res.json())
  .then((result) => {
    makeList(result);
  });
fetch("json/list.json")
  .then((res) => res.json())
  .then((result1) => {
    listList(result1);
  });

// BEST LIST
function makeList(items) {
  items.forEach((item, idx) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
        <div>
                <div class="best_img">
                    <img src="${item.img_picture}" alt=""  transition: all 0.2s; class="ww" cover ;>
                </div>
            
           
            <div class="best_text">
                    <ul class="imti">
                        <li class="heartBtn"><i class="fi fi-rr-heart"></i></li>
                        <li class="buyBtn"><i class="fi fi-rr-shopping-cart"></i></li>
                    </ul>
                <span>${item.product_number}</span>
                <h4>${item.product_name}</h4>
                <h4>${item.price}</h4>
            </div>
        </div>
      `;

    $bestList.appendChild($li);
  });

  const $ww = document.querySelectorAll(".ww");
  $ww.forEach((item, idx) => {
    item.addEventListener("mouseover", () => {
      item.src = `${items[idx].img_overEffect}`;
    });
    item.addEventListener("mouseout", () => {
      item.src = `${items[idx].img_picture}`;
    });
  });
}

// LIST LIST
function listList(items) {
  items.forEach((item, idx) => {
    const $li = document.createElement("li");

    $li.innerHTML = `
      <div>
          <div class="list_img">
              <img src="${item.img_picture}" alt="" class="ff" cover;>
          </div>
          <div class="list_text">
                <ul class="imti">
                    <li class="heartBtn"><i class="fi fi-rr-heart"></i></li>
                    <li><i class="fi fi-rr-shopping-cart"></i></li>
                </ul>
              <span>${item.product_number}</span>
              <h4>${item.product_name}</h4>
              <h4>${item.price}</h4>
          </div>
      </div>`;

    $productList.appendChild($li);
  });

  // hoverEvent(items);
  const $ff = document.querySelectorAll(".ff");
  $ff.forEach((item, idx) => {
    item.addEventListener("mouseover", () => {
      item.src = `${items[idx].img_overEffect}`;
    });
    item.addEventListener("mouseout", () => {
      item.src = `${items[idx].img_picture}`;
    });
  });

  //heart 좋아요 버튼 클릭 토글 이벤트 하트 버튼 색깔
  const $heartBtn = document.querySelectorAll(".heartBtn");
  const $heart = document.querySelectorAll(".heartBtn i");
  const $buyBtn = document.querySelector(".buyBtn");

  $heartBtn.forEach((icon) => {
    icon.addEventListener("click", (ico) => {
      ico.target.classList.toggle("fi-rr-heart");
      ico.target.classList.toggle("fi-ss-heart");
    });
  });
}
