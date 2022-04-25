import arrOfPets from "../../assets/data/pets.js";

// variables
// for menu-burger
const burger = document.querySelector(".burger__wrapper-sticks");
const header = document.querySelector(".header");
const navBar = document.querySelector(".navbar__list");
const navBarItems = document.querySelectorAll(".navbar__item");

// for gallary
let newShuffledArrOfPets = new Array();
const gallaryItems = document.querySelector(".gallary__items");
let photos;
let pages;
let startNumberOfPhoto = 0;
let startWindowInnerWidth = document.documentElement.clientWidth;

// buttons
const btnRigth_oneStep = document.querySelector(".btn-circle_right-oneStep");
const btnNumber = document.querySelector(".btn-circle_number");
let numberOfbutton = 1;
let btnsDisabled = document.querySelectorAll(".btn-circle_disabled");
const btnsLeft = document.querySelectorAll(".btn-circle_left");
const btnsRight = document.querySelectorAll(".btn-circle_right");

burger.addEventListener("click", burgerOpen);
window.addEventListener("resize", checkSize);
window.addEventListener("load", loadPhotos);
btnRigth_oneStep.addEventListener("click", moveGallaryOneStepRight);
navBarItems.forEach((navBarItem) => {
  navBarItem.addEventListener("click", burgerClose);
});

if (burger.classList.contains("header-open")) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
  //   if (startWindowInnerWidth)
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

function checkSize(event) {
  let windowInnerWidth = document.documentElement.clientWidth;
  if (windowInnerWidth > 768) {
    burgerClose();
  }
  if (windowInnerWidth) console.log(event);
}

function loadPhotos() {
  // check window size and choose number of photos and pages
  let windowInnerWidth = document.documentElement.clientWidth;
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

  for (let page = 1; page <= pages; page++) {
    // Создается и собирается псевдомассив из 48 элементов
    let shuffleArr = arrOfPets
      .map((i) => [Math.random(), i])
      .sort()
      .map((i) => i[1]);
    newShuffledArrOfPets = newShuffledArrOfPets.concat(
      shuffleArr.slice(0, photos)
    );
    // console.log(`page: ${page}`)
    for (let photo = 1; photo <= photos; photo++) {
      // console.log(photo)
      gallaryItems.innerHTML += `<div class="card card__pPets">
												<div>
														<img src=${newShuffledArrOfPets[photo - 1].img} alt="${
        newShuffledArrOfPets[photo - 1].name
      }">
												</div>
												<p class="title card__subtitle">${newShuffledArrOfPets[photo - 1].name}</p>
												<button class="btn__style-transparent">Learn more</button>
										</div>`;
    }
  }
  return newShuffledArrOfPets, photos, pages;
}

function moveGallaryOneStepRight() {
  // Генерация новых карточек, выбор из псевдослучайного массива
  startNumberOfPhoto += photos;
  let nextArr = newShuffledArrOfPets.slice(
    startNumberOfPhoto,
    startNumberOfPhoto + photos
  );
  gallaryItems.innerHTML = "";
  for (let photo = 1; photo <= photos; photo++) {
    gallaryItems.innerHTML += `<div class="card card__pPets">
									<div>
											<img src=${nextArr[photo - 1].img} alt="${nextArr[photo - 1].name}">
									</div>
									<p class="title card__subtitle">${nextArr[photo - 1].name}</p>
									<button class="btn__style-transparent">Learn more</button>
							</div>`;
  }
  console.log("startNumberOfPhoto", startNumberOfPhoto);

  // Смена номера на кнопке
  numberOfbutton += 1;
  btnNumber.innerHTML = `<span>${numberOfbutton}</span>`;

  // Убирается класс btn-circle_disabled
  btnsDisabled.forEach((item) => item.classList.remove("btn-circle_disabled"));
  // Проверка на конец списка
  if (startNumberOfPhoto === 42) {
    btnsRight.forEach((item) => item.classList.add("btn-circle_disabled"));
  }

  return startNumberOfPhoto, numberOfbutton;
}
