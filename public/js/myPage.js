// 헤더전체 시작
const $barIcon = document.querySelector(".fa-bars");
const $barMenu = document.querySelector(".bar-menu");
const $cartIcon = document.querySelector(".fa-cart-shopping");
const $cartMenu = document.querySelector(".cart-menu");
const $cartX = document.querySelector(".cart-right-title .fa-xmark");

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

const $checkAll = document.querySelector("#checkAll");
const $check = document.querySelectorAll("#checkbox");

$checkAll.addEventListener("change", ({ target }) => {
  $check.forEach((e) => {
    e.checked = target.checked;
  });
});

const $camera = document.querySelector(".fa-camera-rotate");
const $modal = document.querySelector(".modal");
const $modalX = document.querySelector(".modal .fa-xmark");

$camera.addEventListener("click", () => {
  $modal.classList.remove("hidden");
});
$modalX.addEventListener("click", () => {
  $modal.classList.add("hidden");
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("preview").src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    document.getElementById("preview").src = "";
  }
}
