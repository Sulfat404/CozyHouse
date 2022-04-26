"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// variables
// for menu-burger
var burger = document.querySelector(".burger__wrapper-sticks");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list");
var navBarItems = document.querySelectorAll(".navbar__item"); // for gallary

var startNumCards = 0; // buttons

var btnRigth_Step = document.querySelector(".btn-circle_right-oneStep");
var btnRight_All = document.querySelector(".btn-circle_rightAll");
var btnsRight = document.querySelectorAll(".btn-circle_right");
var btnLeft_All = document.querySelector(".btn-circle_leftAll");
var btnLeft_Step = document.querySelector(".btn-circle_left-oneStep");
var btnsLeft = document.querySelectorAll(".btn-circle_left");
var btnNumber = document.querySelector(".btn-circle_number"); // Cards begin

var shuffledArrs;
var cards;
var pages;
var btnStep = 1;

function initCards() {
  var _checkWindowSizeForGa = checkWindowSizeForGallary();

  var _checkWindowSizeForGa2 = _slicedToArray(_checkWindowSizeForGa, 2);

  cards = _checkWindowSizeForGa2[0];
  pages = _checkWindowSizeForGa2[1];
  // Генерируется псевдо-массив с 48 карточками
  shuffledArrs = createPseudorandomArr(cards, pages);
  var shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}

window.addEventListener("resize", checkWindowSize);
window.addEventListener("load", initCards);
burger.addEventListener("click", burgerOpen);
navBarItems.forEach(function (navBarItem) {
  navBarItem.addEventListener("click", burgerClose);
});
btnRigth_Step.addEventListener("click", moveGallaryOneStepRight);
btnRight_All.addEventListener("click", moveGallaryAllRight);
btnLeft_Step.addEventListener("click", moveGallaryOneStepLeft);
btnLeft_All.addEventListener("click", moveGallaryAllLeft);

if (burger.classList.contains("header-open")) {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  }
} // burger


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

function checkWindowSize(event) {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  }
} // gallary


function checkWindowSizeForGallary() {
  var windowInnerWidth = document.documentElement.clientWidth;
  var cards;
  var pages;

  if (1280 <= windowInnerWidth) {
    cards = 8;
    pages = 6;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    cards = 6;
    pages = 8;
  } else {
    // 768 > windowInnerWidth
    cards = 3;
    pages = 16;
  }

  return [cards, pages];
}

function createPseudorandomArr(cards, pages) {
  // Берет массив объектов из data.js, рандомизирует и конкатинирует в один псевдослучайный массив
  var shuffledArrs = [];

  for (var page = 1; page <= pages; page++) {
    var shuffleArr = _pets["default"].map(function (i) {
      return [Math.random(), i];
    }).sort().map(function (i) {
      return i[1];
    });

    shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
  }

  ;
  return shuffledArrs;
}

function generateCard(shuffledArrsForRender) {
  var gallaryItems = document.querySelector(".gallary__items");
  gallaryItems.innerHTML = "";

  for (var card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += "<div class=\"card card__pPets\">\n              <div>\n                  <img src=".concat(shuffledArrsForRender[card - 1].img, " alt=\"").concat(shuffledArrsForRender[card - 1].name, "\">\n              </div>\n              <p class=\"title card__subtitle\">").concat(shuffledArrsForRender[card - 1].name, "</p>\n              <button class=\"btn__style-transparent\">Learn more</button>\n          </div>");
  }
}

function changeNumBtn(btnStep) {
  btnNumber.innerHTML = "<span>".concat(btnStep, "</span>");
}

function removeClasses_disabled() {
  var btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
  btnsDisabled.forEach(function (item) {
    return item.classList.remove("btn-circle_disabled");
  });
}

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

function moveGallaryAllRight() {
  // Проверка на наличие класса disabled
  if (btnRigth_Step.classList.contains("btn-circle_disabled")) {
    return;
  } // Генерация новых карточек, выбор из псевдослучайного массива


  startNumCards = shuffledArrs.length - cards;
  var shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards + cards);
  generateCard(shuffledArrsForRender); // Кнопка с цифрой

  btnStep = pages;
  changeNumBtn(btnStep); // Убираем класс disabled у дургих кнопок

  removeClasses_disabled(); // Добавляем класс disabled

  btnsRight.forEach(function (item) {
    return item.classList.add("btn-circle_disabled");
  });
}

function moveGallaryAllLeft() {
  // Проверка на наличие класса disabled
  if (btnLeft_Step.classList.contains("btn-circle_disabled")) {
    return;
  } // Убираем класс disabled у других кнопок


  removeClasses_disabled(); // Добавляем класс disabled

  btnsLeft.forEach(function (item) {
    return item.classList.add("btn-circle_disabled");
  }); // Генерация новых карточек, выбор из псевдослучайного массива

  startNumCards = 0;
  var shuffledArrsForRender = shuffledArrs.slice(startNumCards, startNumCards + cards);
  generateCard(shuffledArrsForRender); // Кнопка с цифрой

  btnStep = 1;
  changeNumBtn(btnStep);
}