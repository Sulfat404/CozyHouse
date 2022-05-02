"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var burger = document.querySelector(".burger__wrapper-sticks");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list");
var navBarItems = document.querySelectorAll(".navbar__item");
var body = document.querySelector(".body"); // buttons

var btnRigth_Step = document.querySelector(".btn-circle__right");
var btnLeft_Step = document.querySelector(".btn-circle__left"); //Для поп-апа

var setOfCards;
var popup;
burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkWindowSize);
navBarItems.forEach(function (navBarItem) {
  navBarItem.addEventListener("click", burgerClose);
});
btnRigth_Step.addEventListener("click", moveGallaryOneStep);
btnLeft_Step.addEventListener("click", moveGallaryOneStep); // Cards begin

var shuffledArrs;
var cards;
var pages;
var btnStep = 1;

function initCards() {
  cards = checkWindowSizeForGallary();
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

  body.classList.add("noscroll");
  burger.classList.add("header-open");
  navBar.classList.add("header-open");
  header.classList.add("header-open");
}

function burgerClose() {
  var arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach(function (elem) {
    elem.classList.remove("header-open");
  });
  body.classList.remove("noscroll");
}

function checkWindowSize() {
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
}

function closePopup() {
  body.classList.remove("noscroll");
  popup.remove();
}

document.addEventListener("click", function (e) {
  var petsName = e.target.closest('.card');
  console.log(petsName.id);

  for (var i = 0; i < setOfCards.length; i++) {
    if (petsName.id === setOfCards.id[i]) {
      renderPopup(e, i);
    }
  }
}); // popup

function renderPopup(e, i) {
  body.classList.add("noscroll");
  body.innerHTML += "    <div class=\"popup__wrapper\">\n  <div class=\"popup\">\n    <div class=\"btnClose__wrapper\">\n      <svg width=\"62\" height=\"62\" class=\"popup__btnClose\">\n        <use xlink:href=\"../../assets/icons/svgSprie.svg#popupBtn\"></use>\n      </svg>\n    </div>\n    <div class=\"popup__img\">\n      <img src=\"../../assets/images/jennifer.jpg\" alt=\"jennifer\">\n    </div>\n    <div class=\"popup__content\">\n      <h2 class=\"title\">Jennifer</h2>\n      <h3 class=\"subtitle\">Dog - Labrador</h3>\n      <p>Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.</p>\n      <ul>\n        <li class=\"popup__item\">Age:</li>\n        <li class=\"popup__item\">Inoculations:</li>\n        <li class=\"popup__item\">Diseases:</li>\n        <li class=\"popup__item\">Parasites:</li>\n      </ul>\n    </div>\n  </div>";
}