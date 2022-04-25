"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// variables
// for menu-burger
var burger = document.querySelector(".burger__wrapper-sticks");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list");
var navBarItems = document.querySelectorAll(".navbar__item"); // for gallary

var newShuffledArrOfPets = new Array();
var gallaryItems = document.querySelector(".gallary__items");
var photos;
var pages;
var startNumberOfPhoto = 0;
var startWindowInnerWidth = document.documentElement.clientWidth; // buttons

var btnRigth_oneStep = document.querySelector(".btn-circle_right-oneStep");
var btnNumber = document.querySelector(".btn-circle_number");
var numberOfbutton = 1;
var btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
var btnsLeft = document.querySelectorAll(".btn-circle_left");
var btnsRight = document.querySelectorAll(".btn-circle_right");
burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
window.addEventListener("load", loadPhotos);
btnRigth_oneStep.addEventListener("click", moveGallaryOneStepRight);
navBarItems.forEach(function (navBarItem) {
  navBarItem.addEventListener("click", burgerClose);
});

if (burger.classList.contains("header-open")) {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  } //   if (startWindowInnerWidth)

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

function checkSize(event) {
  var windowInnerWidth = document.documentElement.clientWidth;

  if (windowInnerWidth > 768) {
    burgerClose();
  }

  if (windowInnerWidth) console.log(event);
}

function loadPhotos() {
  // check window size and choose number of photos and pages
  var windowInnerWidth = document.documentElement.clientWidth;

  if (1280 <= windowInnerWidth) {
    photos = 8;
    pages = 6;
  } else if (768 <= windowInnerWidth && windowInnerWidth <= 1280) {
    photos = 6;
    pages = 8;
  } else if (768 > windowInnerWidth) {
    photos = 3;
    pages = 16;
  }

  for (var page = 1; page <= pages; page++) {
    // Создается и собирается псевдомассив из 48 элементов
    var shuffleArr = _pets["default"].map(function (i) {
      return [Math.random(), i];
    }).sort().map(function (i) {
      return i[1];
    });

    newShuffledArrOfPets = newShuffledArrOfPets.concat(shuffleArr.slice(0, photos)); // console.log(`page: ${page}`)

    for (var photo = 1; photo <= photos; photo++) {
      // console.log(photo)
      gallaryItems.innerHTML += "<div class=\"card card__pPets\">\n\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=".concat(newShuffledArrOfPets[photo - 1].img, " alt=\"").concat(newShuffledArrOfPets[photo - 1].name, "\">\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"title card__subtitle\">").concat(newShuffledArrOfPets[photo - 1].name, "</p>\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn__style-transparent\">Learn more</button>\n\t\t\t\t\t\t\t\t\t\t</div>");
    }
  }

  return newShuffledArrOfPets, photos, pages;
}

function moveGallaryOneStepRight() {
  // Генерация новых карточек, выбор из псевдослучайного массива
  startNumberOfPhoto += photos;
  var nextArr = newShuffledArrOfPets.slice(startNumberOfPhoto, startNumberOfPhoto + photos);
  gallaryItems.innerHTML = "";

  for (var photo = 1; photo <= photos; photo++) {
    gallaryItems.innerHTML += "<div class=\"card card__pPets\">\n\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t<img src=".concat(nextArr[photo - 1].img, " alt=\"").concat(nextArr[photo - 1].name, "\">\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<p class=\"title card__subtitle\">").concat(nextArr[photo - 1].name, "</p>\n\t\t\t\t\t\t\t\t\t<button class=\"btn__style-transparent\">Learn more</button>\n\t\t\t\t\t\t\t</div>");
  }

  console.log("startNumberOfPhoto", startNumberOfPhoto); // Смена номера на кнопке

  numberOfbutton += 1;
  btnNumber.innerHTML = "<span>".concat(numberOfbutton, "</span>"); // Убирается класс btn-circle_disabled

  btnsDisabled.forEach(function (item) {
    return item.classList.remove("btn-circle_disabled");
  }); // Проверка на конец списка

  if (startNumberOfPhoto === 42) {
    btnsRight.forEach(function (item) {
      return item.classList.add("btn-circle_disabled");
    });
  }

  return startNumberOfPhoto, numberOfbutton;
}