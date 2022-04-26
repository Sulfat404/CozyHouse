import arrOfPets from "../../assets/data/pets.js";

// variables
const burger = document.querySelector(".burger__wrapper-sticks");
const header = document.querySelector(".header");
const navBar = document.querySelector(".navbar__list");
const navBarItems = document.querySelectorAll(".navbar__item");

// buttons
const btnRigth_Step = document.querySelector(".wrapper__btn-circle-left");
const btnLeft_Step = document.querySelector(".wrapper__btn-circle-right");


burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});

// Cards begin
let shuffledArrs;
let cards;
let pages;
let btnStep = 1;

function initCards() {
  cards = checkWindowSizeForGallary();
  // Генерируется псевдо-массив с 48 карточками
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

function checkSize() {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
}

// gallary
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
  for (let set = 1; set <= 2; set++) {
    let shuffleArr = arrOfPets
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1]);
    shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
    console.log(shuffledArrs)
  };
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
}

function changeNumBtn(btnStep) {
  btnNumber.innerHTML = `<span>${btnStep}</span>`;
}

// function removeClasses_disabled() {
//   let btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
//   btnsDisabled.forEach((item) => item.classList.remove("btn-circle_disabled"));
// }


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

