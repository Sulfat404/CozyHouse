"use strict";

var _pets = _interopRequireDefault(require("../../assets/data/pets.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

console.log(_pets["default"][0].name); // variables

var burger = document.querySelector(".burger__wrapper-sticks");
var sticks = document.querySelectorAll(".burger__stick");
var header = document.querySelector(".header");
var navBar = document.querySelector(".navbar__list");
var navBarItems = document.querySelectorAll(".navbar__item");
burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
navBarItems.forEach(function (navBarItem) {
  navBarItem.addEventListener("click", burgerClose);
});
window.addEventListener("load", loadPhotos);

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
}

function loadPhotos() {
  var photos;
  var pages;
  var windowInnerWidth = document.documentElement.clientWidth;

  if (1280 <= windowInnerWidth) {
    photos = 8;
    pages = 6;
  } else if (768 <= windowInnerWidth <= 1280) {
    photos = 6;
    pages = 8;
  } else {
    photos = 3;
    pages = 16;
  }

  var gallaryItems = document.querySelector(".gallary__items");

  for (var page = 1; page <= pages; page++) {
    console.log("page: ".concat(page));

    for (var photo = 1; photo <= photos; photo++) {
      console.log(photo);
      gallaryItems.innerHTML += "<div class=\"card card__pPets\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<img src=".concat(_pets["default"][photo - 1].img, " alt=\"").concat(_pets["default"][photo - 1].name, "\">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<p class=\"title card__subtitle\">").concat(_pets["default"][photo - 1].name, "</p>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn__style-transparent\">Learn more</button>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>");
    }
  }
}