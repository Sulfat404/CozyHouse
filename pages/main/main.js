import arrOfPets from "../../assets/data/pets.js";

let arrOfOpenElem;
let burger = document.querySelector(".burger__wrapper-sticks");
let header = document.querySelector(".header");
let navBar = document.querySelector(".navbar__list");

// buttons
const btnRigth_Step = document.querySelector(".btn-circle__right");
const btnLeft_Step = document.querySelector(".btn-circle__left");

//Для поп-апа
let setOfCards;
let popupWrapper;
let numOfCard;

window.addEventListener("resize", checkWindowSize);
navBar.addEventListener("click", function (event) {
  if (event.target.closest(".navbar__item")) {
    burgerClose();
  }
});
btnRigth_Step.addEventListener("click", moveGallaryOneStep);
btnLeft_Step.addEventListener("click", moveGallaryOneStep);
document.addEventListener("click", (e) => {
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
});

// Cards begin
let shuffledArrs;
let cards;
let shuffledArrsForRender;

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
  let arrOfOpenElem = document.querySelectorAll(".header-open");
}

function burgerClose() {
  arrOfOpenElem = document.querySelectorAll(".header-open");
  arrOfOpenElem.forEach((elem) => {
    elem.classList.remove("header-open");
  });
  document.body.classList.remove("noscroll");
}

function checkWindowSize(event) {
  if (
    event.currentTarget.innerWidth > 768 &&
    burger.classList.contains("header-open")
  ) {
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
  } else {
    // 768 > windowInnerWidth
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
    gallaryItems.innerHTML += `<div class="card card_pMain" id="${
      shuffledArrsForRender[card - 1].name
    }">
              <div>
                  <img src=${shuffledArrsForRender[card - 1].img} alt="${shuffledArrsForRender[card - 1].name}">
              </div>
              <p class="title card__subtitle">${
                shuffledArrsForRender[card - 1].name
              }</p>
              <button class="btn__style-transparent">Learn more</button>
          </div>`;
  }
  setOfCards = document.querySelectorAll(".card_pMain");
}

function moveGallaryOneStep() {
  initCards();
}

// Проверка на закрытие popup
function renderPopup() {
  document.body.classList.add("noscroll");
  document.body.innerHTML += `    <div id="popupWrapper" class="popup__wrapper">
  <div class="popup">
    <div id="btnPopupClose" class="btnClose__wrapper">
      <svg id="btnPopupClose" width="52" height="52" class="popup__btnClose">
        <use id="btnPopupClose" xlink:href="../../assets/icons/svgSprie.svg#popupBtn"></use>
      </svg>
    </div>
    <div class="popup__img">
      <img src="${shuffledArrsForRender[numOfCard].img}" alt="${shuffledArrsForRender[numOfCard].name}">
    </div>
    <div class="popup__content">
      <h2 class="title">${shuffledArrsForRender[numOfCard].name}</h2>
      <h3 class="subtitle">${shuffledArrsForRender[numOfCard].breed}</h3>
      <p>${shuffledArrsForRender[numOfCard].description}</p>
      <ul>
        <li class="popup__item"><b>Age: </b>${shuffledArrsForRender[numOfCard].age}</li>
        <li class="popup__item"><b>Inoculations: </b>${shuffledArrsForRender[numOfCard].inoculations}</li>
        <li class="popup__item"><b>Diseases: </b>${shuffledArrsForRender[numOfCard].diseases}</li>
        <li class="popup__item"><b>Parasites: </b>${shuffledArrsForRender[numOfCard].parasites}</li>
      </ul>
    </div>
  </div>`;
  popupWrapper = document.querySelector(".popup__wrapper");
}

function closePopup() {
  popupWrapper.remove();
  document.body.classList.remove("noscroll");
}
