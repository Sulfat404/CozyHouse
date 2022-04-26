"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// variables
var burger = document.querySelector(".burger__wrapper-sticks");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list");
var navBarItems = document.querySelectorAll(".navbar__item"); // buttons

var btnRigth_Step = document.querySelector(".wrapper__btn-circle-left");
var btnLeft_Step = document.querySelector(".wrapper__btn-circle-right");
burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
navBarItems.forEach(function (navBarItem) {
  navBarItem.addEventListener("click", burgerClose);
}); // Cards begin

var shuffledArrs;
var cards;
var pages;
var btnStep = 1;

function initCards() {
  cards = checkWindowSizeForGallary(); // Генерируется псевдо-массив с 48 карточками

  shuffledArrs = createPseudorandomArr(cards);
  var shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}

initCards();

if (burger.classList.contains("header-open")) {
  var windowInnerWidth = document.documentElement.clientWidth;

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
  var arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach(function (elem) {
    elem.classList.remove("header-open");
  });
}

function checkSize() {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  }
} // gallary


function checkWindowSize(event) {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  }
} // gallary


function checkWindowSizeForGallary() {
  var windowInnerWidth = document.documentElement.clientWidth;
  var cards;

  if (1280 <= windowInnerWidth) {
    cards = 3;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    cards = 2;
  } else {
    // 768 > windowInnerWidth
    cards = 1;
  }

  return cards;
}

function createPseudorandomArr(cards) {
  // Берет массив объектов из data.js, рандомизирует и конкатинирует в один псевдослучайный массив
  var shuffledArrs = [];

  for (var set = 1; set <= 2; set++) {
    var shuffleArr = _pets["default"].map(function (i) {
      return [Math.random(), i];
    }).sort().map(function (i) {
      return i[1];
    });

    shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
    console.log(shuffledArrs);
  }

  ;
  return shuffledArrs;
}

function generateCard(shuffledArrsForRender) {
  var gallaryItems = document.querySelector(".gallary__items_pMain");
  gallaryItems.innerHTML = "";

  for (var card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += "<div class=\"card card_pMain\">\n              <div>\n                  <img src=".concat(shuffledArrsForRender[card - 1].img, " alt=\"").concat(shuffledArrsForRender[card - 1].name, "\">\n              </div>\n              <p class=\"title card__subtitle\">").concat(shuffledArrsForRender[card - 1].name, "</p>\n              <button class=\"btn__style-transparent\">Learn more</button>\n          </div>");
  }
}

function changeNumBtn(btnStep) {
  btnNumber.innerHTML = "<span>".concat(btnStep, "</span>");
} // function removeClasses_disabled() {
//   let btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
//   btnsDisabled.forEach((item) => item.classList.remove("btn-circle_disabled"));
// }


function moveGallaryOneStepRight() {
  // Проверка на наличие класса disabled
  if (btnRigth_Step.classList.contains("btn-circle_disabled")) {
    return;
  } // Убирается класс btn-circle_disabled


  removeClasses_disabled(); // Генерация новых карточек, выбор из псевдослучайного массива

  startNumCards += cards;
  var shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards + cards);
  generateCard(shuffledArrsForRender); // Смена номера на кнопке

  btnStep += 1;
  changeNumBtn(btnStep); // Проверка на конец списка

  if (startNumCards === shuffledArrs.length - cards) {
    btnsRight.forEach(function (item) {
      return item.classList.add("btn-circle_disabled");
    });
  }
}

function moveGallaryOneStepLeft() {
  // Проверка на наличие класса disabled
  if (btnLeft_Step.classList.contains("btn-circle_disabled")) {
    return;
  } // Убираем класс disabled у дургих кнопок


  removeClasses_disabled(); // Генерация новых карточек, выбор из псевдослучайного массива

  startNumCards -= cards;
  var shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards + cards);
  generateCard(shuffledArrsForRender); // Кнопка с цифрой

  btnStep -= 1;
  changeNumBtn(btnStep); // Проверка на конец списка

  if (startNumCards === 0) {
    btnsLeft.forEach(function (item) {
      return item.classList.add("btn-circle_disabled");
    });
  }
}