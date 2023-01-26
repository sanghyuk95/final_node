(function () {
  "use strict";
  // window resize 스와이퍼
  window.addEventListener("resize", (e) => {
    if (window.innerWidth <= 680) {
      swiper.enable();
    } else if (window.innerWidth > 680) {
      swiper.slideTo(0, 0);
      swiper.disable();
    }
  });
  // 카테고리 호버
  const $tag = document.querySelectorAll(".hashtag");
  const $cardBox = document.querySelector("#cardBox");
  const $cate = document.querySelector("#category");

  for (let i = 0; i < $tag.length; i++) {
    if (!$tag[i].classList.contains("textHover")) {
      $tag[i].addEventListener("mouseover", (e) => {
        e.target.classList.toggle("textHover");
      });
      $tag[i].addEventListener("mouseout", (e) => {
        e.target.classList.toggle("textHover");
      });
    }
  }

  //카테고리 클릭

  // $cate.addEventListener("click", (e) => {
  //   e.target.classList.toggle("tagClick", true);
  //   for (let i = 0; i < $tag.length; i++) {
  //     if (e.target != $tag[i]) {
  //       $tag[i].classList.toggle("textHover", false);
  //       $tag[i].classList.toggle("tagClick", false);
  //     }
  //   }
  // });

  $tag.forEach((e) => {
    e.addEventListener("click", (e) => {
      console.log(e.target.classList);
      e.target.classList.toggle("tagClick", true);
      for (let i = 0; i < $tag.length; i++) {
        if (e.target != $tag[i]) {
          $tag[i].classList.toggle("textHover", false);
          $tag[i].classList.toggle("tagClick", false);
        }
      }
    });
  });

  // $tag.addEventListener('click', e => {

  // })

  // 스와이퍼 클래스 넣어주기
  // $cardBox.firstElementChild.classList.add("swiper");
  // $cate.classList.add("swiper-wrapper");
  // for (let i = 0; i < $tag.length; i++) {
  //   $tag[i].classList.add("swiper-slide");
  // }

  let swiper = new Swiper(".swiper", {
    slideToClickedSlide: true,
    spaceBetween: 50,

    pagination: { el: ".swiper-pagination" },

    scrollbar: { nel: ".swiper-scrollbar" },
  });
  // 스와이퍼막기
  if (window.innerWidth <= 680) {
    swiper.enable();
  } else if (window.innerWidth > 680) {
    swiper.disable();
  }
})();
