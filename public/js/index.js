const introText = document.querySelectorAll("span");

window.onload = () => {
  let timer = 100;
  introText.forEach((item) => {
    item.style.animation = `fade 1000ms ${(timer += 100)}ms forwards`;
  });
};

const $start = document.querySelectorAll("img");
const $even = document.querySelectorAll("span:nth-child(even)");
let delay = 0;

$start.forEach((item) => {
  item.addEventListener("click", () => {
    introText.forEach((e) => {
      e.style.animation = null;
      e.style.opacity = 1;
      e.style.animation = `smoky both`;
      e.style.animationDuration = "3s";
    });
    $even.forEach((e) => {
      e.style.animation = null;
      e.style.opacity = 1;
      e.style.animation = `smoky-mirror both`;
      e.style.animationDuration = "3s";
    });
    introText.forEach((e) => {
      e.style.animationDelay = `${(delay += 50)}ms`;
    });
  });
});

const $happy = document.querySelector('#happy')
const $bored = document.querySelector('#bored')
const $nervous = document.querySelector('#nervous')
const $angry = document.querySelector('#angry')
const $sad = document.querySelector('#sad')
const $lonely = document.querySelector('#lonely')
$nervous.addEventListener('mouseover', (e) => {
  e.target.style.animationName = "nervousHover";
})
$happy.addEventListener('mouseover', (e) => {
  e.target.style.animationName = 'happyHover'
  e.target.style.animationDelay = '0s'
})
$bored.addEventListener('mouseover', (e) => {
  e.target.style.animationName = 'boredHover'
})
$angry.addEventListener('mouseover', (e) => {
  e.target.style.animationName = 'angryHover'
  e.target.style.animationDelay = "0s";
})
$sad.addEventListener('mouseover', (e) => {
  e.target.style.animationName = 'sadHover'
})
$lonely.addEventListener('mouseover', (e) => {
  e.target.style.animationName = 'lonelyHover'
})
