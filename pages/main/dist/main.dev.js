"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var arrOfOpenElem;
var burger = document.querySelector(".burger__wrapper-sticks");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list"); // buttons

var btnRigth_Step = document.querySelector(".btn-circle__right");
var btnLeft_Step = document.querySelector(".btn-circle__left"); //Для поп-апа

var setOfCards;
var popupWrapper;
var numOfCard;
window.addEventListener("resize", checkWindowSize);
navBar.addEventListener("click", function (event) {
  if (event.target.closest(".navbar__item")) {
    burgerClose();
  }
});
btnRigth_Step.addEventListener("click", moveGallaryOneStep);
btnLeft_Step.addEventListener("click", moveGallaryOneStep);
document.addEventListener("click", function (e) {
  numOfCard = 0;

  if (e.target.id === "popupWrapper" || e.target.id === "btnPopupClose") {
    return closePopup();
  }

  if (e.target.closest(".card")) {
    while (numOfCard < shuffledArrsForRender.length) {
      if (e.target.closest(".card").id === shuffledArrsForRender[numOfCard].name) {
        return renderPopup();
      }

      numOfCard++;
    }
  }

  if (e.target.closest(".burger__wrapper-sticks")) {
    return burgerOpen();
  }

  if (e.target.closest(".btn-circle_pMain")) {
    return initCards();
  }
}); // Cards begin

var shuffledArrs;
var cards;
var shuffledArrsForRender;

function initCards() {
  cards = checkWindowSizeForGallary();
  shuffledArrs = createPseudorandomArr(cards);
  shuffledArrsForRender = shuffledArrs.slice(0, cards);
  generateCard(shuffledArrsForRender);
}

initCards();

function burgerOpen() {
  if (burger.classList.contains("header-open")) {
    return burgerClose();
  }

  document.body.classList.add("noscroll");
  burger = document.querySelector(".burger__wrapper-sticks");
  header = document.querySelector(".header");
  navBar = document.querySelector(".navbar__list");
  burger.classList.add("header-open");
  navBar.classList.add("header-open");
  header.classList.add("header-open");
  var arrOfOpenElem = document.querySelectorAll(".header-open");
}

function burgerClose() {
  arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach(function (elem) {
    elem.classList.remove("header-open");
  });
  document.body.classList.remove("noscroll");
}

function checkWindowSize(event) {
  if (event.currentTarget.innerWidth > 768 && burger.classList.contains("header-open")) {
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

  var shuffleArr = _pets["default"].map(function (i) {
    return [Math.random(), i];
  }).sort().map(function (i) {
    return i[1];
  });

  shuffledArrs = shuffledArrs.concat(shuffleArr.slice(0, cards));
  return shuffledArrs;
}

function generateCard(shuffledArrsForRender) {
  var gallaryItems = document.querySelector(".gallary__items_pMain");
  gallaryItems.innerHTML = "";

  for (var card = 1; card <= shuffledArrsForRender.length; card++) {
    gallaryItems.innerHTML += "<div class=\"card card_pMain\" id=\"".concat(shuffledArrsForRender[card - 1].name, "\">\n              <div>\n                  <img src=").concat(shuffledArrsForRender[card - 1].img, " alt=\"").concat(shuffledArrsForRender[card - 1].name, "\">\n              </div>\n              <p class=\"title card__subtitle\">").concat(shuffledArrsForRender[card - 1].name, "</p>\n              <button class=\"btn__style-transparent\">Learn more</button>\n          </div>");
  }

  setOfCards = document.querySelectorAll(".card_pMain");
}

function moveGallaryOneStep() {
  initCards();
} // Проверка на закрытие popup


function renderPopup() {
  document.body.classList.add("noscroll");
  document.body.innerHTML += "    <div id=\"popupWrapper\" class=\"popup__wrapper\">\n  <div class=\"popup\">\n    <div id=\"btnPopupClose\" class=\"btnClose__wrapper\">\n      <svg id=\"btnPopupClose\" width=\"52\" height=\"52\" class=\"popup__btnClose\">\n        <use id=\"btnPopupClose\" xlink:href=\"../../assets/icons/svgSprie.svg#popupBtn\"></use>\n      </svg>\n    </div>\n    <div class=\"popup__img\">\n      <img src=\"".concat(shuffledArrsForRender[numOfCard].img, "\" alt=\"").concat(shuffledArrsForRender[numOfCard].name, "\">\n    </div>\n    <div class=\"popup__content\">\n      <h2 class=\"title\">").concat(shuffledArrsForRender[numOfCard].name, "</h2>\n      <h3 class=\"subtitle\">").concat(shuffledArrsForRender[numOfCard].breed, "</h3>\n      <p>").concat(shuffledArrsForRender[numOfCard].description, "</p>\n      <ul>\n        <li class=\"popup__item\"><b>Age: </b>").concat(shuffledArrsForRender[numOfCard].age, "</li>\n        <li class=\"popup__item\"><b>Inoculations: </b>").concat(shuffledArrsForRender[numOfCard].inoculations, "</li>\n        <li class=\"popup__item\"><b>Diseases: </b>").concat(shuffledArrsForRender[numOfCard].diseases, "</li>\n        <li class=\"popup__item\"><b>Parasites: </b>").concat(shuffledArrsForRender[numOfCard].parasites, "</li>\n      </ul>\n    </div>\n  </div>");
  popupWrapper = document.querySelector(".popup__wrapper");
}

function closePopup() {
  popupWrapper.remove();
  document.body.classList.remove("noscroll");
}