(function () {
  "use strict";

  const $eye = document.querySelector(".fa-eye");
  const $eyeSlash = document.querySelector(".fa-eye-slash");
  const $password = document.querySelector(".password");

  $eye.addEventListener("click", () => {
    $eye.classList.toggle("hide");
    $eyeSlash.classList.toggle("hide");
    $password.type = "text";
  });

  $eyeSlash.addEventListener("click", () => {
    $eye.classList.toggle("hide");
    $eyeSlash.classList.toggle("hide");
    $password.type = "password";
  });

  // 헤더전체 시작
  const $up = document.querySelector(".header-up");
  const $upX = document.querySelector(".header-up .fa-xmark");
  const $barIcon = document.querySelector(".fa-bars");
  const $barMenu = document.querySelector(".bar-menu");
  const $cartIcon = document.querySelector(".fa-cart-shopping");
  const $cartMenu = document.querySelector(".cart-menu");
  const $cartX = document.querySelector(".cart-right-title .fa-xmark");

  $upX.addEventListener("click", () => {
    $up.style.display = "none";
  });
  $barIcon.addEventListener("click", () => {
    if ($barMenu.classList.contains("hidden")) {
      $barMenu.classList.toggle("hidden");
      $cartMenu.classList.toggle("hidden", true);
      $barMenu.classList.remove("menu-off");
      $barMenu.classList.add("menu-on");
    } else {
      $barMenu.classList.remove("menu-on");
      $barMenu.classList.add("menu-off");
      setTimeout(() => {
        $barMenu.classList.toggle("hidden");
        $cartMenu.classList.toggle("hidden", true);
      }, 1400);
    }
  });
  $cartIcon.addEventListener("click", () => {
    if ($cartMenu.classList.contains("hidden")) {
      $cartMenu.classList.toggle("hidden");
      $barMenu.classList.toggle("hidden", true);
      $cartMenu.classList.remove("cart-off");
      $cartMenu.classList.add("cart-on");
    }
  });
  $cartX.addEventListener("click", () => {
    if (!$cartMenu.classList.contains("hidden")) {
      $cartMenu.classList.remove("cart-on");
      $cartMenu.classList.add("cart-off");
      setTimeout(() => {
        $cartMenu.classList.toggle("hidden");
        $barMenu.classList.toggle("hidden", true);
      }, 900);
    }
  });
  //헤더끝
})();

const $pw = document.querySelector(".pwA");
const $pwC = document.querySelector(".pwC");
const $btn = document.querySelector(".login-btn");
$btn.type = "button";
$btn.addEventListener("click", () => {
  if ($pw.value !== $pwC.value) {
    alert("확인 비밀번호가 다릅니다");
  } else {
    $btn.type = "submit";
  }
});