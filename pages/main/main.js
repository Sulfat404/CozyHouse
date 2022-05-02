import arrOfPets from "../../assets/data/pets.js";

const burger = document.querySelector(".burger__wrapper-sticks");
const header = document.querySelector(".header");
const navBar = document.querySelector(".navbar__list");
const navBarItems = document.querySelectorAll(".navbar__item");

// buttons
const btnRigth_Step = document.querySelector(".btn-circle__right");
const btnLeft_Step = document.querySelector(".btn-circle__left");
let setOfCards; //Для поп-апа


burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkWindowSize);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});
btnRigth_Step.addEventListener("click", moveGallaryOneStep);
btnLeft_Step.addEventListener("click", moveGallaryOneStep);

// Cards begin
let shuffledArrs;
let cards;
let pages;
let btnStep = 1;

function initCards() {
  cards = checkWindowSizeForGallary();
  shuffledArrs = createPseudorandomArr(cards);
  let shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}

initCards();

if (burger.classList.contains("header-open")) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}

function burgerOpen() {
  if (burger.classList.contains("header-open")) {
    return burgerClose();
  }
  burger.classList.add("header-open");
  navBar.classList.add("header-open");
  header.classList.add("header-open");
}

function burgerClose() {
  let arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach((elem) => {
    elem.classList.remove("header-open");
  });
}

function checkWindowSize() {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}


// gallary
function checkWindowSizeForGallary() {
  let windowInnerWidth = document.documentElement.clientWidth;
  let cards;
  if (1280 <= windowInnerWidth) {
    cards = 3;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    cards = 2;
  } else { // 768 > windowInnerWidth
    cards = 1;
  }
  return cards;
}

function createPseudorandomArr(cards) {
  // Берет массив объектов из data.js, рандомизирует и конкатинирует в один псевдослучайный массив
  let shuffledArrs = [];
  let shuffleArr = arrOfPets
  .map((i) => [Math.random(), i])
  .sort()
  .map((i) => i[1]);
  shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
  return shuffledArrs;
}


function generateCard(shuffledArrsForRender) {
  const gallaryItems = document.querySelector(".gallary__items_pMain");
  gallaryItems.innerHTML = "";
  for (let card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += `<div class="card card_pMain">
              <div>
                  <img src=${shuffledArrsForRender[card - 1].img} alt="${shuffledArrsForRender[card-1].name}">
              </div>
              <p class="title card__subtitle">${shuffledArrsForRender[card - 1].name}</p>
              <button class="btn__style-transparent">Learn more</button>
          </div>`;
  }
  setOfCards = document.querySelectorAll(".card_pMain");
}


function moveGallaryOneStep() {
  initCards()
}

setOfCards.forEach((card) => card.addEventListener("click", renderPopup))

function renderPopup() {
  let wrapperForPopup = document.querySelector(".body");
  console.log(wrapperForPopup);
}


// filter
const arr = [3, 6, 2, 9, 10, 1];

const map = (arr, fn) => {

}