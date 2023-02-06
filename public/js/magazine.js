(function () {
  ("use strict");

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
  const $image = document.querySelectorAll(".image");
  const $aa = document.querySelectorAll(".aa");
  const track = document.querySelector(".image-track");
  const $container = document.querySelectorAll(".container");

  const handleOnDown = (e) => {
    track.dataset.mouseDownAt = e.clientX;
  };

  const handleOnUp = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
  };

  const handleOnMove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -50;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    track.dataset.percentage = nextPercentage;

    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );

    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };

  const handleOnMove2 = (e) => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -50;
    const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -200);
    if (window.innerWidth < 836) {
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -400);
    }
    if (window.innerWidth < 414) {
      nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -800);
      
    }

    track.dataset.percentage = nextPercentage;

    $container.forEach((e) => {
      e.animate(
        {
          transform: `translate(${nextPercentage}%)`,
        },
        { duration: 1200, fill: "forwards" }
      );
    });
  };

  $image.forEach((item, i) => {
    item.addEventListener("click", () => {
      track.style.flexDirection = "column";
      track.style.gap = "20px";
      track.style.left = "3%";
      track.style.top = "55%";
      track.classList.add("image-track2");

      window.onmousemove = (e) => handleOnMove2(e);
      window.ontouchmove = (e) => handleOnMove2(e.touches[0]);

      $image.forEach((item, idx) => {
        item.style.width = "80px";
        item.style.height = "80px";
        item.style.borderRadius = "0";
        item.style.filter = "brightness(0.7)";
        item.classList.toggle("border", idx === i);
      });

      $aa.forEach((item, idx) => {
        item.classList.toggle("hidden", idx !== i);
      });
    });
  });

  /* -- Had to add extra lines for touch events -- */
  window.onmousedown = (e) => handleOnDown(e);
  window.ontouchstart = (e) => handleOnDown(e.touches[0]);
  window.onmouseup = (e) => handleOnUp(e);
  window.ontouchend = (e) => handleOnUp(e.touches[0]);
  window.onmousemove = (e) => handleOnMove(e);
  window.ontouchmove = (e) => handleOnMove(e.touches[0]);

  const $box = document.querySelectorAll('.box')

  $box.forEach((e) => {
    e.addEventListener('click', () => {
      location.pathname = '/magazineDetail'
    })
  })
})();
