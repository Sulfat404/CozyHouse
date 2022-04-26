import arrOfPets from "../../assets/data/pets.js";

// variables
// for menu-burger
const burger = document.querySelector(".burger__wrapper-sticks");
const header = document.querySelector(".header");
const navBar = document.querySelector(".navbar__list");
const navBarItems = document.querySelectorAll(".navbar__item");

// for gallary
let startNumCards = 0;

// buttons
const btnRigth_Step = document.querySelector(".btn-circle_right-oneStep");
const btnRight_All = document.querySelector(".btn-circle_rightAll");
const btnsRight = document.querySelectorAll(".btn-circle_right");
const btnLeft_All = document.querySelector(".btn-circle_leftAll");
const btnLeft_Step = document.querySelector(".btn-circle_left-oneStep");
const btnsLeft = document.querySelectorAll(".btn-circle_left");
const btnNumber = document.querySelector(".btn-circle_number");

// Cards begin
let shuffledArrs;
let cards;
let pages;
let btnStep = 1;

function initCards() {
  [cards, pages] = checkWindowSizeForGallary();
  // Генерируется псевдо-массив с 48 карточками
  shuffledArrs = createPseudorandomArr(cards, pages);
  let shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}


window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", initCards);
burger.addEventListener("click", burgerOpen);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});
btnRigth_Step.addEventListener("click", moveGallaryOneStepRight);
btnRight_All.addEventListener("click", moveGallaryAllRight);
btnLeft_Step.addEventListener("click", moveGallaryOneStepLeft);
btnLeft_All.addEventListener("click", moveGallaryAllLeft);



if (burger.classList.contains("header-open")) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}

// burger
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

function checkWindowSize(event) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}


// gallary
function checkWindowSizeForGallary() {
  let windowInnerWidth = document.documentElement.clientWidth;
  let cards;
  let pages;
  if (1280 <= windowInnerWidth) {
    cards = 8;
    pages = 6;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    cards = 6;
    pages = 8;
  } else { // 768 > windowInnerWidth
    cards = 3;
    pages = 16;
  }
  return [cards, pages];
}

function createPseudorandomArr(cards, pages) {
  // Берет массив объектов из data.js, рандомизирует и конкатинирует в один псевдослучайный массив
  let shuffledArrs = [];
  for (let page = 1; page <= pages; page++) {
    let shuffleArr = arrOfPets
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1]);
    shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
  };
  return shuffledArrs;
}


function generateCard(shuffledArrsForRender) {
  const gallaryItems = document.querySelector(".gallary__items");
  gallaryItems.innerHTML = "";
  for (let card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += `<div class="card card__pPets">
              <div>
                  <img src=${shuffledArrsForRender[card - 1].img} alt="${shuffledArrsForRender[card-1].name}">
              </div>
              <p class="title card__subtitle">${shuffledArrsForRender[card - 1].name}</p>
              <button class="btn__style-transparent">Learn more</button>
          </div>`;
  }
}

function changeNumBtn(btnStep) {
  btnNumber.innerHTML = `<span>${btnStep}</span>`;
}

function removeClasses_disabled() {
  let btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
  btnsDisabled.forEach((item) => item.classList.remove("btn-circle_disabled"));
}


function moveGallaryOneStepRight() {
  // Проверка на наличие класса disabled
  if(btnRigth_Step.classList.contains("btn-circle_disabled")) {
    return;
  }
  // Убирается класс btn-circle_disabled
  removeClasses_disabled();
  // Генерация новых карточек, выбор из псевдослучайного массива
  startNumCards += cards;
  let shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards+cards)
  generateCard(shuffledArrsForRender);
  // Смена номера на кнопке
  btnStep +=1;
  changeNumBtn(btnStep);
  // Проверка на конец списка
  if (startNumCards === shuffledArrs.length - cards) {
    btnsRight.forEach((item) => item.classList.add("btn-circle_disabled"));
  }
}


function moveGallaryOneStepLeft() {
  // Проверка на наличие класса disabled
  if(btnLeft_Step.classList.contains("btn-circle_disabled")) {
    return;
  }
	// Убираем класс disabled у дургих кнопок
  removeClasses_disabled()

  // Генерация новых карточек, выбор из псевдослучайного массива
  startNumCards -= cards;
  let shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards+cards)
  generateCard(shuffledArrsForRender);

  // Кнопка с цифрой
  btnStep -=1;
  changeNumBtn(btnStep);
  // Проверка на конец списка
  if (startNumCards === 0) {
    btnsLeft.forEach((item) => item.classList.add("btn-circle_disabled"));
  }
}


function moveGallaryAllRight() {
  // Проверка на наличие класса disabled
  if (btnRigth_Step.classList.contains("btn-circle_disabled")) {
    return;
  }
  // Генерация новых карточек, выбор из псевдослучайного массива
  startNumCards = shuffledArrs.length - cards;
  let shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards+cards)
  generateCard(shuffledArrsForRender);

  // Кнопка с цифрой
  btnStep = pages;
  changeNumBtn(btnStep);

	// Убираем класс disabled у дургих кнопок
  removeClasses_disabled()
  // Добавляем класс disabled
  btnsRight.forEach((item) => item.classList.add("btn-circle_disabled"));
}

function moveGallaryAllLeft() {
    // Проверка на наличие класса disabled
    if (btnLeft_Step.classList.contains("btn-circle_disabled")) {
      return;
    }

    // Убираем класс disabled у других кнопок
    removeClasses_disabled();

    // Добавляем класс disabled
    btnsLeft.forEach((item) => item.classList.add("btn-circle_disabled"));

    // Генерация новых карточек, выбор из псевдослучайного массива
    startNumCards = 0;
    let shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards+cards)
    generateCard(shuffledArrsForRender);
  
    // Кнопка с цифрой
    btnStep = 1;
    changeNumBtn(btnStep);
}
